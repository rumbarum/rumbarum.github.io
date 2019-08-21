---
title: "HTTP, RESTful API 이해하기"
date: "2019-08-21T01:23:45.678Z"
template: "post"
draft: false
slug: "/posts/understaingHttpandRestfulAPI/"
category: "Develop"
tags:
- "Backend"
- "Http"
- "Api"
description: "Http 와 RESTful API 간단하게 톺아보자 "
---
<h3 style="color:rgb(9, 136, 104)">통신은 계속해서 발전한다.</h3>
## Http? 

Hyper Text Transfer Protocol  

- Hyper Text (html)을 보내기 위한 통신 규약! 

- 비슷한 규약으로 STP, FTP 등이 있다. 

- 웹서비스는 Http 기반으로 발전했다.  그래서 Http로 다른 데이터를 주고 받는다. 

- 클라이언트와 서버가 서로 데이터를 주고 받는데 Http 프로토콜에 맞춰서 보낸다. 


## Http의 핵심 

  1. #### http request and response로 나뉘어 있다. 

     - 요청을 하면 무조건 응답이 온다. 왜냐 그래야 통신이 되고 있는건지 아니까. 그렇지 않으면 통신이 되는건지 알 수 가 없다.  

  2. #### stateless 무상태

     - 다른 통신 존재를 모른다.(이 통신의 이전, 이후 통신과 전혀 관련이 없다. ) 
     - 처음통신에서 유저가  로그인 했는데 두번재 통신에서 로그인 유저인 줄을 모른다.
       - 그래서 이런 경우 요청에 필요한 정보를 같이 request에 첨부해서 보내야 한다.

## Request & Response 

#### Request 구성

- start line - Req 시작부 

  - mothod : request가 의도한 action
  - target :  상세주소 (도메인의 상세 주소 보통 자동 처리 해준다.
  - version : http 의 버전을 표시한다. 보통 1.1 또는 2.0 (3.0 까지 나와있다.)
- headers -Req 부가설명 

  - host : 메인서버 도메인   

  - user agent : 클라이언트에서 가지고 있는 정보, 크롬? 사파리? 랩탑? 아이패드? 

  - Accept : 받을 수 있는 응답 타입 

  - connection : 서버와의 연결을 어떻게 할 것인지 
- 초기에 조금 시간이 걸린다. (컴터 입장에서)
    - 보통은 살려둔다(keep alive)
- content type : 보내는 콘텐츠 유형
  - content length : 콘텐츠 길이
- body - 서버측에 보내는 내용
- 서버에서 자료를 받기만 하는 경우 비어있는 경우가 있다. 
  - 서버에 정보를 올려야 할 경우 양식에 맞춰서 작성해서 올린다.

### Response

- status line - 요청에 대한 상태를 보내기 때문에 status line으로 시작
  - http버젼 
  - status code : 응답 상태를 나타내는 숫자로 되어 있는 코드
    - 자주쓰는 status code & status text : 
      - 200 - OK 통신이 잘 되었다. 
      - 301 - Moved Permanently 요청한 주소가 변경되었다.
      - 400 - Bad Request 잘못된 정보를 넣었다.( 한글이름에 영문을 넣었다.)
      - 401 - Unauthorized 인증을 통과하지 않았다.(비로그인)
      - 403 - Forbidden 권한이 없다.(어드민만 이용 가능한 곳에 접속)
      - 404 - not found 없는주소
      - 500 - Internal Server Error 서버에러
- header :  useragent 대신 server 헤더가 사용 그밖엔 유저와 동일하다.
- body : 클라에서 요청한 것에 따라  해당 내용을 담아서 보낸다. 내용이 없는 경우도 있다. 

#### HTTP method - 클라이언트에서 서버에 요청하는 방법 

- 개발자는 상황에 따라 서버에 어떤 요청을 보낼 것인가 결정해야 한다.
- `GET` : 데이터를 받기만 한다. 
- `POST` : 서버에 내가 주고 싶은 정보를 줄수 있다. 
- `OPTIONS` : URI 에서 가능한 method를 가져온다. cors 문제 때문에 많이 쓴다. 
- `DEL` : 데이터 삭제  `POST`를 통해서도 삭제요청을 할 수 있지만 `DEL` 쓰는게 더 깔끔해진다.
- 그 외 더 많은 method가 있지만, 주로 쓰는건 `GET, POST, DEL`왜냐구? 편리성 증대. 



## RESTful API - REpresentational State Transfer

아래의 4가지를 처리하는 endpoint를 만든다면?? 
- 모든유저정보
- 1명 유저 정보
- 유저생성
- 유저삭제 

내가 생각했던 답변은 

- host/getAllUserInfo
- host/getUserInfo/number
- host/createUser
- host/deleteUser/number

### Restful Api 로 하면

- GET   host/user

- GET   host/user/usernumber

- POST host/user

- DEL    host/user/usernumber 

결국

- 리소스(HTTP URI로 정의된)를 어떻게 한다(HTTP Method + Payload)를 구조적으로 깔끔하게 표현하는것.
- 쉽게말해 api 주소 짜는 패턴 
- 동사는 method 로만
- 해당 명사는 주소.

#### 장점

​		RESTful API는 그 자체만으로도 API의 목적이 쉽게 이해가 된다.

#### 주의사항 

- `/`(슬래시)는 계층 관계를 나타낼때 사용된다.

-  `_`(underscore)는 주로 포함하지않고 또한 영어 대문자보다 소문자를 쓴다. 그리고 너무 긴 단어는 잘 사용하지 않는다.
- URI는 명사를 사용한다.