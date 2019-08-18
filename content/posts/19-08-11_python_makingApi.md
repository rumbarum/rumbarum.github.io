---
title: "REST-framework 를 쓰지 않고, 초간단 api 서버 만들기하면서 장고 기본원리 설명하기 "
date: "2019-08-11T01:23:45.678Z"
template: "post"
draft: false
slug: "/posts/createapiwithoutrestframework/"
category: "Develop"
tags:
- "Django"
- "Api"
description: "django를 사용해서 간단한 API end point 를 만들어 봅시다. (get/post method 사용 안함) "
---
<h2 style="color:rgb(9, 136, 104)">간단한 Json을 보여주는 API를 만들겁니다.</h2>
( python, conda, django, pip 의 설치 내용은 이번글에 포함되지 않습니다 . )

https://www.youtube.com/watch?time_continue=707&v=s9E5EYAm5gs 

위 유튜브의 내용을 3.7 python에 맞추어 정리해보았습니다. 

1. #### [shell] 프로젝트 담을 폴더로 이동 후 프로젝 장고프로젝트 스타트  

   프로젝트는 만드려고 하는 웹페이지의 전체(프론트엔드, 백엔드 총괄//보여지는 부분과 보이지 않지만 동작하고 있는 기능, 데이터베이스)를 통칭한다고 보시면 됩니다.

   ```python
   django-admim startproject someproject  # <== shell 에서 입력 
   ```

2. #### [shell] 프로젝트 폴더에서 앱만들기

   앱은 프로젝트를 이루는 구동 단위 입니다. 페이지라기 보다는, 로그인 기능, 결제 기능등등의 기능 단위로 이해하시면 됩니다. 

   ```python
   python manage.py startapp someapp # <== shell 에서 입력 
   ```

3. #### [shell] 세팅 변경	

   프로젝트의 세팅을 변경해서 원하는 세팅으로 작동할 수 있도록 합니다.

   ```python
    vi someproject/settings.py #<== vim으로 파일을 열고 
    
    INSTALLED_APPS = [
      ...
     'someapp', #<== 추가후 저장 하시면 됩니다.
    ]
   ```

   <u>*vim 설명 : 터미널에서 작동하는 텍스트 에디터, 파일을 열면 기본은 view 모드 입니다. 수정을 하기 위해서는 i 키를 눌러야 삽입모드가 됩니다. 원하는 텍스트로 수정후  :wq 를 입력하면 저장후 종료가 됩니다.</u> 

4. #### [shell] url 변경 

   url은 앱을 구동시키기 위한 경로입니다. 홈페이지 상에서 연결되는 페이지 경로라기 보다는, 설정한 기능을 불러오는 경로라고 보시면 됩니다. 

   ```python
   vi someproject/urls.py # <== vim으로 파일을 열고 
   
   from django.urls import path, include  #<== django.urls에서 경로설정을 하기 위해 필요한 path, include	를 불러옵니다 .
   
   from django.contrib import admin  # 장고의 기본 관리자 설정을 불러옵니다. 
   
   urlpatterns = [                   #url 경로를 설정하는 양식입니다. 
   
    path ( 'admin/', 'admin.urls.py')  #메인 페이지 경로에 admin/추가시 'admin.urls.py'을 참조합니다.
   
    path ( ' ', include('someapp.urls')) #메인 페이지경로에서 someapp.urls 주소를 참조합니다. 프로젝트의 url이 앱의 url을 가르키도록 설정합니다.  
   
   ]
   ```

   ```python
   vi someapp/urls.py  # <== vim으로 파일을 열고 
     
   from django.urls import path  #  마찬가지로 someapp에서도 경로설정을 위해 path를 불러옵니다. include는 필요하지 않습니다. 
   
   urlpatterns = [     #앱에서 어떤 로직을 불러올지 설정합니다. 
   
    path ( '', views.content_list) #views.content_list는 someapp이 불러올 실행코드(view)입니다. 
   
   ]
   ```

5. #### [shell] views 세팅 후 서버 작동 확인

   ```python
   vi someapp/views.py   # <== vim으로 파일을 열고 
   
   from django.http import JsonResponse  #JsonResponse 라는 반응을 가져옵니다. 
   
   def content_list(request):            #Http Request가 올때 함수를 작성합니다. 
       data = [ {'id': 1, 'title': 'title1'}, ] # 리턴할 데이터 입니다. 들여쓰기는 화이트스페이스4칸입니다.
       return JsonResponse(data, safe=False) # 데이터를 Json 형식으로 리턴합니다. 
   
   ```

   ```python
   python manage.py runserver   # <== shell에서 실행, django를 이용한 개발서버를 활성화 시킵니다.
   
   http://127.0.0.1:8000/ # <== 브라우저로 주소로 들어가 3.에서 입력한 데이터가 나오는지 확인합니다. 나오지 않는다면 어딘가 틀렸단 얘기입니다. (제 설명이 틀리지 않았다면요...)
   ```

   

6. #### [shell ]models 세팅

   ```python
   from django.db import models # <== 작성할 DB모델을 불러옵니다. 
   
   class Content (models.Model):  # <== Content 라는 DB class를 선언합니다. 
   
       title = models.CharField(max_length=200) # DB의 값을 설정합니다. models.CharField는 max_length를 필수 인자로 받습니다. 그외의 조건들을 추가할 수 있습니다. 
   
       content = models.TextField()
    
       created_at = models.DateTimeField(auto_now_add=True) #models.DateTimeField 시간을 입력하는 DB model value입니다. auto_now_add 는 입력할때의 값으로 고정이 됩니다. 
   
       updated_at = models.DateTimeField(auto_now=True) #auto_now 데이터 저장시에 그 시점으로 업데이트되어 저장됩니다. 
   ```

   

7. #### [shell] DB 생성하기

   ```python
   python manage.py migrate  
   
   python manage.py makemigrations someapp # DB 가 위에서 설정한 모델의 설정을 저장할 수 있도록 준비합니다. 
   
   python manage.py migrate someapp # model 설정을 DB에 적용합니다.  
   ```



8. #### [shell] admin 에서 DB 에 등록 할 수 있도록 기능 추가 


   ```python
   vi someapp.admin.py 
   
   from django.contrib import admin 
   
   from .model import Post  #model Class를 불러옵니다. 
    
   admin.site.register(Post) #어드민 페이지에서 Post DB에 등록할 수 있도록 설정합니다.
   ```

   ```python
   python manage.py createsuperuser #<== admin 페이지의 id pw 설정합니다. 
   
   http://127.0.0.1:8000/admin 으로 들어가면 관리자 페이지 로그인 창이 나타납니다. 위에서 설정한 id/pw 를 이용해서 들어갑니다. 
   ```

   someapp으로 들어가셔서 데이터를 추가합니다.  title1, content1 이런 식으로 title3, content3 까지 만듭니다.

9. #### view 수정 postlist 가 나올 수 있도록

   ```python
   vi someapp/views.py   # 수정할 파일을 엽니다. 
   
   def content_list(request): 
       post_list = []              #admin에서 입력한 값들이 담길 리스트 생성
       for post in Post.objects.all():  #반복문을 돌며 리스트에 data들을 담습니다. 
           post_list.append({ 'id': post.id, 'title': post.title, 'content': post.content }) 
           return JsonResponse(post_list, safe=False)
   
   http://127.0.0.1:8000/ 에서 입력한 Title, Content 불러 오는 거 확인하시면
   위에서 입력한 title과 content가 나오는걸 볼 수 있습니다. 요호! 
   ```

   