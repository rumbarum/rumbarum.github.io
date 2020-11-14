---
title: " Parameter,Argument,Default Parameter"
date: "2020-11-08T02:23:45.678Z"
template: "post"
draft: false
slug: "/posts/python_param_args/"
category: "develop"
tags:
 - "python"
 - "definition"
description: "헷갈리는 녀석들 정리해보기 "
---
<h2 style="color:rgb(9, 136, 104)">  </h2>

## Parameters or Arguments?

> The terms `parameter` and `argument` can be used for the same thing: information that are passed into a function.

함수실행에  입력되는 값을 부르는데 있어서 Parameter와 Argument는 동일하다고 볼 수 있습니다. 정의 시점과 실행 시점에서의 차이가 있다고 볼수 있습니다.

## Parameter

함수 또는 클래스 초기화 시 입력 값 변수를 부르는 호칭 입니다. 함수 또는 클래스 정의시에 입력 변수들의 동작을 작성할 때에 사용 됩니다. 

```python
def func_param(param1, param2): #param1, param2 가 parametr
  return param1 + param2

class Class:
  def __init__(self, param1, param2): #param1, param2 가 parametr
    self._param1 = param1
    self._param2 = param2
```

## Agrument

정의된 함수 또는 클래스에 실제 입력하는 값을 호칭합니다. `parameter`는 특정 함수 정의시에 전달 되는 변수를 지칭, `argument`는 실행시 전달 되는 변수를 지칭합니다. 

```python
func(10, 100) # 10, 100이 argument
>>> 110
Class(10,100) # 10, 100이 argument
>>> <__main__.Class at 0x7fc8d7414978>
```

## Default Parameter

함수 정의시에 특정 Parmeter의 값이 입력되지 않을시 사용할 값을 default로 고정시켜 놓을 때 사용합니다. 저는 이거와 Keyword Argument가 자꾸 헷갈렸습니다. 함수 정의시에 값이 정해져 있기 때문에 Parameter!!!입니다. 

```python
def func_param2(param1, param2=10): # param1 = parameter,  param2 = Default Parameter
  return param1 + param2
```

### Positional Argument

Positional Argument는 순서에 따라 입력 되는 Argument입니다.

```python
def func_def(a, b, c, d=4,e=5,f=6): 
  return (a,b,c,d,e,f)

func_def(6,5,4,3,2,1) # 6,5,4,3,2,1 모두 Positional Args
>>>(6,5,4,3,2,1)
```

### Keyword Argument

Keyword Argument는 특정 parameter 값을 지정하는 Argument입니다.



```python
func_def(6,5,4, d=3, e=2, f=1 ): # 6,5,4: Positional Args, 3,2,1 Keyword Args
>>> (6,5,4,3,2,1) 


```

Keyword Argument는 무조건 Positional Argument 뒤에 위치합니다. 안그러면 SyntaxError가 나타납니다.

```python
func_def( d=3, e=2, f=1, 6,5,4 ): # 6,5,4: Positional Args, 3,2,1 Keyword Args
>>> SyntaxError: positional argument follows keyword argument
```

### 고정된 parameter 에서 keyword args를 사용하려면

#### keywords_args만 사용시

1. 함수 실행시 전부 keyword_args를 입력한다. (함수 정의시 parameter, 또는 def parameter 사용)

   ```python
   def func_kwargs(a,b,c,d=1,e=2,f=3):
     return a,b,c,d,e,f
   
   func_kwargs(a=1,b=2,c=3,d=4,e=5,f=6)
   >>>(1, 2, 3, 4, 5, 6)
   ```

2. 함수 실행시 keywords_args를 일부 입력한다.(함수 정의시 전부 default parameter만 사용 )

   ```python
   def func_kwargs2(a=10,b=20,c=30,d=1,e=2,f=3):
     return a,b,c,d,e,f
   
   func_kwargs2(b=2, d=10, f=30)
   >>>(10, 2, 30, 10, 5, 30)
   ```

#### positional_args와 같이 사용시

1. positional_args 를 먼저 적고, keywords_args 적용, 

   ```python
   def func_kwargs3(a,b,c,d=1,e=2,f=3):
     return a,b,c,d,e,f
   
   func_kwargs3(1,2,3, d=10, e=20, f=30)
   >>>(1, 2, 3, 10, 20, 30)
   ```

2. 앞의 param에 keywords_args를 사용하고 싶으면 그 뒤에 나오는 args에도 전부 keywords_args를 사용(keywords_args 순서는 상관이 없어진다.)

```python
def func_kwargs4(a,b,c,d=1,e=2,f=3):
  return a,b,c,d,e,f

func_kwargs4(100, 200,c=300,d=400,e=500,f=600)
>>>(100, 200, 300, 400, 500, 600)

func_kwargs(100, 200,e=500,f=600,c=300,d=400,)
>>>(100, 200, 300, 400, 500, 600)
```

