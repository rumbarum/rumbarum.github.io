---
title: "TIL & TEL 19.07.29~ 19.08.04 "
date: "2019-08-04T01:23:45.678Z"
template: "post"
draft: false
slug: "/posts/TIL&TEL_weekly_19-08-04 /"
category: "TIL&TEL"
tags:
- "TIL"
- "TEL"
- "Wecode"
description: " 19.07.29~ 19.08.04 배운것, 씨름한것들 "
---
<h2 style="color:rgb(9, 136, 104)">TIL & TEL 19.07.29~ 19.08.04 </h2>
### TIL( Today I Learned)

- 19.07.29 

  - 위코더들 자기소개 
  - 학습 계획 공유 
  - CSS 복습 문제풀이 
  - CSS 문제풀이후 JS 복습 문제풀이 

- 19.07.30

  - 장비세팅 
  - JavaScript 공부

- 19.07.31

  - JavaScript 공부
  - 개발자도구 다루기 
  - html/ css 실습 돌입 

- 19.08.01 

  - 자바스크립트 마무리
  - Dom셀렉터 공부
  - Flex 적용 게임 - 개구리게임 
  - 트위터클론 이벤트 만들기 

- 19.08.02
  - 자바스크립트 이벤트 컨트롤 ​

### TEL (Trial and Error Log)

- 19.07.30 

  - For 문 에러
    for문 사용시 return 을 for문 안에서 사용해 버리면 for문이 돌지를 못한다. return 하고 후속 과정을 종료해버리기때문이다. 코드스테이츠 시험에서 한번 틀렸었는데 또 틀렸네.
  - 함수 실행 에러
    함수인지 아닌지 구분을 잘 하시고, 함수이면 함수를 참조하는지, 함수실행 결과를 참조하는지 잘 구분하고 코딩할것!

- 19.07.31

  - ES6 arrow function 선언하기

     `const or let 함수명 = ( param ) => { 함수코드} 단일 리턴일 경우 {} 생략 가능!! `

  - appendChild 잘못 실행 
    ```const doassignment = () => {
    var inputposition = document.getElementById('h1-title') ;
    let makePtag = document.createElement('p') ;
    makePtag.className = 'dom' ;
    makePtag.innerHTML = 'DOM' ;

    console.log(makePtag);
    console.log(inputposition);

    inputposition.appendChild(makePtag) ;
    } ;

    doassignment() ; ``` 

    inputposition 앞에 document 붙여서 틀림.. - _ -;;;

    컴퓨터는 안틀려.. 바름이는 틀려... 안되면 이유가 있다.
    ```


  - 내컴에서만 돌아가는 코드는 의미가 없어요 ㅜㅠ 끼워맞추기 코딩

    - ```javascript
    const getCookieValue = () => { 
      let result = "" ; 
let sentence = document.cookie ; 
      let position = sentence.indexOf('ajs_anonymous_id') ;
      let cutlength = sentence.indexOf('ajs_user_id')-2 ; // <==고정값이 되버리면 다른데 응용을 못함
      result = sentence.slice( position+'ajs_anonymous_id'.length +1, cutlength ) ; return result ; 
      } ; 
      getCookieValue() 이건 그냥 나의 상황에 때려맞춘거고 다른사람컴에서는 같은값이 안나오는 경우가 생긴다.
      ```
      
       
      
      - 수정본
        ```javascript
        let getCookieValue = () => {
        
        let result = "" ;
        let sentence = document.cookie ;
        let cookiearray = sentence.split(" "); 
        cookiearray.forEach ( (ele,idx) => {
      console.log(ele.slice(0,16));
        if( ele.slice(0,16)==='ajs_anonymous_id'){
      result = ele.slice(17,ele.length-1) <==문자열에 따라 변동 적인 값으로 수정
      }});
      return result ; 
        } ;
      
        getCookieValue()
        ```


- 19.08.01

  - [CSS] fixed -화면 고정 랑 absolute 다르다..
  - getElementsByClassName과 Tag 네임은 특정엘리먼트가 아닌, 엘리먼트 리스트를 찾아온다. 그래서 그 태그/클래스에 다 붙이려면 반복문으로 인덱스별로 다 붙이거나, 원하는 인덱스를 골라내야 한다. 그래야 작동이 가능하다. 
  - 자그만한 실수들 .인자 하나씩 빼먹는 실수들이 나온다. 맨날 쓰는건 더 제대로 알아야 할 필요가 있다. 그리고 정확하게 아는게 대충아는것보다 낫다...

- 19.08.02

  - getFullYear, getMonth, getDate는 함수다. ()으로 실행을 시켜줘야만 작동을 한다..
    - Date, 값의 매소드다. 단독 실행 안되..

  - 특정날자 Date 값 받는것도 new Date (특정날짜) 
  - getTime, 시간 절대값 생성 ,1970 01-01 00:00 => 0
  - 숫자는 length 인자가 없습니다....
  - toString 은 함수이다. () 으로 실행시켜야한다.
  - css. 셀렉터 잘못 골라서 고생고생 

- 19.08.03

  - String.indexOf( ) 인자로는 스트링이 옵니다.
    - String.indexOf("string") => o
    - String.indexOf(string) => x 
  - 불러오는 값이 정확히 어떤 값인지 파악합니다.
    - 
      ```container2.style.left = 385px ```
      소환 되는 값은 string "385px" 
      값을 사용하시고 싶으면 px를 떼시고, number 로 바꿔 주세요 바름군. 
  - 처리되는 값과 가능 범위 계산 조심 범위 설정한 값에서만 움직이도록 할때 조건 계산을 잘 해야한다.
    - 한 점이 0~ 20 사이에서 내가 입력한 값으로 좌우로 3씩 움직인다.
      시작점이 10으로 고정. 
      좌로 3번 가면, 좌표가 1이된다. 우로 3번 가면 좌표가 19 
      내가 움직임을 입력할 수 있는 위치를 0~ 20으로 설정해 놓는다면, 1에서도 나는 -3을 입력 할수 있다. 좌표는 -2가 된다. 
      내가 움직임을 입력할 수있는 범위를 벗어났기 때문에 (0~20) 나는 오른쪽으로 복귀하는 움직임을 할 수 없게 되었다. 
      0~20 사이 움직여야 한다면, 결과 위치가 0~20 사이 위치하여야 하고, 입력 위치는 그 범위 안에있어야 한다. 
      결과 가능한 위치 (1~19)
      좌로 입력 가능한 위치( 4~19) 
      우로 입력 가능한 위치( 1~ 16) 

    - intervalID = setInterval( func, delaytime ) 으로 실행 delaytime 은 그냥 number

      - clearInterval(intervalID) 로 인터벌 삭제 
      - 리턴으로 임의의 타이머 id 

    - timeoutID = setTimeout( 실행함수나 코드 , 타임, 코드parametet(optional) )
      - function() 으로 입력하면 안된다. function을 하고,인자값을 3번째 para 로 주던지,
         let wantrunthis = ( param) => { ...} 실행 원하는 함수 
        param=> target 집어넣을 값 

        \1. setTimeout( wantrunthis, 5000, target ) 

        \2. setTimeout( ()=>{wantrunthis(target) }, 5000 )

        \3. setTimeout( (param)=>{wantrunthis(param)},5000, target) `

    - python 에러

       다섯줄을 출력하는 방법...? 출력을 다섯번을 하면 된다. => 큰따옴표 3개를 앞뒤로 붙인다.

- 19.08.04

  - 파이썬 등호는 == 
  - if, elif, else 조건문 뒤에는 " : " 붙이기 
  - else 뒤에는 조건문이 붙지 않는다
  - 숫자를 표현할때 4/2 => 2.0 not 2 !!! so 4//2 를 쓰던지, int(4/2) 를 해줘야 한다.

