---
title: "Django settings.py 톺아보기"
date: "2020-05-03T01:23:45.678Z"
template: "post"
draft: false
slug: "/posts/understanding-django-settings/"
category: "Develop"
tags:
 - "django"
 - "setting"
 - "wecode"
 - "위코드"
description: "처음 장고를 시작하고 세팅을 하려고 하는데 이게 뭔 말...??? "
---

파이썬으로 쉽게 웹서버를 만들 수 있게 도와준다는 프레임웤 Django가 있다고 들었다. 

```shell
$conda --create -n <nice-env-name> python==3.8
$pip install django
$django-admin startproject <beautiful-awosome-project>
```

까지 실행한 당신, 이제 settings.py를 다뤄야 한다. 고 하는 말을 들었다. 

지금 까지 공부했던 Python에는 사용하지 않았던 어여쁜 단어들이 눈에 보인다. Django 내에서만 통용되는 세팅 값들을 한번 이해하고 넘어가면 좋을 듯 해서 한줄 한줄 정리해 본다. 

```python
import os
```
 파이썬 실행 환경에서 운영체제(맥북이라면 max OSX, 리눅스라면 ubutu 등)에 접근하기 위한 module로 사용된다.

```python
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
```
 BASE_DIR 는 Django project의 기본 ROOT Dir를 지정 한다. manage.py 파일이 들어있는 폴더를 이 위치로 설정을 한다.
 \__file__ 은 현재 파일, os.path.abspath 를 통해 현재 파일의 절대 경로를 획득한다. 이를테면 '/User/Project/beautiful-awosome-project/beautiful-awosome-project/settings.py'가 될 것이다. os.path.dirname는 settings.py이 들어있는 폴더이름을 찾는다. 이걸 두번 하게 되면?
BASE_DIR ='/User/Project/beautiful-awosome-project'가 되는 것이다.

```python
SECRET_KEY = '1!rfl^^ehfh9_ig@sy_=5sb&b&24xwb))+-@c+a0nr@td2pt'
```
프로젝트 내에서 암호화에 사용하게 될 암호키를 설정한다. 암호를 만드는데도 암호키가 필요하고 암호를 해독하는데도 암호키가 필요하다. 그래서 노출하면 절~~~~대 안된다.
```python
DEBUG = True
```
Django를 실행할때 에러가 생기면 에러를 디테일하게 보여주는 모드이다. True== ON, False==OFF. 프로덕션 배포에서 켜놓게 되면 비관계자들에게 프로젝트 구조를 노출 시킬 수도 있게 되므로 주의가 필요하다.
```python
ALLOWED_HOSTS = []
```
접근 가능한 IP를 제한 할 수 있다. 보통 개발할때에는 '*'로 모든 IP에 대한 접근을 허용한다.
```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'fantastic-app',
]
```
장고에서 프로젝트 하위에 app을 만들면 여기에 등록을 해줘야한다. 그렇지 않으면 django에서 앱으로 인식을 하지 못한다. 이건 django에서 개발자가 만든 app도 포함이며, django를 더 원할하게 사용하기 위한 부가 app e.g.> django-extension 들도 등록을 해야 작동이 가능하다. 처음 앱을 시작하게 될 경우 기본 설정되어 있는 값들은 django에서 기본적으로 사용하는 앱들이나 필요에 의해 사용하지 않아도 된다.
```python
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
```
django의 파일들(url, view, template )이 동작을 중간에서 연결하는 middleware를 관리하는 부분이다. INSTALLE_APP과 유사하다. 필요에 의해 추가하거나 삭제가 가능하다.
```python
ROOT_URLCONF = 'django_template.urls'
```
URL routing을 해주는 django urls의 ROOT 파일을 지정한다. url요청을 제일 먼저 받게 된다. 그리고 그 밑에 여러 urls를 거느려서 해당 urls의 views 로 연결이 되게 한다.
```python
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        #django Template 엔진을 설정한다.
        'DIRS': [],
        #Template 폴더 위치를 지정한다.
        'APP_DIRS': True,
        #앱별로 template폴더를 가지고 있는지 확인한다.
        'OPTIONS': {
            #Template과 관련된 옵션들을 설정한다.
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },

    },
]
```

코드 블록내 주석 참조


```python
WSGI_APPLICATION = 'django_template.wsgi.application'
```

웹서버와 연결시 어떤 세팅을 이용하는지 세팅값과 연결을 시켜준다.
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
```
django project가 연결할 데이터 베이스 정보를 설정한다. ID/PW등도 같이 설정한다. 멀티 데이터 베이스도 가능하긴 하다.

```python
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]
```
친절하게도, PW 검증을 할 수 있는 옵션을 지원해준다. 글쓴이도 아직 써보지는 못했다. 
```python
LANGUAGE_CODE = 'en-us'
```

언어설정, 3.0이상부터는 한국어를 설정하려면 'ko'를 사용, 그 이전 버전은 'ko-kr'을 사용하면 된다.
```python
TIME_ZONE = 'UTC'
```
시간존 설정, UTC는 그리니치 천문대의 시간이다. 한국 시간보다 9시간 빠르다. 한국시간대로 설정을 하려면 'Asia/Seoul'을 설정한다. 그러면 UTC +9된 한국시간을 표준시간으로 잡는다. (DB 저장시)
```python
USE_I18N = True
```
django의 번역 (영어 => 한국어) 을 설정하는 옵션, 편의를 위해 기본적으로 켜져있다.
```python
USE_L10N = True
```
설정한 언어형태에 맞추어 시간과 숫자 표시를 맞추는지 여부. 기본은 True로 되어있다.
```python
USE_TZ = True
```
TIME_ZONE 옵션을 사용할지 묻는 옵션이다. 이게 위에 있어랴 할거 같은데 아래에 있다. 왜그런진 나도 모르겠다.이게 True일 경우 django 내부시간대를 사용('America/Chicago'가 Django의 출생지라 기본 설정이 그렇게 되어있다고 한다.), False 일 경우 내가 설정한 time-zone을 기준으로 움직인다. 
```python
STATIC_URL = '/static/'
```
django 실행시 불러올 정적 파일, css 라던가, css라든가, css라던가.. 를 불러올 url을 설정한다. 기본으로 설정된 값을 기본으로 한다면, main-url/static/이 정적파일 접근 경로가 된다

