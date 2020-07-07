---
title: "TIL&TEL 19.12.30 ~ 20.01.05"
date: "2020-01-06T01:23:45.678Z"
template: "post"
draft: false
slug: "/posts/TIL&TEL_2020-01-06/"
category: "TIL&TEL"
tags:
 - "TIL"
 - "TEL"
 - "TWC"
description: "  19.12.30 ~ 20.01.05  배운것, 씨름한것들"
---



### TIL( Today I Learned)

- **19-12-30 월**
  - 채널별특징 세분화
    - 서로 다른 채널에서 고정되지 않은 데이터 처리 반영을 고민하였다.
  - 팀회의 
    - 회의를 통해서 가는 방향이 좀더 구체화 되었다. 나는 좀더 뒤의 것을 생각하고 있었다. 필요한 것은 앞부분이었다.
  - 20:20 위코드 백엔드 스터디
    - 인터페이스 
      - Java에서 사용하는건데, 공통적으로 가지게 되는 클래스의 공통부분 같은 느낌이었다. 
    - 프로토콜, 프로토콜 버퍼에 대해 들었다. 뭔지 다시 봐야겠다.
- **19-12-31 화**
  - 크롤링 대상을 어떻게 수집할것인가에 대해 고민해보기 
- **20-01-01 수**
  - 수집한 것 어떻게 저장할지 고민함
    - DB 저장
      - RDB 
    - CSV 저장
      - 로딩 및 저장 매우 불편함
      - 계속적인 데이터의 처리 어려움
    - pickle 저장
      - 계속해서 커지기 때문에(뉴스데이터가 계속 증가한다.) 파이썬이 감당 할수 없는 사이즈로 커질 수있다.
    - 위 선택지중 단발성이라면 csv나, pickle이 될 수 있지만 계속해서 저장하고 불러온다면 결국은 DB다.   
- **20-01-02 목**
  - DB에 어떻게 저장을 할까 고민함
    - SQL alchemy ORM
    - PyMySQL로  Query 문 작성하기
    - flask - SQL alchemy ORM 사용하기
    - Django 내 ORM 사용하기
    - 내가 할 크롤러가 웹서버 역할을 기대하지는 않으니, 웹서버 프레임웤은 배제, PyMySQL이나 SQL alchemy 둘 중 하나였는데 쿼리문 일일이 작성하는 것도 일이라 생각되어 배제 
    - 성능 이슈가 되는 부분이 있어서 PyMySQL도 사용하기는 해야한다고 한다
  - 위코드 4기 후배님들에게 취업선배로서 팁을 전수하는 시간을 가졌다. 
- **20-01-03 금**
  - MySQL로 DB 생성 오랜만에 해보고,
  - SQL alchemy 작동 코드 쳐서 ORM 연결
  - 19:00 위코드 33기 송년회 
- **20-01-04 토**
  - 운동
  - 빔위키 다시 도전해보기 했는데 개인 wiki로 Dynalist를 잘 쓰고 있어서 필요성에 의문을...

### TEL (Trial and Error Log)

- **20.01.02**
  - iterm 폰트 사이즈 조절 이상한데서 헤매다가 profile 에서 조절이 가능함을 알게되었다.
    - 그 전에는 Advanced에 들어가서 조절해야 하는 줄 알고 헤매다가 못찾았다. 거기서는 틀적인 부분을 조절하고, 비주얼 부분은 profiles에서 조절한다.
    - Preferences > Profiles > Text > Font  사이즈 조절 
  - print != return 
    - 지난번에도 한번 헷갈렸는데 프린트는 나만 보는 부분이다. 프로그램이 인식하지 않는다.
