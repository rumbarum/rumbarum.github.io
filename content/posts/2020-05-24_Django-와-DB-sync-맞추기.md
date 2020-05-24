---
title: " Django 와 DB sync 맞추기"
date: "2020-05-24T01:23:45.678Z"
template: "post"
draft: false
slug: "/posts/django_migration_trouble/"
category: "develop"
tags:
 - "django"
 - "migration"
 - "wecode"
description: "Django Migration 맞춰주기 "
---
아래 내용은 [초보몽키님 블로그 Migration 설명에서 인용 ](https://wayhome25.github.io/django/2017/03/20/django-ep6-migrations/)

> ## migrations
>
> - 모델 변경내역 히스토리 관리
>
> - 모델의 변경내역을 DB Schema (데이터베이스 데이터 구조)로 반영시키는 효율적인 방법을 제공
>
> - migration 옵션을 끌수도 있다.
>
>   ```shell
>   # 마이그레이션 파일 생성
>   $ python manage.py makemigrations <app-name>
>   
>   # 마이그레이션 적용
>   $ python manage.py migrate <app-name>
>   
>   # 마이그레이션 적용 현황
>   $ python manage.py showmigrations <app-name>
>   
>   # 지정 마이그레이션의 SQL 내역
>    $python manage.py sqlmigrate <app-name> <migration-name>
>   ```
>
>   Tip
>
> - makemigrations 이후에는 migration 폴더를 확인하는 습관을 갖는게 좋다. DB는 중요하기 때문에 무엇이 수정되었는지 다시 한번 확인하는 습관.
> - makemigrations [app-name] 처럼 app 이름을 명시하는 것이 좋다. (예상치 못한 migration을 방지)
> - showmigrations 를 통해서 적용 상태를 조회할 수 있다. [x] : 적용 후 []: 적용 전
> - 실제 DB에는 sql 쿼리로 명령이 전달이 된다. migration 파일은 쿼리는 아니다. 따라서 `sqlmigrate` 명령을 통해 sql로도 확인하는 습관이 필요하다.
> - 이미 적용한 migration 파일은 절대로 지우면 안된다.
> - 프로젝트/앱 생성 후 처음 migrate 할 때는 app 이름을 명시하지 않는다. 이는 장고 기본 앱에, 여러 앱에 걸쳐서 적용할 migrate가 있기 때문이다.
> - no such table, column 등의 오류는 migration 관련 문제이다.
>
> 
>
> ### 특정 파일지정을 통한 migrate
>
> ```
> $ python manage.py migrate <app-name> <마이그레이션 파일명>
> ```
>
> - 지정한 마이그레이션 파일이 현재 적용된 마이그레이션 파일 보다
>   - 이후라면, `Forward 마이그레이션` 을 순차적으로 진행
>   - 이전이라면, `Backward 마이그레이션` 을 순차적으로 진행 (`롤백`)
>
> 
>
> ## 마이그레이션 파일명 지정
>
> - 전체 파일명을 지정하지 않더라도, 판독이 가능하다면 파일명 일부로도 지정이 가능하다.
>
> - 롤백 후에 돌아오면 `테이블의 데이터 레코드가 사라진다`. 장고 모델의 migration은 스키마의 형상관리로, 데이터 백업을 지원하지 않는다. 따라서 `주기적인 백업`이 필요하다.
>
> - ```shell
>   # 파일명 예시
>   blog/migrations/0001_initial.py
>   blog/migrations/0002_create_field.py
>   blog/migrations/0002_update_field.py
>   
>   $python manage.py migrate blog 0001 # OK
>   $python manage.py migrate blog 0002 # FAIL (다수 파일 해당)
>   ```

Django 는 DB에 관한 내용을 models.py로 추상화하여 관리한다. 그래서 사용자는 SQL 문을 신경쓰지 않고, Django ORM을 사용하여 DB 자료를 손쉽게 관리 할 수있다. 따라서 DB에 변화가 생기는 경우, Django에서 해당 내용을 인지하도록 sync를 맞춰줘야만 한다. (models.py 를 수정하고, makemigration, migrate를 해야한다.)

이에 관련해서 빈번하게 생기는 오류는 2가지를 들 수 있다. 

| Case | DB                    | Django                |
| ---- | --------------------- | --------------------- |
| 1    | Change                | No change             |
| 2    | Change on 1,2,3 table | Change on 4,5,6 tabel |



## 1. DB를 선 변경

DB에서 칼럼을 하나 추가하고 Django migration을 내버려 두었다. Django 에러 뜨는거 보고 `models.py`를 수정 하고 migrate까지 했는데 여기서 에러가 난다. 이미 있는 칼럼이라서 추가할수 없다. 

이럴 때는 makemigration을 한뒤에 migrate를 했다고 장고가 인식하게 하면 된다. 

```
$python manage.py showmigration 
#생성된 migration 이름 확인
$python manage.py --fake migrate <app_name> <migrate_name>
```

를 입력하면 makemigration를 통해 생성된 migration을 DB 에 적용 한걸로 Django에서 인식한다. 

## 2. DB와 Django가 서로 다른 변경내역이 있을 경우

​	1. 디펜던시가 복잡하지 않다면,  DB 내역을 위의 방법으로 Django에 반영하고, Django 변경내역은 migration 과정을 통해 일치 시키면 된다.

2. 디펜던시가 복잡하고 처리가 어렵다면, DB 초기화후 재 생성 하는 방법도 있다. (데이터가 중요하지 않은 경우, 데이터 베이스를 그대로 사용하고 싶으면, DB schema에 models.py를 맞추면 된다. )

   [Django DB 초기화 하기](https://yuda.dev/216)





