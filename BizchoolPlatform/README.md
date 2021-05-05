### MySQL을 포함한 프로젝트 실행방법
```
express -ejs board
cd board(target project folder)
npm install mysql # mysql 모듈 추가 설치
npm install # package.json를 업데이트하여 사용하는 경우
```

- 주요기능
  - 게시판 만들기 board - 글쓰기(insert), 글번호(paging), 읽기(select), 수정(update), 삭제(delete)

- SQL 쿼리 
```
create table board (
no int not null auto_increment,
pw varchar(12),
name varchar(10) not null,
title varchar(50) not null,
content varchar(5000) not null,
regdate datetime not null,
hit int not null,
good int not null,
primary key (no)
)
```


**참고**
- http://jungjim.tistory.com/54
