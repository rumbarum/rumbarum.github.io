---
title: "frontend를 위한 Django API 통신 문서 만들기 "
date: "2019-08-19T01:23:45.678Z"
template: "post"
draft: false
slug: "/posts/miniterAPIdocument/"
category: "Develop"
tags:
- "Django"
- "Javascrip"
- "Backend"
- "Wecode"
description: "바름이가 만든 django API와 통신하려는 프론트앤드분은 이 문서를 참조해주세요! "
---
<h3 style="color:rgb(9, 136, 104)"> 통신을 위한 규약입니다. 지키지 않으시면 에러가 날 확률이 100% </h3>

- Wecode 트위터 클론 프로젝트 하시는 분들과 서버통신을 위해 만든 규약입니다!

- 전제

  - post 데이터는 post data 양식을 지켜주세요
  - response 데이터를 활용하여 적합한 유저 반응을 생성하시면 됩니다. 
  - 백엔드는 데이터 유효성 검사 안합니다. 프론트에서 하고 주세요! 
  - 서버에서는 데이터 유무와 중복만 확인합니다. 

- 응답 유형 

  - 사인업 url:   ~/signup/ 

    - post data 
      - 이름  user_name
      - 아이디  user_id
      - 패스워드 user_password
      - 프로필 user_profile
      - csrf 값(document.cookie 치면 나오는 csrftoken) user_csrf 
    - post response
      - 정상출력
        - 회원가입 완료메시지 전송 {"message":"Sign Up Success"}
      - 비정상출력
        - 이미 가입한 아이디가 있을경우 {"message":"Id is Already Exist"}

  - 로그인 url : ~/login/

    - 로그인 

      - Post data

        - 아이디 user_id
        - 패스워드 user_password

      - post response

        - 정상출력

          - 정상 로그인

             {"message":"Login Success"}

        - 비정상출력

          - 아이디 없음
            - {"message":"Check Id"}
          - 비밀번호 오류
            - {"message":"Wrong Password"}

  - 트윗페이지 이동후 트윗페이지 접속 유저 확인 ~/user_auth/

    - Post data
      - csrftoken  user_csrf: 
    - post response
      - 정상출력
        - {"data":"{"user_id": "아이디", "user_name": "이름", "user_profile": "프로파일" }",  "message":"User Info Loading Success"}
      - 비정상출력 - 없는 csrf 입력시
        - {"message": "Need Signup"} 

  - 트윗작성 ~/tweet/

    - Get 
      - 정상출력
        - 트윗 데이터 전체 
          - 유저 아이디 user_id : someid
          - 유저 작성내용 user_content: somecontent
          - 작성시간 created_at: time data
          - 트윗업데이트 시간updated_at: time data
        - {"message":"Tweet Loading Success"}
    - post 
      - 글작성 
        - Post data 
          - 아이디  user_id:
          - 콘텐츠 user_content:
        - Post response 
          - 트윗 입력시 
            - 정상출력
              - {"content_id":"contents_number","message":"Tweet Success"}
            - 비정상출력
              - {"message":"Tweet Failed"}

  - 글 삭제 요청 ~/tweet_del/

    - Post data 

      - 게시물아이디 content_id : 
      - 유저아이디 user_id: 

    - Post response 

      - 성공시
        - {"message":"Delete Success"}

      - 비정상 출력- 게시물 아이디와 유저 아이디 불일치시, 또는 이미 지운게시물 다시 삭제 요청
        -  {"message": "No Authorization"}

