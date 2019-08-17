---
title: "Decorator 톺아보기 "
date: "2019-08-05T01:23:45.678Z"
template: "post"
draft: false
slug: "/posts/19-08-05_python_decorator /"
category: "Develop"
tags:
- "Python"
- "Method"
- "Concept"
description: "첨보는 데코레이터 코드 이쁘게 데코해주나요? Error~! "
---

<h3 style="color:rgb(9,136,104)">Decorator 와의 싸움</h3>

#### Decorator 개념

기존의 함수에 여러가지 기능을 추가하는 파이썬 구문이라고 한다.

어떤 함수실행에 앞이나 뒤에 원하는 코드(함수)들이 같이 실행되도록 할 수 있다!

함수 또는 함수의 인자들을 활용 할 수도 있다.

fnA() ⇒ fnB ⇒ ....fnN

### Decorator 샘플 코드

```python
def decorator_function(original_function):  #1
    def wrapper_function():  #5
        return original_function()  #7
    return wrapper_function  #6


def display():  #2
    print 'display 함수가 실행됐습니다.'  #8

decorated_display = decorator_function(display)  #3

decorated_display()  #4 

'display 함수가 실행됐습니다.'#9
```

1. decorator_function 정의
2. display 정의
3. decorated_display라는 변수에 display 함수를 인자로 가진 decorator_function을 실행한 리턴값을 할당(리턴값은 wrapper_function 아직 실행되지 않음 )
4. decorated_display()를 통해 wrapper_function을 호출
5. wrapper_function 정의
6. wrapper_function 호출
7. original_function(=display) ()
8. 문자열 출력

### Decorator Why?

```python
def decorator_function(original_function):  #1
    def wrapper_function():  #5
        실행시키길 원하는 코드1111  #7
        return original_function() #8  
        실행시키길 원하는 코드2222  #9
    return wrapper_function  #6

def display():  #2
    print 'display 함수가 실행됐습니다.'  #8

decorated_display = decorator_function(display)  #3

decorated_display()  #4 

실행시키길 원하는 코드 1111 #10
'display 함수가 실행됐습니다.'#11 
실행시키길 원하는 코드 2222 #12 
```

위와 같이 내가 함수 실행에 내가 원하는 코드를 엮을 수 있다.

그럼 그냥 함수 하나로 짜면 안돼?

- 중복되는 부분을 함수에서 분리시켜 코드를 줄일 수 있다.
- 그 외의 장점은... 생각해봐야겠다.

위의 방법을 줄일 수 있는 방법이 있다! @심벌 사용하기

```python
# -*- coding: utf-8 -*-
def decorator_function(original_function):
    def wrapper_function():
        print f'{original_function.__name__} 함수가 호출되기전 입니다.'
        return original_function()
    return wrapper_function


@decorator_function  #1
def display_1():
    print 'display_1 함수가 실행됐습니다.'


@decorator_function  #2
def display_2():
    print 'display_2 함수가 실행됐습니다.'

# display_1 = decorator_function(display_1)  #3
# display_2 = decorator_function(display_2)  #4

display_1()
display_2()

'display_1 함수가 실행됐습니다.'
'display_2 함수가 실행됐습니다.'
```

변수를 붙이고 실행 시키는 대신 @심벌을 데코레이션 함수와 함수 정의에 붙여 준다.

그럼 동일한 결과를 얻는다 .

### Decorator 실전

### original_function의 인자가 있을 경우

```python
def decorator_function(original_function):
    def wrapper_function(*args, **kwargs):  #1
        print f'{original_function.__name__} 함수가 호출되기전 입니다.'
        return original_function(*args, **kwargs)  #2
    return wrapper_function


@decorator_function
def display():
    print 'display 함수가 실행됐습니다.'


@decorator_function
def display_info(name, age):
    print "display_info({name}, {}) 함수가 실행됐습니다."

display()
print
display_info('John', 25)

"display_info 함수가 호출되기전 입니다."
"display_info(John, 25) 함수가 실행됐습니다."
```

display 함수가 인자 (name, age)를 받을 경우에는 wrapper 함수와 original_function에 인자를 설정해줘서 인자가 전달 될 수 있도록 한다. *args, **kwargs 를 같이 써줘야 유동적으로 인자를 받을 수 있다.

### Decorator에 parameter 집어넣기

그리고 decorator_function에도 parameter를 집어 넣는 것도 가능하다!

```python
# 1. 데코레이터를 데코레이터 해놓기- 이렇게 함으로써 데코레이터가 함수이외의 인자를 넣을수 있는 자리를 만들어 준다. 
def parametrized(dec):
    def layer(*args, **kwargs):
        def repl(f):
            return dec(f, *args, **kwargs)
        return repl
    return layer

@parametrized
def decorator_function(original_function,paramofDeco):
    def wrapper_function():
        print f'{original_function.__name__} 함수가 호출되기전 입니다.'
        return original_function() + paramofDeco
    return wrapper_function

@decorator_function(paramofDeco)
def display_3():
	    print 'display_3 함수가 실행됐습니다.decorator_function() 인자는 '

display_3()
 'display_3 함수가 호출되기전 입니다.'
 'display_3 함수가 실행됐습니다.decorator_function() 인자는 paramofDeco'
 

# 2. 데코레이터를 한번 더 싸기
def deco_decorator_function(paramofDeco):
  def decorator_function(func):
    def wrapper():
      print f'{original_function.__name__} 함수가 호출되기전 입니다.'
      result = func()
      return result + paramofDeco
    return wrapper
  return decorator_function

@deco_decorator_function(paramofDeco)
def display_4():
	    print 'display_4 함수가 실행됐습니다.decorator_function() 인자는 '

display_4()
 'display_4 함수가 호출되기전 입니다.'
 'display_4 함수가 실행됐습니다.decorator_function() 인자는 paramofDeco'
```

1의 방법은 한번 만들어 놓으면 @심벌로 다른 데코레이터 함수들선언시에 parameter를 쉽게 받을 수 있도록 할 수 있다. (코드 1줄 줄일 수 있네. n번 늘어나면 n줄 Save! )

2의 방법은 그때 그때 적용

*주의사항 데코레이터 함수가 parameter 값을 받도록 설정했을때, 만약 paremeter값을 받지 않아도 실행코드 " () " 만들어 놔야한다. 안그러면 실행이 되지 않는다. (파라미터값을 넣고 데코레이터 실행한다는걸로 코드가 작성되었기 때문이다.

```python
#위의 데코레이션을 사용한다고 가정했을때 

@deco_decorator_function
def display_5():
	print " something "  

display_5()
##실행에러 

@deco_decorator_function()  
def display_6():
	print "something" 

display_6() 

"something"
```