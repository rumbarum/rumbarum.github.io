---
title: " Sqlalchemy + Asyncpg Raw SQL"
date: "2022-11-02T01:23:45.678Z"
template: "post"
draft: false
slug: "/posts/asyncpg-paramterized-sql-with-sql-alchemy/"
category: "develop"
tags:
 - "asyncpg"
 - "sql"
 - "async"
description: "현상보다 전제를 의심하는편이 디버깅에 좋을 지도 "
---
<h2 style="color:rgb(9, 136, 104)"> </h2>

### 상황

- 팀 내에서 웹 프레임워크 기존 `Flask` =>  `FastAPI`로 이전
- 기존 기능들 동작하게 `FastAPI` 세팅
- DB driver psycopg2 -> asyncpg 로 변경

### 문제

-  `f-string` 으로 되어있는 SQL문 Parameterized로 변환 (SQL Injection 방지) -> sqlalchemy.AsyncEngine 계속 에러남

### Python에서 SQL에 변수 넣기

- Python DB API 상 Parameterized 변수들은 `%s`  or `%(named_parameter)s` or `:named_parameter` 를 사용
- Asyncpg (github star over 5,000...) 은 `$1, $2, ...` 로만 변수 받음, named_parameter 안받음.
    - [asyncpg maintainer의 답변](https://github.com/MagicStack/asyncpg/issues/605#issuecomment-683192217)

#### AsyncEngine과, Async Connection에 Query들 집어넣어봄

- `Sqlalchemy` 의 `AsyncEngine`으로  `query`에 변수 집어 넣으려고 하는데...

- ```python
    sql = "SELECT ... FROM TableA WHERE ID = :named_parameter"
    param = {"named_parameter":"value"}
    
    with async_engine_.connect() as con:
      data = await con.execute(query, param)
    ```

    - -> asyncpg not support named parameter

- ```python
    sql = "SELECT ... FROM TableA WHERE ID = $1 AND LIMIT $2"
    param = [val1, val2]
    
    with async_engine_.connect() as con:
      data = await con.execute(query, param)
    ```

    - -> sqlalchemy.exc.ArgumentError: List argument must consist only of tuples or dictionaries

- ```python
    sql = "SELECT ... FROM TableA WHERE ID = $1 AND LIMIT $2 "
    param = [(val1,)(val2,)]
    
    with async_engine_.connect() as con:
      data = await con.execute(query, param)
    ```
    
    - ```
        sqlalchemy.exc.DBAPIError: (sqlalchemy.dialects.postgresql.asyncpg.Error) <class 'asyncpg.exceptions.InvalidDatetimeFormatError'>: invalid input syntax for type timestamp with time zone: "$1"
        [SQL: 
            SELECT ... FROM TableA WHERE ID = $1 AND LIMIT $2
            ]
        (Background on this error at: https://sqlalche.me/e/14/dbapi)
        ```
    
- ```python
    sql = "SELECT ... FROM TableA WHERE ID = $1 AND LIMIT $2 "
    param = [(val1,val2,)]
    
    with async_engine_.connect() as con:
      data = await con.execute(query, param)
    ```
    
    - ```
        sqlalchemy.exc.DBAPIError: (sqlalchemy.dialects.postgresql.asyncpg.Error) <class 'asyncpg.exceptions.InvalidDatetimeFormatError'>: invalid input syntax for type timestamp with time zone: "$1"
        [SQL: 
        	SELECT ... FROM TableA WHERE ID = $1 AND LIMIT $2
            ]
        [parameters: ((), ())]
    
- ```python
    sql = "SELECT ... FROM TableA WHERE ID = $1 AND LIMIT $2 "
    param = {
      "$1": val1,
      "$2": val2
    }
    
    with async_engine_.connect() as con:
      data = await con.execute(query, param)
    ```
    
    - ```
        sqlalchemy.exc.DBAPIError: (sqlalchemy.dialects.postgresql.asyncpg.Error) <class 'asyncpg.exceptions.InvalidDatetimeFormatError'>: invalid input syntax for type ...
        [SQL: 
        	SELECT ... FROM TableA WHERE ID = $1 AND LIMIT $2
         ]
    
- ```python
    from sqlalchemy.orm import text
    
    sql = "SELECT ... FROM TableA WHERE ID = :val1 AND LIMIT :val2 "
    param = {
      "val1": val1,
      "val2": val2
    }
    
    with async_engine_.connect() as con:
      data = await con.execute(text(sql).bindparams(param))
    ```
    
    - ```
        sqlalchemy.exc.ProgrammingError: (sqlalchemy.dialects.postgresql.asyncpg.ProgrammingError) <class 'asyncpg.exceptions.UndefinedTableError'>: relation "log_data.$1" does not exist
        [SQL: 
        SELECT ... FROM TableA WHERE ID = :%s AND LIMIT %s 
            ]
        [parameters: ('val1', 'val2']
        (Background on this error at: https://sqlalche.me/e/14/f405)
    
- ```python
    from sqlalchemy.orm import text
    
    sql = "SELECT ... FROM TableA WHERE ID = :val1 AND LIMIT :val2 "
    param = [val1, val2]
    
    with async_engine_.connect() as con:
      data = await con.execute(text(sql).bindparams(param))
    ```
    
    - ```
        AttributeError: 'list' object has no attribute '_orig_key'
        ```

### 알게된 것 

- sqlalchemy에서 asyncpg 불러서 excute with param으로 처리할때 param이 적용이 안된다. 
- 그 이유는 
    - asyncpg.connection()  execute param 처리가 파이썬 다른 driver 들과 다르다!!
        - execute param type != sequential
        - *param으로 처리함 (positional arg로 처리함)
- 그래서
    - asyncpg connection pool 소환함

- ```python
    from typing import Any, Optional
    from core.config import config
    import asyncpg
    
    SIZE_POOL_MAX = 10
    SIZE_POOL_MIN = 10
    
    
    class AsyncpgPool:
        """
        Async DB driver Class
        """
    
        asyncpg_pool: Optional[asyncpg.Pool] = None
    
        @classmethod
        async def get_asyncpg_pool(cls) -> asyncpg.Pool:
            if cls.asyncpg_pool is None:
                cls.asyncpg_pool = await asyncpg.create_pool(
                    config.ASYNCPG_DB_URL, min_size=SIZE_POOL_MIN, max_size=SIZE_POOL_MAX
                )
            return cls.asyncpg_pool
    
        @classmethod
        async def close_asyncpg_pool(cls) -> None:
            if cls.asyncpg_pool:
                await cls.asyncpg_pool.close()
                cls.asyncpg_pool = None
    
        @classmethod
        async def select(cls, query: str, param: list = None) -> Any:
            pool = await cls.get_asyncpg_pool()
            async with pool.acquire() as con:
                if param is not None and param:
                    data = await con.fetch(query, *param)
                else:
                    data = await con.fetch(query)
            return [dict(row) for row in data]
    
        @classmethod
        async def execute(cls, query: str, param: list) -> Any:
            pool = await cls.get_asyncpg_pool()
            async with pool.acquire() as con:
                async with con.transaction():
                    result = await con.execute(query, param)
            return result
    
        @staticmethod
        async def on_start_up() -> None:
            await AsyncpgPool.get_asyncpg_pool()
    
        @staticmethod
        async def on_shutdown() -> None:
            await AsyncpgPool.close_asyncpg_pool()
            
    
    from fastapi import FastAPI
            
    app = FastAPI(
      on_start = [AsyncpgPool.on_start_up],
      on_shutdown = [AsyncpgPool.on_shutdown]
    )
      
    
    @app.get("/query")
    def get_query():
      table_name = "some_table"
      limit = 1
      query = f"SELECT * FROM log_data.{table_name} limit $1"    
      data = await AsyncpgPool.select(query, [limit])
      return {"data": data}

