---
title: "HTTPie 뽀개기"
date: "2019-09-10T01:23:45.678Z"
template: "post"
draft: false
slug: "/posts/httpieintro/"
category: "Develop"
tags:
- "Backtend"
- "Utility"
- "Httpie"
description: "터미널로 서버통신 해보기 어떻게? HTTPie로!"
---
<h2 style="color:rgb(9, 136, 104)">터미널로 통신 하는게 중요해?</h2>
그렇다! 그래서 HTTPie가 있다. 

왜? gui를 지원하지 않는 환경에서는 cli로 작업을 해야하거든! 서버 컴퓨터에서는 우리가 눈으로 보는것 같은 그래픽기반( 눈에 보이는 아이콘, 누를 수 있는 버튼의 존재 )이 아니다. 그래서 오로지 텍스트를 보내고 텍스트를 받을 뿐이다. 그런 텍스트도 잘 맞춘 양식에 맞춰 보여준다면 (텍스트 컬러, 텍스트 배치 등을 통해) 작업의 효율이 증대한다!  

그래픽 기반의 HTTP 통신 테스트 해볼 수 있는 프로그램으로는 POST MAN 이 있다. (프론트엔드 유저분들 참고 )

- HTTPie 설치

  - ### macOS

    ```bash
    $brew install httpie
    
    $pip install --upgrade https://github.com/jakubroztocil/httpie/archive/master.tar.gz
    ```

- HTTPie 사용 

  - 다양한 기능을 제공하는데 지금 까지 많이 사용 하는건 아래 4가지 정도이다. 그 외 다른 사용법은 홈페이지를 참조하면 된다. 

  | 아이템 타입                                        | 설명                                                         |
| -------------------------------------------------- | ------------------------------------------------------------ |
  | HTTP Headers `Name:Value`                          | 헤더 값 입력 `X-API-Token:123`.                              |
  | URL parameters `name==value`                       | URL query string 값 입력    `offset=0 limit =10`             |
  | Data Fields `field=value`, `field=@file.txt`       | Json 형태의 값으로 자동 입력(default). `user_id=ThisisID user_pw=Thisispassword` |
  | Raw JSON fields `field:=json`, `field:=@file.json` | Json 이 아닌 다른  형식( `Boolean`, `Number`, nested `Object`, or an `Array`)을 Json으로 보낼때 사용  `number:=100`, `bool:="true"`, `array:='["ham","spam"]'`, `pies:=[1,2,3]` `argument:='{"aaa":"a1", "bbb":"b1"}'`  (따옴표 주의 ).  
nested object |


reference https://httpie.org/