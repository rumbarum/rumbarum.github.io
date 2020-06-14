---
title: " Django F class 알아보자"
date: "2020-06-14T01:23:45.678Z"
template: "post"
draft: false
slug: "/posts/understand-F-class-on-django/"
category: "Develop"
tags:
 - "Django"
 - "database"
 - "wecode"
description: "Django로 DB 관리하다 보면 쓸일이 생긴다 반드시... "
---
<h2 style="color:rgb(9, 136, 104)"> </h2>

## Situation:

 Django 와 별도의 python module: Sender을 동작하고 있다. Sender는 request count DB 에 쌓인 요청이 80개 미만이면 외부서버에 (동시 처리가능 80개) 요청을 보내고 request count DB에 +1 한다. 80개 이상이면 대기하다가 요청을 보내고 count +1을 한다.  외부서버는 요청을 처리하여  Django Was 에 Http Post로 보낸다. Django는 요청을 받으면 처리값을 테이블에 저장하고 count -1을 한다. 

## Problem: 

 프로세스가 종료되고 난 뒤에 request count DB 의 counter는 0 이 되어야 하는게 맞는데 끝나고 난뒤에 살펴보면 1이나 2 또는 5가 되어있는 경우도 있다. python module의 request의 텀이 더 빨라질수록 숫자도 커졌다.  요청도 제대로 되고, 다른 것도 다 정상인데 무엇이 문제일까? 

## Reason: 

count를 저장하는 과정에서 문제가 생겼기 때문이다. 

```python
#기존 저장하는 코드

def save(request):
  #... 요청 처리 ... 
  
  #counter + 
  counter = Count.objects.get(id=1)
  counter.count += 1
  counter.save()
  
  return Httpresponse(status='200')
```

처음에는 이렇게 작성을 했다. 별 문제가 없어 보인다고 생각했으나 문제가 있었다. 

### 예상하는 과정

1. Sender 가 요청을 보내 count가 40이다. 
2. Django는 40을 DB에서 불러와서 Python 메모리에 들고 있는다.
3. 40에 1을 더한다.
4. Django가 DB에 41을 저장한다. 

Sender가 요청을 보내지 않고 있다면 문제는 없을 것이다. 하지만 Sender는 80개가 넘지 않으면 요청을 계속 보내고 있는 상황이다. 

### 실제 과정

1. Sender 가 요청을 보내 count가 40이다. 
2. Django는 40을 DB에서 불러와서 Python 메모리에 들고 있는다.
3. 40에 1을 더한다.
4. Sender 가 요청을 보내 count가 41이다.
5. Django가 DB에 41을 저장한다. 
6. count 1이 누락된다. 

값을 불러와서 값을 처리하고 처리된 값을 다시 넣으니 문제가 생기는 것이다. 그럼 Sender는 문제 없는건가?

Sender는 DB에 +1을 하라고 요청을 하고 있어서(Update +1 ) 이에 해당하지 않는다. 

## Solution: 

그럼 어떻게??? 이런 난감함을 해결하고자 Django에는 F class가 있다. 

> F() 객체는 모델의 필드 혹은 어노테이트된 열의 값을 나타낸다. 실제로 데이터베이스에서 Python 메모리로 가져오지 않고, 모델 필드 값을 참조하고 이를 데이터베이스에서 사용하여 작업할 수 있다.

```python
reporter = Reporters.objects.get(name='Tintin')
reporter.stories_filed += 1
reporter.save()
```

요렇게 되어있던 코드를

```python
from django.db.models import F

reporter = Reporters.objects.get(name='Tintin')
reporter.stories_filed = F('stories_filed') + 1
reporter.save()
```

이렇게 해주면 파이썬을 거치지 않고 DB 에서  stories_filed에 바로 +1을 해준다. 

```python
#고친 저장하는 코드

def save(request):
  #... 요청 처리 ... 
  
  #counter + 
  counter = Count.objects.get(id=1)
  counter.count = F('count') + 1 
  counter.save()
  
  return Httpresponse(status='200')

#or queryset의 update를 사용할수도 있다. *get이 아닌 filter를 사용함에 주의주의주의
def save(request):
  #... 요청 처리 ... 
  
  #counter + 
  counter = Count.objects.filter(id=1)
  counter.update(count= F('count') + 1) 
  
  return Httpresponse(status='200')
```



## Caution:

위의 작업은 전적으로 데이터베이스에서 처리하므로, Python에서는 `counter.count`에 대해 알 수 없다.

따라서 위의 작업으로 저장된 새로운 값을 사용하려면 반드시 아래 코드처럼 다시 불러와야 한다.

```python
# Wrong case
  counter = Count.objects.get(id=1)
  print("1번 print:", counter.count)
  counter.count = F('count') + 1 
  counter.save() 
  print("2번 print:",counter.count)
  
>>> 1번 print: 10
  	2번 print: 10

# Correct case
  counter = Count.objects.get(id=1)
  print("1번 print:", counter.count)
  counter.count = F('count') + 1 
  counter.save() 
  
  couter.refresh_from_db() 
  print("2번 print:",counter.count)
  
>>> 1번 print: 10
  	2번 print: 11
      
```

