---
title: "Django QuerySet 에  정렬과 필터를 다이나믹하게(정해진 갯수없이) 거는 방법"
date: "2020-02-07T01:23:45.678Z"
template: "post"
draft: false
slug: "/posts/django_dynamic_sort&filter/"
category: "Develop"
tags:
 - "django"
 - "queryset"
 - "filter"
description: "Order, Filter 프론트에서 요청하는대로 알아서  처리하게 할수 있을까요?"
---


Django QuerySet 에  정렬과 필터를 다이나믹하게(정해진 갯수없이) 거는 방법

Order, Filter 프론트에서 요청하는대로 알아서  처리하게 할수 있을까요?
네 가능합니다.

다음 과 같은 Post 모델이 있다. 

```python
class Post(models.Model):
 	title = models.CharField() #제목
	content = models.TextFiled() #내용
 	author = models.CharField() #저자
	timestamp = models.DateTimeField(default=timezone.now) #만들어진 시간
	like_count = models.IntegerField() #좋아요 눌린 횟수
  view_count = models.IntegerField() #뷰 횟수
  hate_count = models.IntegerField() #싫어요 횟수
```

### Dynamic sorting

1개의 Order를 거는 방법은 

```python
posts = Post.objects.all().order_by('view_count') #좋아요 오름차순 정렬 
posts = Post.objects.all().order_by('-view_count') #좋아요 내림차순 정렬 
```

N개의 order를 거는 방법은

```python
posts = Post.objects.all().order_by('view_count','like_count') #조회수, 좋아요 오름차순 정렬, 
```

Order 는 Chainning 이 가능하다.  위의 방법을 Chainnig으로 표현하면, 아래처럼도 작성이 가능하다.

```python
posts = Post.objects.all().order_by('view_count') #조회수 오름차순 정렬
posts = posts.order_by('like_count')#조회수 오름차순 정렬 한것중 좋아요 오름차순 정렬
```

Order 갯수가 정해져 있지 않고, 1개 또는 그 이상의  Order를 QuerySet에 거는 방법은 크게 두가지 이다. 

1. Order 를 List로 만들고  그 리스트를 통해 Order 입력
2. Order 값의 연속 Chainning

1번 방법의 정석은 아래와 같다.

```python
# request URL : url/order1=view_count,order2=like_count,order3=-hate_count....order[n]='value' 최대 n개의 Order 정렬 요청을 받는다. 

order_list = [request.GET.get(f'order{i}', '-timestamp') for i in range(n)] #받은 요청들을 리스트에 담는다. '-timestamp'를 넣지 않을 경우, 값이 없거나, 잘못되었을 경우 에러가 난다. 에러방지용. 

print(order_list)
[
'view_count', 'like_count', '-hate_count'
]

ordered_post1 = Post.objects.order_by(*order_list) #order_list에 담긴 값으로 Order를 해준다! 

ordered_post2 = Post.objects.order_by('view_count', 'like_count', '-hate_count') # ordered_post1과 ordered_post2의 정렬된 내용은 같다. 
```

좀더 편리하게 처리하자면 이렇게도 해볼수 있을 것 같다.

```python
# request URL : url/order=like_count,view_count,-hate_count 기한 없이 Order 정렬 요청을 받는다.쿼리스트링이 조금더 간결해졌다. 

order_list = request.GET.get('order', '-timestamp').split(',')
#받은 요청들을 리스트에 담는다. '-timestamp'를 넣지 않을 경우, 값이 없거나, 잘못되었을 경우 에러가 난다.

print(order_list)
[
'view_count', 'like_count', '-hate_count'
]

ordered_post1 = Post.objects.order_by(*order_list) #order_list에 담긴 값으로 Order를 해준다! 

ordered_post2 = Post.objects.order_by('view_count', 'like_count', '-hate_count') # ordered_post1과 ordered_post2의 정렬된 내용은 같다. 
```

2번 방법은 다음과 같다. 

```python
#다중 Order body로 받을시,
data = {
	"order_by":
  	[
      {"order":"", "field":"timestamp"},
      {"order": "", "field":"view_count"},
      {"order":"asc","field":"like_count"},
  		]	
		}

posts = Post.objcects.all()
if 'order_by' in data:                #정렬값이 request에 있다면, 
	for order in data['order_by']:      #그 값들을 찾아서
		field = order['field']						#연속 channing으로 Order를 건다. 
		asc = '-' if not order['asc'] else ""
		posts = posts.order_by(f"{asc}{field}")
```



### 필터의 동적 적용! 

위와 비슷하지만 살짝 다른 방법으로 filter도 동적으로 걸 수 있다. 필터는 List 가 아닌 Dict를 활용한다.

```python
# request URL : url/title=wecode최고,content__contain=developer,author=바름  

#Dict로 받기 때문에 사전에 정해진 필터값들만 받을 수 있다. 

filter_dic = {}

data = request.GET
try: 
  if data.get('title',False):
    filter_dic['title'] = data.get('title') 
  if data.get('content__contain',False):
    filter_dic['content__contain'] = data.get('content__contain')
  if data.get('author',False):
    filter_dic['author'] = data.get('author')

except ValueError, SyntaxError:
  return HttpResponse(status=400)
    
#각각의 필터마다 받는 값이 정해져 있기 때문에 이에 대해서는 미리 validation 처리를 해놓아야 한다. e.g id에 str인 경우.

print(filter_dic)
{
   'title':'wecode'최고,'content__contain':'developer','author':'바름'
}

filtereded_post1 = Post.objects.order_by(**filter_dic) #filter_dic에 담긴 값으로 filter를 해준다! 

filtered_post2 = Post.objects.order_by(title='wecode최고',content__contain='developer',author='바름'  
) # ordered_post1과 ordered_post2의 filter된 내용은 같다. 
```

위의 방법은 손이 가는 부분이 많다.  post를 통해 request body로 받으면 더 쉬워진다.

```python
# request URL : url/

data = {
  filter_data:
  	{
    'title':'wecode'최고,'content__contain':'developer','author':'바름'
  	}
	}

if data['filter_data']: 
  try:
  	posts = Post.objects.filter[**filter_data]

  except ValueError, SyntaxError... :
  	return HttpResponse(status=400)

print(filter_dic)
{
   'title':'wecode'최고,'content__contain'=developer',''author'='바름'
}

filtereded_post1 = Post.objects.order_by(**filter_dic) #filter_dic에 담긴 값으로 filter를 해준다! 

filtered_post2 = Post.objects.order_by(title='wecode최고',content__contain='developer',author='바름'  
) # ordered_post1과 ordered_post2의 filter된 내용은 같다. 
```

filter 도 Chainning은  가능하나  Sorting처럼  다이나믹하게 활용하기 어렵다. 키워드가 정해져 있기 때문에 filter 키워드를 동적으로 처리하지 못한다.  

```python
posts.objects.filter(search=value)

#Search는 Post에 없는 Field다. Post가 가지고 있는 filed가 아니면 정의부터 error를 터뜨린다. 

```
