---
title: " Django에서 Pytest 사용하기"
date: "2021-03-27T13:23:45.678Z"
template: "post"
draft: false
slug: "/posts/pytest-on-django/"
category: "develop"
tags:
 - "python"
 - "test"
 - "django"
 - "pytest"
description: "Django에서 Pytest 사용하기 위한 기초 정보 "
---
## 왜?

django 에는 기본 테스트 모듈이 내재 되어 있다. 그런데 왜 pytest를 별도로 실행을 해야하는 걸까? 

1.  django 내장 test 는 Boiler Plate가 존재한다.
    -   모든 test set이 단일 클래스(django.test.TestCase)를 상속받아 운영된다. 
    -   실행이 순차적으로 진행이 되다 보니 규모가 커지다 보니 느려진다.
        -   pytest는 멀티 실행을 지원한다.
2.  코드 작성이 단순해진다.
    -   Django
        -   모든 test가 class 상속으로 이루어진다. 
        -   assert 를 각 class의 method로 평가해야 한다.
    -   pytest
        -    function 단위로 test를 작성 할 수 있다.
        -    단순 assert로 test를 평가할 수 있다. 
3.  Django 외 다른 Python project에도 도입이 가능하다.
4.  그 외 test config를 파일로 지정해 놓을 수 있고, fixture를 정해놓고 여러 곳에서, 원하는 순서에 맞추어 실행 시켜 볼 수 있다.

## 설치 및 기본 설정

### 설치

```shell
pip install pytest-django
```

### 기본 설정

```ini
# pytest.ini Project root folder
# 아래 설정을 잡아 주지 않을 경우, pytest 실행시 에러가 난다.

[pytest]
DJANGO_SETTINGS_MODULE = yourproject.settings
```

### 실행


```shell
pytest <argument> 
```

### 실행 옵션(pytest run param)

pytest.ini 에 지정을 할 수 있다.

```ini
[pytest]
addopts = --reuse-db	
```

--db-reuse: 테스트 시작시 DB 를 만들고 삭제하는 작업을 하지 않는다. 소규모 테스트를 한다면 이게 더 중요하다.

--create-db: 테스트 시작시 DB를 새로 만든다.(models 변경 사항을 반영 할 수 있다.)

-   default로 --db-reuse 기본으로 해놓고 db schema 변경시에만 설정하는걸 공식 문서에서는 추천한다.

--migration: model schema 변경이 있을 경우 migration을 진행한다. (django db 가 아닌 test db에)

--no-migration: schema 변경을 무시한다.

## Markers

테스트 함수나 클래스에 메타 데이터를 쉽게 설정할 수 있다.

-   pytest.marks.db_django

    -   db 연결이 필요할 경우 marks 를 활용한다. 

    -   ```python
        import pytest
        
        @pytest.mark.django_db
        def test_my_user():
        	me = User.objects.get(username='me')
        	assert me.is_superuser
        ```

## Fixture

-   `rf`: django.utils.RequestFactory

    -   middleware를 거치지 않고 바로 view로 연결 되는 request를 만든다.

    -   이럴 경우, request.user가 없어서 별도로 부착을 해줘야 한다.

    -   ```python
        from myapp.views import my_view
        
        def test_details(rf, admin):
            request = rf.get('/customer/details')
            # Remember that when using RequestFactory, the request does not pass
            # through middleware. If your view expects fields such as request.user
            # to be set, you need to set them explicitly.
            # The following line sets request.user to an admin user.
            request.user = admin
            response = my_view(request)
            assert response.status_code == 200
        ```

-   `client` : [`django.test.Client`](https://docs.djangoproject.com/en/dev/topics/testing/tools/#the-test-client)

-   ```python
    def test_with_client(client):
        response = client.get('/')
        assert response.content == 'Foobar'
    ```

    

