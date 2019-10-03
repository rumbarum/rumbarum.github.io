---
title: "SEO 이해하기 "
date: "2019-08-20T02:23:45.678Z"
template: "post"
draft: false
slug: "/posts/understaingSEO/"
category: "Develop"
tags:
- "Frontend"
- ""
- ""
description: "SEO가 뭐고 어떻게 작동하고 개발자는 뭘 해야하는가. "
---
<h3 style="color:rgb(9, 136, 104)">검색과 SEO </h3>
- ## 검색 노출은 프론트 앤드의 역할이다 (백엔드 지망이라 다행... )

  - 최고 목표 : 원하는 단어 또는 연관 검색어로 구글링 했을때 1페이지 첫째 줄에 나오게 하기 

  - 구글검색의 아버지들 래리 페이지, 세르게이 브린

    - 스탠포드 박사과정에서 만남 

    - 세르게이 브린

      - 처음 프로젝트 영화평점 개인화
      - 중복되는 부분 찾아내 저작권 침해 문서 찾아내는 시스템 (아직도 쓰인다.)

    - 래리페이지 

      - 웹사이트 코멘트 주석 시스템(레딧의 아버지가 될뻔?)
      - "젊은이의 낙관주의는 종종 과소평가 받는다. "
      - 링크가 많이 되면 영향력이 있는 페이지이다. 페이지랭크 개념 도입  
      - 크롤링(=spider)을 통해 링크된 주소들을 식별하고 페이지의 가치를 평가 

    - 현재의 검색알고리즘

      - 여러개의 알고리즘

      - 문맥이 있는 사이트

      - 전통적인 판단지표들도 같이 사용 (방문수, 중요 키워드 외 등등)

        

- ## 구글에서 말합니다.  

  - 검색엔진 최적화 시간이 걸린다.

    - 성과가 나타날때까지 4개월~ 1년 걸린다.

  - ## SEO 최적화 가이드

  1. # 잘 노출되게한다.(이렇게?no..)

     사이트 주소 링크가 많이 되고 있어야 한다.
    - 사이트 링크를 여기저기 올린다. (서로 참조하면 과대광고로 블록킹)
    - 글 제목과 내용의 단어 선택을 잘 해야한다.

    ""<header>"" 잘쓰기
    - 도메인 중요 - 비싼 도메인은 도메인값을 하는...
    - 타이틀은  타이틀 + 설명으로 써야한다. 
    - 디스크립션 잘 써야한다. 
    - 리액트는 react-helmet 사용하면 추가할 수 있다. 
    - robots.txt 를 통해 크롤링 여부 전달
    - sitemap.xml 크롤러에게 사이트 내용 전달한다. 
    
  2. #### 사이트를 컴퓨터가 이해할 수 있도록 만든다

       - 크롤러가 데이터 잘 가져 갈 수 있도록 한다. 
     - html5 semantic elements을 잘 사용한다.
         - 의미를 가지는 HTML 요소들
         - 페이지 이동시 검색되길 바란다면 a 태그 
         - hn 태그 잘 달기
         - img 태그, alt 설명
         - img 사진 이름부터 잘짓기
         - img 태그위에 figure 추가