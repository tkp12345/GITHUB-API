# 1.실행방법
```
    $ npm i 
    $ npm run dev 
    
    접속 : http://localhost:3090 
```
<br/>

# 2. 버전정보
```
    react : v17
    react-router-dom : v5
    typescript : v4
    webpack: v4
    
    * 나머지정보 package.json 참조
```
<br/>

# 3. 기획 / 실행 
```
     고객은 Issue들을 모아서 보고싶어 했습니다. 이에따라 고객은 총데이터를 보고싶어하며
    각 페이지마다 데이터의 총개수가 필요하다고 느꼈습니다. 또한 검색기능이 주된기능이기 떄문에
    자동완성 검색기능을 채택했습니다
```
![ezgif com-gif-maker (11)](https://user-images.githubusercontent.com/46067837/195214900-918d5281-5861-4cc8-aa72-9ee862d40913.gif)
<br/>

# 4. 기능구현
<br/>

#### 1.검색창에 Repository명을 입력해서 Repository를 검색할 수 있다.
 자동완성 검색기능을 구현했습니다 API 요청을 최소화 하기위해 debounce를 사용하여
input onChange 의 특정 기간마다 검사를 하여 API를 요청합니다 
```

  const debounceValue = useDebounce(inputValue);

   ...
  useEffect(() => {
    if (!debounceValue) return;

    getRepositoryApi(...),
    );
  }, [debounceValue]);
```
<br/>


#### 2.검색된 Public Repository를 등록할 수 있다.
![ezgif com-gif-maker (12)](https://user-images.githubusercontent.com/46067837/195215333-12296afd-5f68-4ba8-ad10-b828892514f1.gif)
    
LocalStorage 를 다루는 작업이 많아보였습니다. LocalStorage 데이터 CRUD 를 위한 함수를
따로 만들어 재사용이 가능하도록 했습니다. 즐겨찾기는 처음클릭시 등록되고 등록이 되있을시 재클릭하면 삭제됩니다.

#### 3.등록된 Repository를 삭제할 수 있다.
 휴지통 아이콘을 누르게되면 등록된 Repository 정보가 삭제되게됩니다 

#### 4. 등록된 각각의 Public Repository의 issue를 한 페이지에서 모아서 볼 수 있다.
![ezgif com-gif-maker (13)](https://user-images.githubusercontent.com/46067837/195215477-3f89ac7e-2f5f-4a32-9add-092df5954419.gif)
Repository 마다 등록된 issue 정보를 효율적으로 요청하기위해 Promise.all 을 사용하여 비동기 병렬 요청을 하였습니다.
<br/>


# 5. 성능개선을 위한 구현사항 / 특이사항 
<br/>

#### 1. deboounce
    API 요청을 최소화하기위해 useDebounce 훅을 만들어 input onChange 이벤트를 관리하도록했습니다.

#### 2. 페이지네이션 데이터 미리 API 요청하기
![ezgif com-gif-maker (6)](https://user-images.githubusercontent.com/46067837/195115203-a2c67247-3bf1-42da-a621-2b316dee206f.gif)
    git Repository API 는 성능이 좋지 못하였습니다 많은 페이지를 가져오면 속도가 느리기때문에 첫 화면에
보여줄 데이터만 API 요청을하고, 사용자가 페이지 변경시 미리 다음번 데이터가 없는지 확인하고 미리 API요청을 하도록
구현했습니다 
```
   src/components/pagination/pagination.tsx>
   
    if (props.data && !props.data[(currentPage + 2) * itemsPerPage]) {
       ...
        props?.getApi(
          AUTH_FIRST + AUTH_SECOND + AUTH_THIRD,
          Number(props.page + 1),
          props.inputValue,
        );
    
      props.setPage(Number(props.page + 1));
    }
  };
```

#### 3. 자주바뀌지 않는데이터/렌더링 하지않을데이터  useRef()로 관리하기 
 사용자에게 검색한 Repository의 총데이터를 알려주고 싶었습니다. 처음API 요청시 Repository 총데이터를알수 있었습니다.
따라서 API 요청시마다 Repository의 총데이터 값의 상태를 변경시킬 필요가 없었고 이에따라 렌더링이 일어나지 않기 하기위해 useRef()를
사용했습니다 

#### 4. promise.all / promise.allsettled
 Repository 정보에따른 각각의 issue 들을 효과적으로 호출하기 위해 Promise.all 을 사용해 병렬 처리 하였습니다.

    

#### 5. react-refresh (과거: react-hot-loader) 
 단일 개발을 할때는 크게 상관없지만, 실제 협업 상황이라고 가정하고 코드편경시 바뀐부분만 새로 변경하기 위해 적용했습니다 

#### 6. react 환경설정 (cra (x)) 직접 : webpack,ts,loader,eslint,prettier 설정을 직접하였습니다

    
    
