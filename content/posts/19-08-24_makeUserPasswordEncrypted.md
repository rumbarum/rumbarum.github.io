---
title: "Argon2를 이용한 유저 PW 암호화 "
date: "2019-08-24T02:23:45.678Z"
template: "post"
draft: false
slug: "/posts/makeUserPasswordEncrypted/"
category: "Develop"
tags:
- "Backend"
- "Argon2"
- ""
description: "암호화 생각보다 어렵지 않아요."
---
<h2 style="color:rgb(9, 136, 104)"> 유저 PW 암호화 해야되? </h2>

### **네 해야합니다.**

1. 내부 이용자들의 접근방지 (유저의 정보 악용 방지)
2. 서버 해킹시 비밀번호 유출 방지 (해킹해도 PW가 암호화 되어 있어 알수가 없다.)

### **어려운거 아니야?**

	1. 내가 만들려고 하면 어려울 수도 있습니다.
 	2. 하지만 남이 만들어 놓은걸 가져다 쓸 수도 있죠!

#### **Argon2** 

1. 기존에 사용하던 암호화가 고오급 기술들의 등장으로 보안 취약점이 드러나며 탄생
2. 2015년 7월 Password Hassing Competition에서 우승함
3. 어떤 원리로 작동하는지 자세한 설명은.... 생략한다... 

**설치** 

가상환경에 설치를 원하면 가상환경을 키고, 아니라면 그냥 

```python
python -m pip install argon2_cffi
```

혹시 문제가 발생한다면, 

https://argon2-cffi.readthedocs.io/en/stable/installation.html 를 참고.



**실제 코드 적용하기**

```python
#userdatamanage/views.py  <== 유저 정보 관리 

#user_id = UserA, user_pw = 1234567890 로 회원가입 가정 

from argon2 import PasswordHasher
from .models import UserdataModel
from django.views import View
from django.http import JsonResponse 
import json

ph = PasswordHasher()

class Signup(View): #회원가입 에러는 없는걸로 가정

    def post (self, request):  
        data= json.loads(request.body)
        hash = ph.hash(data["user_pw"]) #user_pw 암호화
        user = UserdataModel(user_id=data["user_id"], user_pw=hash)
        user.save() #암호화된 pw를 db에 저장
        return JsonResponse({"message":"Signup Success"},status=200)

class Login(View):
  
    def post(self, request):
        data = json.loads(request.body)
        
        try:  
            user = UserdataModel.objects.get(user_id=data["user_id"])
            ph.verify(user.user_pw, data["user_pw"]) #db에 저장된 암호와 로그인 입력된 암호 검증
            return JsonResponse({"message":"Login Success"}, status=200)
        
        exception Userdata.DoesNotExist:   #user_id 가 탐색이 안되는 경우
            return JsonResponse({"message":"Check ID"}, status=402)
         
        exception VerifyMismatchError  #저장된 pw가 일치하지 않는 경우 
            return JsonResponse({"message":"Check PW"}, status=402)      

```

**작동확인**

```python
>>>from userdata.models import UserdataModel
>>>Userdata.objects.ger(user_id="UserA").user_pw
'$argon2id$v=19$m=102400,t=2,p=8$7I9cn0C1AgOwz3y+Ezl7hQ$AWYpL4yxd5UDAaXn5T8HMQ'
```

위와 같이 되어 있고, 이를 원상복귀(1234567890) 할 수  없다. 

확인하기 위해 입력한 암호에 대해서  true OR exception을 출력할 뿐이다.  



참조 사이트 

https://argon2-cffi.readthedocs.io/en/stable/api.html