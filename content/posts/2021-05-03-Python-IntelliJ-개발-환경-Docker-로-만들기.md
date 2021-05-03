---
title: "Python IntelliJ 개발 환경 Docker 로 만들기"
date: "2021-05-03T01:23:45.678Z"
template: "post"
draft: false
slug: "/posts/python-develop-with-docker/"
category: "develop"
tags:
 - "python"
 - "docker"
 - "django"
 - "ide"
description: "IntelliJ에서 Docker를 활용해서 Python 개발 환경 구성하기"

---

# IntelliJ Docker 개발 환경 구성하기 

1. ## Required

    - Docker desktop app for Mac installed
    - IntelliJ 
        - docker plugin installed

2. ## project docker 설정

    - project Docker-dev 설정

        - python image, dependency (requirements.txt)
        - pip install

    - project docker-compose.yml

        - build :  

            - context: . 
            - dockerfile: docker-file-path

        - envirionment: 

              db image config 설정

        - depends_on: 

            \- db

        - volumes:

            \- ./:/app

3. ## Python SDK 설정

    - [IntelliJ 홈페이지 설명문](https://www.jetbrains.com/help/idea/configuring-remote-python-sdks.html#Docker)

4. ## Django module 설정

    - File > Project Structure > Project Settings > Modules 
    - \+ New Module 
        - Python > Django
        - Select Prior Python SDK
        - Next
    - Set Module Name 
        - If project already exist, choose that.
    - Set Module settings
        - Project root : project root - manage.py located dir.
        - Settings : settings.py file path
        - Manage script : manage.py file path

5. ## Django  실행 설정

    - Open Run/Debug Configuration
        - Host : 0.0.0.0
        - Port: could be differ 
        - Environment variables: 
            - if settings.py is different from default, add DJANGO_SETTINGS_MODULE= <file path with . >
        - Python Interpreter: 
            - Use Specified Interpreter: Select prior python SDK.
        - Docker compose 
            - command and options: `up --build django`

## Extra

\* if python manage.py or other python commands required, 

​	```$docker-compose exec <docker-compose service name> sh -c 'python some command with args'```

NOTICE:

​	Command will excute on /app/curernt-project-dir in Docker Containter. 

