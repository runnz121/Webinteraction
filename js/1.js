
//화살표 함수 뜻
//1.  function () {}      이거는   () => {}     ==익명함수 생성 == 함수를 생성하고
//2. (function () {}) ()  이거는  (() => {}) ()   ==익명함수 호출 == 호출하기위해 괄호로 감싸고 ()붙여준다


(() => { //이렇게 쓰는 이유는 전역 변수를 피하게 하기 위해서(지역변수가 좋음)


    let yOffset =0; // window.pageYOffset 대신 쓸 변수 (전역변수) //현재 스크롤 위치( 현재 스크린으로 보여지는 곳)
    let prevScrollHeight = 0; //현재 스크롤 위치 (yOffset)보다 이전에 위치한 스크롤 섹션들의 높이의 합
    let currentScene = 0; //현재 활성화된(= 스크린으로 보고 있는 scene //scroll-Section)

    const sceneInfo = [  //장면을 4개로 나눠 해당 장면을 배열로 저장하기 위해 생성

        { //1번째 객체      
            type: 'sticky',      //sticky-elem 은 sticky 아니면 normal로 타입 정함
            heightNum: 5,        //브라우저 높이의 5배로 scrollHeight 새팅
            scrollHeight : 0,    //각 구간의 스크롤 높이의 정보를 저장하기위한 변수
            objs: {              //HTML 객체를 모아놓는 객체를 만듬 각 section의 ID를 저장
                container: document.querySelector('#scroll-section-0')
            }
        },


        { //2번째 객체
            type: 'sticky',
            heightNum: 5,        
            scrollHeight : 0,    
            objs: {              
                container: document.querySelector('#scroll-section-1')
            }

        },


        { //3번째 객체
            type: 'normal',
            heightNum: 5,        
            scrollHeight : 0,   
            objs: {              
                container: document.querySelector('#scroll-section-2')
            } 

        },


        { //4번째 객체
            type: 'sticky',
            heightNum: 5,        
            scrollHeight : 0,
            objs: {            
                container: document.querySelector('#scroll-section-3')
            }    

        },
    ];



    

    function setLayout() { //각 스크롤 섹션의 높이셋팅하는 함수
        for(let i=0; i< sceneInfo.length; i++) {
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight; //윈도우 창 비례해서 적용시키기 위해
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`; //${}내부에는 변수를 쓸 수 있다. Contanier 에 각각 scrollheight를 적용
        }   //왼쪽에 오른쪽 값을 넣어준다.
   }






    
    function scrollLoop() { //스크롤이 얼만큼 되었는지 판별하는 함수  
        
        prevScrollHeight = 0; //초기화 시켜주기위한 값

        for(let i = 0; i < currentScene; i++) { //현재 스크린에 나타나는 신이 i값으로 와야함
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }     

        if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight){
            currentScene++;
        } //스크롤을 아래로 내릴때 현재 scene 1 ->2 로 넘어가는 시점이라고 가정하면
          //스크롤 위치(yOffset) 값이 전의 신의 스크롤값(0 + 1) 과 현재 스크롤 위치값(yOffset 스크롤 위치 - scene1의 마지막 부분) 보다 
          //커지는 경우 scene의 순번이 바뀐다는 것을 if로 표현

          
        if(yOffset < prevScrollHeight) {
            if(currentScene === 0) return; //currentScene 0번째 scene이라면 그냥 종료(브라우저가 바운스 효과로 인해 마이너스 값이 나올 수 있음을 방지)
            currentScene--;
        } //스크롤을 위로 올릴때 scene 2->1로 페이지가 올라가는 시점이라고 가정하면
          //yOffset이 prevScrollHeight + 와 current Scene 값 보다 작아지면 scene 번호가 바뀐다는 것을 표현

          console.log(currentScene);
    }
   


    window.addEventListener('resize',setLayout); //윈도우 창이 변할때 setLayout 함수 실행
    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset; //yoffset을 갱신해줌 편의상 변수로 만듬
        scrollLoop();
    });


    setLayout();



}) ();