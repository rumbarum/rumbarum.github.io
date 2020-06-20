---
title: " Django settings.py 분리하기"
date: "2020-05-10T01:23:45.679Z"
template: "post"
draft: false
slug: "/posts/seperate-django-settings/"
category: "develop"
tags:
 - "django"
 - "setting"
 - "wecode"
description: "Django 개발과 프로덕션 설정을 쉽게 분리하는 방법 "
---

[앞선 글](https://rumbarum.github.io/posts/understanding-django-settings/) 에선 장고 세팅에 설정 되는 값들을 알아보았다. 

장고 연습이 아닌, 프로젝트를 진행하게 되면 production이 동작할 환경, develop 서버에서 돌아갈 환경, local 서버에서 돌아갈 환경등을 세팅하게 된다. 경우에 따라 더 늘어나거나 줄어들거나 할수도 있다. 

django 프로젝트를 처음 열게 되면, `settings.py`는  한개 밖에 존재하지 않는다. 

![초기 생성한 프로젝트 이미지](/media/sc_1_80398.jpg)

어떻게 쪼갤 수 있을까 ? 

방법은 간단하다. 공통적으로 들어가는 세팅값 ( INSTALLED_APPS 나 MIDDLEWARE) 은 하나로 쓰고, 달라지는 값 (DEBUG, DATABASE)등을 쪼개면 된다. 

이름은 짓기 나름인데, 내가 봤던 경우들은

1. base.py <== 공통 settings.py

2. product.py <== 실제 사용할 settings.py

3. develop.py <== 개발 테스트 settings.py

4. local.py <== 개발자 개발용 settings.py

   ![분리된 세팅](/media/sc_2_80398.jpg)

정도로 나눠서 세팅을 구분했다. 

```python
#base.py 
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SECRET_KEY = 'SECRET_KEY'

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    'django.contrib.staticfiles',
		...
]


MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'corsheaders.middleware.CorsPostCsrfMiddleware',
  ...
]

ROOT_URLCONF = 'beautifur_awsome_project.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': ['templates', ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

AUTHENTICATION_BACKENDS = (
    'django.contrib.auth.backends.ModelBackend',
)

WSGI_APPLICATION = 'beautiful_awosome_project.wsgi.application'

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

LANGUAGE_CODE = 'ko-KR'

TIME_ZONE = 'Asia/Seoul'

USE_I18N = True

USE_L10N = True

USE_TZ = True
```

```python
# product.py
from .base import *

DEBUG = False 
# 꼭꼭꼭 까먹지 말아야한다. 
ALLOWED_HOSTS = ['*']

CORS_ORIGIN_ALLOW_ALL = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'prod_db_name',
        'USER': 'prod_db_user',
        'PASSWORD': 'prod_db_password',
        'HOST': 'prod_db_host',
        'PORT': 'prod_db_port',
    }
}

WSGI_APPLICATION = 'beautiful_awosome_project.wsgi.application'

#그외 추가 적인 세팅
```

```python
# local.py 
from .base import *

DEBUG = True 
 
ALLOWED_HOSTS = ['*']

CORS_ORIGIN_ALLOW_ALL = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'local_db_name',
        'USER': 'local_db_user',
        'PASSWORD': 'local_db_password',
        'HOST': 'local_db_host',
        'PORT': 'local_db_port',
    }
}

WSGI_APPLICATION = 'beautiful_awosome_project.wsgi.application'

#그외 추가 적인 세팅
```

이렇게 세팅을 잡아놓으면 편하게 사용이 가능하다. 





