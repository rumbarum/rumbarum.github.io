---
title: " Git 간단하게  돌아보기"
date: "2019-08-22T01:23:45.678Z"
template: "post"
draft: false
slug: "/posts/roughunderstandingGit/"
category: "Develop"
tags:
- "Backend"
- "Git"
- "Github"
description: "요즘 개발자라면 빼먹을 수 없는 Git 초스피드 훑어보기 "
---
<h2 style="color:rgb(9, 136, 104)"> 모든 버전의 수정내역을 기록한다. </h2>
- ### Git

  - #### version control system

    - 만약 한개의 파일을 수정하고 수정하고 수정한다면, 저장하기로 덮어쓴다.(수정내역은 알수 없고 최종파일만 존재한다. ) 또는 버전별 파일들을 계속 해서 최종의 최종의 최종의 파일까지 만들어 내기도 한다. 
    - 한개의 파일이 아니라 다수의 파일을 수정하고, 각각의 수정내역을 필요에 따라 볼수 있게 만들려면? 
      - 각각의 버전별 파일을 만들고 수정내역을 스프레드 시트 파일 하나를 만들어서 일일이 저장해놔야할 것이다. 
      - 이 스프레드 시트 파일 역할을 Git이 한다고 한다.(수정날짜, 수정자, 수정한 파일, 수정한코드 등을 자동으로 기록한다. 그리고 어떤 내역들을 변경했는지 commit으로 적어준다. )
      - 참고로 Git은 리눅스 만든 리눅스토발즈 아저씨가 만들었다. 개발자들 최고 많이 쓰는 2개를 만듦.
    - 코드 버전별 세이브 포인트를 만들어 놓는셈이다. 
  - Git은 기존의 버전관리 시스템 대비 협업이 쉽다.
    
    - 모든 파일을 다 다운 받기 때문에 서버 문제가 있어도 기존에 받아놓은 파일로 복구 또는 다른 서버를 통해 관리가 가능하다. 
      - 행여나git hub 서버 다운시 다운 받아논 걸로 한다. 

- ### Git hub

  - Git을 관리하는 서버

  - 독자시스템 구축 대비 저렴한 비용

  - 파일 공유 및 코드 리뷰가 쉽다. 

    

- #### GIT 진행 단계 stage 

  ```javascript
  local ==> file -> modified -> Staged -> Committed
  push => Github
  ```
  
  - 파일을 원하는 대로 modify 하고 Stage 단계로 넘긴다. 
  - stage 중간단계 commit을 준비한다.  
  - commit 하면 수정하기 어렵다.  되도록이면 Stage 전단계에서 끝내는 걸로. 
  
  
  
- ### Branch & Merge

  - Branch는 줄기인 Master에서 뻗어나온 가지이다. Master를 베이스로 가지로 나누어 개발자들 끼리 역할을 분담해서 진행한다. 보통 기능 단위로 Branch 따와서 작업을 한다. 
  - Merge는 처리한 가지를 다시 Master에 합치는 것이다 . 
  - 여러 가지로 뻗어 나간 가지에서 상이한 개발자가 동일한 부분을 수정하게 되면 Merge 과정에서 conflict가 나타나게 된다. 이는 프로그램 버그 발생의 큰 요인이다. 
    - 내가 A 파일 첫 줄에 A++ 라고 쓰고 다른 개발자가 A파일 첫 줄에 A--라고 쓰면 컴퓨터는 A++ 와 A-- 둘중에 어느것이 맞는지 판단을  할 수가 없고 개발자에게 이를 수정할 것을 요구한다. 앞선 개발과 에러테스트에 힘을 쏟은 개발자는 여기서 대충 넘어가게 되는 경우가 종종 생긴다. 

- ### Commit

  - commit 메시지 상세하게 남기는게 정석 - django git에서 퍼온 commit 예 

  - ```
        Fixed #29979, Refs #17337 -- Extracted AutoField field logic into a mixin and refactored AutoFields.
    
        This reduces duplication by allowing AutoField, BigAutoField and
        SmallAutoField to inherit from IntegerField, BigIntegerField and
        SmallIntegerField respectively. Doing so also allows for enabling the
        max_length warning check and minimum/maximum value validation for auto
        fields, as well as providing a mixin that can be used for other possible
        future auto field types such as a theoretical UUIDAutoField.
    ```

    commit 수정

    - push 하기 전에는 가능하다. 
    - 만약 commit 한 버전이 공유가 되면 바꾸지 말아야한다. 다른 개발자가 내가 공유한 것을 바탕으로 빌드하던건이 망가지게 될 가능성이 생긴다. 

  - history

    - push 됬을때 commit 시간이 마스터 파일에 박힌다.  

- ### 유용한 Git Tool

  - #### Tig: text-mode interface for Git 

    - Git 기록들을 보기 쉽게 만들어준다. (git log 들)

  - #### diff-so-fancy 

    - diff는 파일이나 폴더들의 수정사항들을 저장해놓는 것
    - 컴퓨터가 읽을 수 있는 형태로만 적힌 것을 사람이 읽기 쉽도록 표현해서 보여준다. 

  - #### Git Extra

    - 기본 깃 기능에 추가 기능들 구현( git summary)