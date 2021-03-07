---
title: " TIL&TEL 21.03.01~21.03.07  "
date: "2021-03-07T01:23:45.678Z"
template: "post"
draft: false
slug: "/posts/TIL&TEL_21-03-07/"
category: "TIL&TEL"
tags:
- "TIL"
- "TEL"


description: " 21.03.01~21.03.07 배운것, 씨름한것들 "
---

## TIL( Today I Learned)

### 21-03-02 화

- 업무
  - Vue
    - content-disposition
    - SPA에선 동작하지 않는다.
  - Django 
    - access-control-expose-headers에 content-disposition을 해줘야 한다.
  - download 진행 중인 vue transition 만들기

### 21-03-03 수

- 배포 동작 확인
  - 테스트
- Service API 수정

### 21-03-04 목

- Django 수정

### 21-03-05 금

- Jenkins 수정

## TEL (Trial and Error Log)

### 21-03-02

- ERROR: Vue ['Content-disposition'] 못읽음
  - SITUATION: 파일 다운로드 API
  - REASON: 서버에서 접근 가능하게 Header를 지정해줘야 한다.( CORS 문제 방지)
  - SOLUTION:
    - response['access-control-expose-headers'] 에 ['Content-disposition'] 헤더를 추가한다. 
- ERROR: Vue 다운로드 팝업 안뜨는 이유
  - SITUATION: 파일 팝업이 뜨길 기대하는데 동작을 못한다.
  - REASON: content-disposition 에서 동작을 하는데 못잡고 있다.
    - [참고](https://medium.com/@drevets/you-cant-prompt-a-file-download-with-the-content-disposition-header-using-axios-xhr-sorry-56577aa706d6)
  - SOLUTION:
    - 방법 없음, axios의 한계
- ERROR: content-disposition 의 filename 이상하게 바뀜
  - SITUATION: django api 다운로드중
    - =?utf-8?b?
  - REASON: 영문으로 되어있던 것에 한글이 들어가면서 언어 변환이 일어났다.
  - SOLUTION:
    - 1. 한글 삭제
    - 2. decoding 추가 

### 21-03-04

- ERROR: django queryset.first() 계속 query 날림
  - SITUATION: query test 중
  - REASON: queryset.first() 는 쿼리를 계속 날린다.
  - SOLUTION:
    - queryset[0] 으로 변경
- ERROR: 새로운 코드로 버전 업그레이드가 되었는데, 동작은 구버전
  - SITUATION: django update 후 동작
  - REASON:
    - 코드는 업데이트 되었음
    - 기존 동작 python application 이 제대로 동작을 못하는듯
    - front request 날리는 곳이 저 멀리 있다.
  - SOLUTION:
    - front 세팅 추가

### 21-03-05

- ERROR: Permission denied (publickey)
  - SITUATION: ssh 접속이 안됨
  - REASON: 
    - 권한 문제이다 
    - 권한 문제이다
    - 권한 문제이다
  - SOLUTION:
    - tail -f /var/log/auth.log (on the server)로 확인
    - user@localhost chmod 700 {유저디렉토리}
    - user@localhost chmod 700 {유저디렉토리}/.ssh

