---
title: " TIL&TEL 19.08.05~ 19.08.11 "
date: "2019-08-11T01:23:45.678Z"
template: "post"
draft: false
slug: "/posts/TIL&TEL~19-08-11/"
category: "TIL&TEL"
tags:
- "TIL"
- "TEL"
- "Wecode"
description: " 19.08.05~ 19.08.11 배운것, 씨름한것들 "
---
<h2 style="color:rgb(9, 136, 104)">TIL & TEL 19.08.05~ 19.08.11 </h2>

### TIL( Today I Learned)

- 19.08.05
-	파이썬 공부
  -	파이썬 데코레이터와의 씨름 
  -	2기 정재욱님의 선배 토크
- 19.08.06

  - 파이썬 공부 계속 

  - Gatsby 활용한 블로그 만들기 세션 에러대파티!
- 19.08.07
  - 장고 공식문서 튜토리얼 개시 
- 19.08.08
  - django 튜토리얼 다시 해봄
  - 송은우멘토님의 웹개발 흐름에 대한 세션
  - 지훈 멘토님과 함께 django 라이브 세션을 진행
- 19.08.09
  - django 튜토리얼 복습
  - django API 구현 세션
  - 한광훈님의 클라스 있는 클래스 강의
  - 블로그 메뉴 추가 하기 계속 삽질 
- 19.08.10
  - 깃공부 
  - django 로 Api 만드는거 다시 봄
- 19.08.11
  -	django API 만들기 다른 내용들 배우며 복습함
  -	django API 서버 개설 성공

### TEL (Trial and Error Log)

- 19.08.05

  - 파이썬 등호 == 

  - if 문 다음 : 빼먹지 마숑  

  - variable arguments  *args => args 로 받는다.

    - def function (*args  ) :

      ​    print( args)  

- 19.08.06

  - 파이썬 함수 파라미터 뒤에 " : " 
  - return 뒤에 ":" 없어야한다.
  - self를 selt로 입력했다.

- 19.08.11

  - django 초기 url 설정이 안먹혀서 삽질하고 있었는데 영상 가이드에서는 상위 urls를 비워놨는데 난 모르고 채워 눠서 안되고 있었다 . 
  - 'django.middleware.csrf.CsrfViewMiddleware', 요게 걸린다 .
    - 통신을 하면 먼저 get을 통해 csrf_token을 채울 폼을 클라로 보낸다. 클라에서 csrf_token을 같이 채워서 request를 해줘야 django 에서 request 를 accept 하고 표현한다. 
    - 편의상 개발서버에서 돌릴때에는 setting.py 에서 csrf middleware를 비활성 시켜 놓는다. 