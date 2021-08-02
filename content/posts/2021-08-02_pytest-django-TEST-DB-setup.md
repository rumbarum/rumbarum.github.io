---
title: " pytest-django TEST DB setup"
date: "2021-08-02T01:23:45.678Z"
template: "post"
draft: false
slug: "/posts/pytest-django-db-setup/"
category: "develop"
tags:
 - "pytest"
 - "django"
 - "database"
description: "pytest-django 로 테스트 실행시, DB와 Test data 어떻게 관리할까??"
---
# 1. Test DB 생성 (django default) 및 이용

- settings.DATABASES config 활용
- test_<settings Server NAME>  DB schema 생성
- django models 바탕으로 DB 생성
- Test data: 
    - 비어 있는 TEST DB 에 실행하기 원하는 데이터를 채워넣어줘야 한다.
    - models.py 에서 User import
    - User.objects.create(id=1, name="유저", age=30)

- 장점:
    -  Schema 변경시 피드백이 빠름
- 단점: 
    - 테스트 데이터 생성 코드를 짜야 한다.
        - 값이 중요하지 않다면, model_bakery 사용
    - Read Only DB 미지원 (managed = False)
    - Multi DB 미지원
        - 모든 app의 models를 하나의 DB 로 몰아 넣는다.

# 2. TEST DB 생성 및 SQL DUMP 실행

```python
# conftest.py
import subprocess
import pytest
from django.db import connections
import pymysql

# user는 host에 접속할수 있고, db create 권한이 있어야 한다.
TEST_DB = {
    "base": {
        "host": "localhost",
        "user": "test_user",
        "password": "test_pw",
        "charset": "utf8mb4"
    },
    "default": {
        "name": "testtest_default",
    },
    "multidb1":{
        "name": "testtest_multi1"
    }
}

# SQL 실행을 위한 function
def run_sql(sql):
    conn = pymysql.connect(**TEST_DB["base"])
    cur = conn.cursor()
    cur.execute(sql)
    conn.close()

# SQL dump load를 위한 func 
# `mysql --user=test_user --password=test_pw < SQL.dump` 실행
def load_mysql_dump(filepath, user, passwd, db_name):
    with open(filepath, 'r') as f:
        command = ['mysql', f'--user={user}', f'--password={passwd}', db_name]
        proc = subprocess.Popen(command, stdin=f)
        _, stderr = proc.communicate()
        if stderr:
            print(repr(stderr))


@pytest.fixture(scope='session')
def django_db_setup():
    from django.conf import settings
    # 기존 연결 되던 DB 변경
    settings.DATABASES['default']['NAME'] = TEST_DB["defualt"]["name"]
    settings.DATABASES['multidb1']['NAME'] = TEST_DB["multidb1"]["name"]

    # Test DB 생성
    run_sql(f"""DROP DATABASE IF EXISTS `{TEST_DB["defualt"]["name"]}`;""")
    run_sql(f""" CREATE DATABASE {TEST_DB["defualt"]["name"]};""")
    run_sql(f"""DROP DATABASE IF EXISTS `{TEST_DB["multidb1"]["name"]}`;""")
    run_sql(f""" CREATE DATABASE {TEST_DB["multidb1"]["name"]};""")

    # Test DB load dump data
    conf = TEST_DB["base"]
    load_mysql_dump("default_dump.sql", conf["user"], conf["password"], TEST_DB["defualt"]["name"])
    load_mysql_dump("multidb1_dump.sql", conf["user"], conf["password"], TEST_DB["multidb1"]["name"])

    # 테스트 종료까지 yield, 테스트 종료시 실행된다.
    yield

    #테스트 종료후 Test DB Drop, 주석 처리 해놓을 경우 DB 가 계속 잔존
    run_sql(f""" DROP DATABASE {TEST_DB["defualt"]["name"]};""")
    run_sql(f""" DROP DATABASE {TEST_DB["multidb1"]["name"]};""")

    for connection in connections.all():
        connection.close()
```

- 원하는 형태로 TEST DB를 손쉽게 불러올 수 있다.
- Test data:
    - 내가 원하는 형태와 data를 가지고 있는 DB를 dump 하면 끝
- 장점: 
    - DB 자체를 freeze 한 채로 사용할 수 있다.(schema 변동이 없는 고정된 케이스라면 이걸로도 충분)
    - 멀티 DB 사용 가능하다.
    - Read Only DB 데이터 입력이 가능하다. 
- 단점: 
    - 데이터, schema 변화대응 느림, 
    - 해당 SQL 을 실행해서 DB를 만들고, 값 수정, 다시 dump를 해야한다.

# 3. 기존 DB 이용

```python
#conftest.py

new_default =  {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'prepaired_test_db',  # DB명
        'USER': 'test_user',  # 데이터베이스 계정
        'PASSWORD': 'test_pw'  # 계정 비밀번호
        'HOST': 'db.example.com',  # 데이테베이스 주소(IP)
        'PORT': '3306',  # 데이터베이스 포트(보통은 3306)
        'OPTIONS': {
            'charset': 'utf8mb4',
        }
    }

@pytest.fixture(scope='session')
def django_db_setup():
    from django.conf import settings
    
    # 접속 정보를 내가 원하는 것으로 덮어 씌운다.
    settings.DATABASES['default'] = new_default
    
```

미리 설정해 놓은 TEST DB 에 접속, 저장 되어 있는 DB data를 사용

- Test data: 
    - DB에 저장된 데이터

- 장점 : 
    - 공통 테스트 DB 공유

- 단점 : 
    - DB가 각 Test 시행에 대해서 비독립
    - 테스트가 데이터 변조, 타 테스트에 영향을 끼칠 수 있다.

# 4. Django loaddata

```python
# conftest.py

import pytest

from django.core.management import call_command

@pytest.fixture(scope='session')
def django_db_setup(django_db_setup, django_db_blocker):
    with django_db_blocker.unblock():
        call_command('loaddata', 'my_fixture.json')
```

Django 제공, dumpdata 로 data 백업, 저장된 data load.

- 장점:
    - SQL 변환등을 거칠 필요가 없이 단순하다.
- 단점: 
    - DB 가 단순할 경우 잘 되지만 아닐 경우 SQL dump가 낫다.
    - Multi DB 미지원