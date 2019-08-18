---
title: "Python -Class, Module, Exception "
date: "2019-08-06T01:23:45.678Z"
template: "post"
draft: false
slug: "/posts/19-08-06_python/"
category: "Develop"
tags:
- "Python"
- ""
- ""
description: "야생의 바름은(는) 파이썬의 Class,Module,Exception과 조우했다. "
---

- ### Class

  - 공통적인 개념으로 묶이는, 추상적 대상

  - object

    - 실체가 있는 구체적인 대상

  - Class 정의 하기

    - class 이름은 각 단어의 앞글자를 대문자로 사용합니다.
    - 한단어 이상으로 이루어져 있다면 밑줄(underscore) 없이 모든 단어를 다 붙인다.

  - Class의 attribute(속성)

    - class에 정의되는 공통 요소

    - class 안에서 정의해주는 함수(function)는 function이라고 하지 않고 method 라고 합니다)

    - ```python
      class Car: 
          def __init__(self, maker, model, horse_power): 
            self.maker = maker 
            self.model = model 
            self.horse_power = horse_power
      ```

  - Class Method

    - 객체가 행할 수 있는 행동

    - 메소드를 사용할때는 dot(.) 을 사용하여 객체를 호출

    - <객체>.<메소드>

    - 메소드 정의

      ```python
    class Car: 
        def __init__ (self, maker, model, horse_power): 
          self.maker = maker 
          self.model = model 
          self.horse_power = horse_power 
          
        def honk(self): 
          return f"{self.maker} 빠라바라빠라밤"
      
      hyundai = Car("현대", "제네시스", 500)
      hyundai.honk()
      > "현대 빠라바라빠라밤"
      
      ```

  - Modules

    - 모듈은 변수나 함수 그리고 클래스 등을 모아놓은 파일 (라이브러리?)
    - 다른 파일에서 재사용이 가능
    - 전체 코드가 한 파일에 넣기에는 너무 커졌을때 여러 파일로 나누어서 정리
    - Module 만들기
      - 파일을 만든후 그 안에 재사용 하고 싶은 함수나 클래스 혹은 변수등을 구현
      
      - ```python
        ## my_module.py
        my_module_var = 7
        
        def my_module_func(): 
          return "Hello!"class MyModuleClass: pass
        ```
      
        
    - import my_module
      - 모듈 전체 import
      
      - 파일 확장자인 ".py" 는 제외하고 파일 이름만 사용
      
      - 사용하기
      
      - <모듈 이름>.<모듈에서 사용하길 원하는 변수/함수/클래스 이름>
      
      - ```python
        ## main.py
        import my_module
        
        print(my_module.my_module_var)
        
        my_module.my_module_func()
        
        my_module_class = my_module.MyModuleClass()
        ```
      
        
    - Alternative ways to import modules
      - 모듈의 일부분 import
      
      - from <모듈 이름> import <함수/변수/클래스1>, <함수/변수/클래스2>, ..., <함수/변수/클래스N>
      
      - 이렇게 가져온 다음에 모듈이름을 앞에 붙이지 않아도 바로 처리가 가능하다.
      
      - 모듈에서 사용하는 것이 명확할때 from import 를 사용하면 편리
      
      - ```python
        from my_module import my_module_func, my_module_var
        print(my_module_var)my_module_func()
        ```
      
        
    - Import As
      - import 해온 정보의 이름을 사용하기 편하게 바꾼다.
      - 이름의 중복 이나 긴 이름을 방지한다.

  - Packages

    - 파일에 나누어져 있는 코드들도 다른 곳에서 하나의 module로 불러와서 사용할 수 있도록 해주는것

    - 파이썬 파일들로 이루어져 있는 디렉토리(directory)가 하나의 package

    - Package Initialization

      - [init.py](http://init.py/)파일을 통해 package 초기 설정을 가능하게함

      - Import 할때 경로의 총 길이 줄여주기

        - [init.py](http://init.py/)파일에 먼저 한번 import 후 .py 에서 import

          init

      - Package에서 import 할 수 있는 변수/함수/클래스 제한하기

        - package를 통해 import 될 수 있는 요소들은 모두 변수를 통해 정의

          all

        - all 변수는 string 값의 요소를 가지고 있는 list

        - all 변수의 default 값은 모든 함수/변수/클래스

        - all 변수를 따로 정의해줌으로 import 될 수 있는 요소들을 제한

      - 그 외 package가 import될때 꼭 먼저 실행되어야 하는 코드들을 설정해 놓는다.

    - 다른 사람의 package 사용

      - PIP는 파이썬의 package manager
      - pip install Django ( 컴온 장고!)

  - How import statement finds modules and packages

    - Import Search 순서
      - sys.module
        - import된 모듈과 package들을 저장
        - 단순한 dictionary
        - 새로 import 하는 모듈은 sys.modules 에서 찾을 수 없다.
      - built-in modules
        - 파이썬 공식 라이브러리들
        - 이미 포함되어 있어서 찾기 쉽다.
      - sys.path
        
        - string 요소들을 가지고 있는 list 
        
          ```python
          ['', '/Users/song-eun-u/anaconda3/bin', '/Users/song-eun-u/anaconda3/lib/python36.zip', '/Users/song-eun-u/anaconda3/lib/python3.6', '/Users/song-eun-u/anaconda3/lib/python3.6/lib-dynload', '/Users/song-eun-u/anaconda3/lib/python3.6/site-packages', '/Users/song-eun-u/anaconda3/lib/python3.6/site-packages/aeosa', '/Users/song-eun-u/anaconda3/lib/python3.6/site-packages/IPython/extensions', '/Users/song-eun-u/.ipython']
          ```
        
          
      - Absolute Path & Relative Path
        - Absolute path
          - 최상위 폴더를 기준으로 탐색
          - 어느 파일, 어느 위치에서 import 하던지 경로가 항상 위와 같이 동일하게 된다.
          - 경로가 길어지는 경우가 생길 수 있다.
        - relativev path
          - 현재 위치를 기준으로 탐색
          - 헷갈리기 쉽고 파일 위치가 변경되면 경로 위치도 변경되어야 하는 단점이 있습니다

- Exceptions

  - 에러 발생시 예외처리 정하기 
  
  - ```python
    def somefunc() 
        trial : 
          <실행코드>
          <실행코드에 에러가 없으면 진행되는 코드> 
          
        exception ErrorName :
          <실행코드 진행중 ErrorName 에러 발생시 실행코드> 
        
        anotherException anotherErrorName : #(optional)
           <anotherErrorName 에러 발생시 실행코드>
        
        else : #(optional)
           <ErrorName, anotherErrorName 외의 에러 발생시 실행코드> 
          
        finally : 
          <에러 발생 여부와 상관없이 최종적으로 실행되는 코드> #(optional)
    ```
  
    