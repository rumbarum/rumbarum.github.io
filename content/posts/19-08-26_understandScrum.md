---
title: "스크럼을 알아보자 "
date: "2019-08-26T01:23:45.678Z"
template: "post"
draft: false
slug: "/posts/understandScrum/"
category: "Develop"
tags:
- "Teamplay"
- "Backend"
- ""
description: "소프트웨어 산업 작업 방식인 스크럼을 알아보자 그리고 위코드에서 실습을 해보자. "
---
<h2 style="color:rgb(9, 136, 104)">소프트웨어 똑똑한놈 혼자(리눅스? 잡스? 빌게이츠?)만드는거 아니뇨? </h2>

그렇게 생각하고 있다면 그것은 경기도 오산! 

- ## 스크럼

  - 개발 68%는 실패 한다! 

  - 실패의 정의

    - 목표기능 미달 및 불량
    - 일정과 비용초과 
    - 프로젝트 완전 폐기 

  - about

    - 나무그네 (1960년대) 만화 
      - 최종 프로덕트의 모습은 가변적이다.
    - 개발 프로젝트 운영은 어렵다
    - 단순히 시간을 많이 쓴다고 해서 잘 되는게 아니다. 
    - 인류에게 새로운 분야 짧은 역사 - 우리나라 20년, 미국 60년
    - 관리자들이 적합하지 않지만, 익숙한 방법으로 운영한다.
    - 미국 가장 효과가 입증되고 널리 쓰이는게 scrum 
    - 1986년 도요타에서 먼저 발명
      - 소프트웨어 개발 프로젝트운영에 적용됨

  - ### 기본 철학

    - 개발의 어려움
      - 개발 소요시간 진행 과정 예상 어려움 
      - 1시간이 1달로 늘어날수도 있다. 
      - 초보부터 시니어도 어려운 개발 일정 계산 
      - 단순하고 긍정적으로 생각해서 예상하는게 사람들의 특성 
    - 문제를 없애는게 아니라 문제에서 나오는 피해를 최소화 한다. 
    - 단기간 할수 있는 일을 결정하는건 비교적 예상이 가능하다 
    - 계획을 짤때 단기적인 계획을 단계를 거쳐 짜는 것이 중요함
      - 이러한 단기 기간을 sprint
    - sprint 진행방법
      - planning => daily standup => 프로젝트 완료까지 계속
    - 진행상황 파악이 쉬워짐 문제나 차질이 있을 때 미리 대처할 수 있음 
    - waterfall vs agile 
      - 기존 제조업에 쓰이던 waterfall방식에 비해 상황에 유동적으로 접근이 가능하다 (투입된 자원이 많지 않기 때문에) 
      - MVP를 만들면 된다. 거기서 기능들 더 추가해 나감  

  - Product Backlog - 이거 다하면 프로젝트 끝남요

    - => 이번주에 할것 플래닝 미팅
      - => 매일 하는 데일리 스탠딩미팅

- #### Code of conduct 위코드 스크럼 기본 규율 

  - ##### 시간엄수

    - 미팅시간
    - 맡은일 제시간에 완성

  - ##### 책임감

    - 혼자 할 수 있어빌리티
    - 자기와 팀 책임감을 진다.
    - 의존하거나 떠넘기지 말자
    - 하지 않아도 되는 일도 트라이 그래야 실력이 늘어난다.

  - ##### 팀워크 

    - 모두 성인이니까 기분대로 하지 말자
    - 서로를 배려하자 팀 분위기를 좋게 하자

  - ##### 도전정신 

    - 쉬운것말 할려고 하지말자, 쉬운것만 하면 발전이 없다. 어려운걸해라
    - 두려워하지 말라. 모르고 어려운건 당연한거다.

- ### 프로젝트 프로세스

  - 플래닝 미팅 - 이번 주간에 처리할 목록 정리 
  - kanban board- 처리할 일들의 진행상황을 한눈에 알아보게 정리한 보드 물리적인 포스트잇이나, 트렐로 등의 도구 사용
  - Daily Standup Meeting - 짧고 굵게 후딱! 미팅에 시간 오래 쓰지 말자 
    - 1. 어제한거
    - 2. 오늘할거
    - 3. 딴사람에 의해서 막혀 있는거
  - Github - PR & Code Review => L G T M!
    - 브랜치 따고 
    - 개발 테스트완료
    - 컨펌!

  