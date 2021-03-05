
//화살표 함수 뜻
//1.  function () {}      이거는   () => {}     ==익명함수 생성 == 함수를 생성하고
//2. (function () {}) ()  이거는  (() => {}) ()   ==익명함수 호출 == 호출하기위해 괄호로 감싸고 ()붙여준다


(() => { //이렇게 쓰는 이유는 전역 변수를 피하게 하기 위해서(지역변수가 좋음)


    let yOffset =0; // window.pageYOffset 대신 쓸 변수 (전역변수) //현재 스크롤 위치( 현재 스크린으로 보여지는 곳)
    let prevScrollHeight = 0; //현재 스크롤 위치 (yOffset)보다 이전에 위치한 스크롤 섹션들의 높이의 합
    let currentScene = 0; //현재 활성화된(= 스크린으로 보고 있는 scene //scroll-Section)
    let enterNewScene = false;//새로운 scene이 시작되는 순간 true로 변환
    const sceneInfo = [
      //장면을 4개로 나눠 해당 장면을 배열로 저장하기 위해 생성

      {
        //0번째 객체
        type: "sticky", //sticky-elem 은 sticky 아니면 normal로 타입 정함
        heightNum: 5, //브라우저 높이의 5배로 scrollHeight 새팅
        scrollHeight: 0, //각 구간의 스크롤 높이의 정보를 저장하기위한 변수
        objs: {
          //HTML 객체를 모아놓는 객체를 만듬 각 section의 ID를 저장
          container: document.querySelector("#scroll-section-0"),
          messageA: document.querySelector("#scroll-section-0 .main-message.a"),
          messageB: document.querySelector("#scroll-section-0 .main-message.b"),
          messageC: document.querySelector("#scroll-section-0 .main-message.c"),
          messageD: document.querySelector("#scroll-section-0 .main-message.d"),
          canvas: document.querySelector("#video-canvas-0"), //canvas 이용하기 위한 id값 가져오기
          context: document.querySelector("#video-canvas-0").getContext("2d"), //canvas context 객체 정의
          videoImages: [], //이미지를 넣을 배열
        },

        //첫번째가 초기값, 2번재부터 목적 값 ==> 이미지 순서설정
        values: {
          //message에 어떤값을 줄지 전달
          /*messageA_opacity_in: [0, 1, {start:0.1, end:0.2}], //messageA 투명도 조절 투명도가 0 ->1로 변경
                messageA_translateY_in: [20, 0,{start:0.1, end:0.2}], 
                //messageB_opacity_in: [0, 1, {start:0.3, end:0.4}], //start end는 애니메이션이 재생되는 구간을 비율로 설정
                messageA_opacity_out: [1, 0, {start:0.25, end:0.3}],
                //글씨가 살짝 아래있다가 위로 살짝 올라오는것을 표현             
                messageA_translateY_out: [0,-20, {start:0.25, end:0.3}] */

          //하위 내용들은 편의를 위해 복붙한것
          videoImageCount: 300, //이미지갯수
          imageSequence: [0, 299], //이미지순서
          canvas_opacity: [1, 0, { start: 0.9, end: 1 }], //이미지 서서히 사라지게 하기위함

          messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
          messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
          messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
          messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
          messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
          messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
          messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
          messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
          messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
          messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
          messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
          messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
          messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
          messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
          messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
          messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
        },
      },

      {
        //1번째 객체
        type: "normal", //sticky는 고정되어있으면서 반응이 있는 것들을 처리
        //heightNum: 5,  : 원래는 scrollheight 결정할떄 innerheight의 몇배로 할건지 정해주는 거였는데 어차피
        //이 section은 default높이로 쓸거라서 필요 없음
        scrollHeight: 0,
        objs: {
          container: document.querySelector("#scroll-section-1"),
        },
      },

      {
        //2번째 객체
        type: "sticky", //일반 스크롤로 흘러가는 구간을 처리함
        heightNum: 5,
        scrollHeight: 0,
        objs: {
          container: document.querySelector("#scroll-section-2"),
          messageA: document.querySelector("#scroll-section-2 .a"),
          messageB: document.querySelector("#scroll-section-2 .b"),
          messageC: document.querySelector("#scroll-section-2 .c"),
          pinB: document.querySelector("#scroll-section-2 .b .pin"),
          pinC: document.querySelector("#scroll-section-2 .c .pin"),
          canvas: document.querySelector("#video-canvas-1"), //canvas 이용하기 위한 id값 가져오기
          context: document.querySelector("#video-canvas-1").getContext("2d"), //canvas context 객체 정의
          videoImages: [], //이미지를 넣을 배열
        },
        values: {
          videoImageCount: 960, //이미지갯수
          imageSequence: [0, 959], //이미지순서
          canvas_opacity_in: [0, 1, { start: 0, end: 0.1 }], //이미지 서서히 사라지게 하기위함
          canvas_opacity_out: [1, 0, { start: 0.95, end: 1 }], //이미지 서서히 사라지게 하기위함

          messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
          messageB_translateY_in: [30, 0, { start: 0.6, end: 0.65 }],
          messageC_translateY_in: [30, 0, { start: 0.87, end: 0.92 }],
          messageA_opacity_in: [0, 1, { start: 0.25, end: 0.3 }],
          messageB_opacity_in: [0, 1, { start: 0.6, end: 0.65 }],
          messageC_opacity_in: [0, 1, { start: 0.87, end: 0.92 }],
          messageA_translateY_out: [0, -20, { start: 0.4, end: 0.45 }],
          messageB_translateY_out: [0, -20, { start: 0.68, end: 0.73 }],
          messageC_translateY_out: [0, -20, { start: 0.95, end: 1 }],
          messageA_opacity_out: [1, 0, { start: 0.4, end: 0.45 }],
          messageB_opacity_out: [1, 0, { start: 0.68, end: 0.73 }],
          messageC_opacity_out: [1, 0, { start: 0.95, end: 1 }],
          pinB_scaleY: [0.5, 1, { start: 0.6, end: 0.65 }],
          pinC_scaleY: [0.5, 1, { start: 0.87, end: 0.92 }],
        },
      },

      {
        // 3
        type: "sticky",
        heightNum: 5,
        scrollHeight: 0,
        objs: {
          container: document.querySelector("#scroll-section-3"),
          canvasCaption: document.querySelector(".canvas-caption"),
          canvas: document.querySelector(".image-blend-canvas"),
          context: document
            .querySelector(".image-blend-canvas")
            .getContext("2d"),
          imagesPath: ["./blend-image-1.jpg", "./blend-image-2.jpg"],
          images: [], //이미지 객체를 여기에 push
        },
        values: {
          rect1X: [0, 0, { start: 0, end: 0 }],
          rect2X: [0, 0, { start: 0, end: 0 }],
          imageBlendY: [0, 0, { start: 0, end: 0 }],
          rectStartY: 0 //시작 기준점
        }
      }
    ];

    function setCanvasImages() {    //canvas에 그려서 처리할 이미지 함수
        let imgElem;
        for(let i=0; i<sceneInfo[0].values.videoImageCount; i++) {
            imgElem = new Image(); // = imgElem = new Image(); 둘다 같은 방법 : 이미지 객체 생성
            imgElem.src = `./001/IMG_${6726 + i}.JPG` //imgElem의 주소 설정 및 img 반복 설정
            sceneInfo[0].objs.videoImages.push(imgElem); //배열에 해당 img를 push
        }

        //3번째 섹션의 그림 설정
        let imgElem2;
        for(let i=0; i<sceneInfo[2].values.videoImageCount; i++) {
            imgElem2 = new Image(); // = imgElem = new Image(); 둘다 같은 방법 : 이미지 객체 생성
            imgElem2.src = `./002/IMG_${7027 + i}.JPG` //imgElem의 주소 설정 및 img 반복 설정
            sceneInfo[2].objs.videoImages.push(imgElem2); //배열에 해당 img를 push
        }

        let imgElem3;
        for (let i = 0; i < sceneInfo[3].objs.imagesPath.length; i++) {
          imgElem3 = new Image(); // = imgElem = new Image(); 둘다 같은 방법 : 이미지 객체 생성
          imgElem3.src = sceneInfo[3].objs.imagesPath[i];
          sceneInfo[3].objs.images.push(imgElem3); //배열
         
        }
        
    }
    setCanvasImages();



    

    function setLayout() { //각 스크롤 섹션의 높이셋팅하는 함수
        for(let i=0; i< sceneInfo.length; i++) {
            if(sceneInfo[i].type ==='sticky'){
               sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight; //윈도우 창 비례해서 적용시키기 위해
                
            } else if (sceneInfo[i].type ==='normal') {
                sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
            }
            sceneInfo[i].objs.container.style.height =`${sceneInfo[i].scrollHeight}px`; //${}내부에는 변수를 쓸 수 있다. Contanier 에 각각 scrollheight를 적용
            
        }   //왼쪽에 오른쪽 값을 넣어준다.

        yOffset = window.pageYOffset;

        let totalScrollHeight = 0;
        for (let i = 0; i<sceneInfo.length; i++) {
            totalScrollHeight += sceneInfo[i].scrollHeight; //각 scene의 scrollheignht를 더해서 넣어주고있다.
            if(totalScrollHeight >= yOffset) {//totalscrollheight값과 현재 scroll위치를 비교해서 현재 스크롤 위치보다 토탈이 커지면
                currentScene = i; //현재 i를 currentscene로 세팅하고 for문을 멈춘다
                break;//현재 scene에서 새로고침해도 그 scene 이 표시된다.

            }
        }
        document.body.setAttribute(`id`,`show-scene-${currentScene}`);

        //canvas의 크기 조절
        const heightRatio = window.innerHeight / 1080; //원래 캔버스 높이대비 윈도우 창 높이

        //translate3d의 속성을 이용해 왼쪽, 오른쪽 -50%땡겨온다 (css 에선 50%씩 늘려놨었음 .sticky-elem-canvas canvas 참고)
        sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`; //첫번째 섹션 그림
        sceneInfo[2].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`; //세번째 섹션 그림
   }


   


                            //currentYOffset 현재 scene에서 얼마만큼 scroll 되었는지 현상태
   function calcValues(values, currentYOffset) { //위의 message opacity값 계산하는 함수 ,변수로 opacity 값, 현재 스크롤된 값 넣는다
        let rv;
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight; //스크롤된 비율 구하기 //현재씬(스크롤섹션/전체 스크롤 섹션)
        
        if (values.length ===3) {
            //start ~ end 사이에 애니메이션 실행
             //values는 애니메이션 start end 가 담겨있는 객체
            const partScrollStart = values[2].start * scrollHeight; //애니메이션이 시작하는 지점
            const partScrollEnd = values[2].end * scrollHeight; //애니메이션이 끝나니는 지점
            const partScrollHeight = partScrollEnd - partScrollStart; //애니메이션 끝나는 부분 - 시작지점


        if(currentYOffset >= partScrollStart && currentYOffset<= partScrollEnd) {
             rv = (currentYOffset - partScrollStart)/partScrollHeight * (values[1]-values[0]) + values[0];

        } else if (currentYOffset < partScrollStart) {
            rv = values[0];
        } else if (currentYOffset > partScrollEnd) {
            rv = values[1];
        }

    }else{
             rv = scrollRatio * (values[1]-values[0]) + values[0]; //초기값을 더해준다. 그래야 전체 값 됨

        }

        return rv;


   }


   function playAnimaation() {//애니메이션 조절 함수
       const objs = sceneInfo[currentScene].objs; //위의 objs 와 values를 변수로 받음
       const values = sceneInfo[currentScene].values;
       const currentYOffset = yOffset - prevScrollHeight; //현재 스크롤 위치  - 이전 스크롤 위치 = 해당 신 시작 부터 스크롤된 위치
       const scrollHeight = sceneInfo[currentScene].scrollHeight;
       const scrollRatio = currentYOffset/scrollHeight///전체문서에서의 현재스크롤 값/현재 scene의 scrollHeight 
       
       
       switch(currentScene) { //조건문으로 해당 scene만 play시킴 분기 나눔
      case 0:
            // console.log('0 play');
            let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));//이미지 인덱스를 위한 계산 처리
            objs.context.drawImage(objs.videoImages[sequence], 0, 0);//canvas의 drawimage를 통해 vidoImages배열에 넣은 이미지를 위에서 계산한
            //sequence를 통해 인덱스로 사용하여 그림, 0,0은 x,y 축 초기화
            objs.canvas.style.opacity = calcValues(values.canvas_opacity, currentYOffset);
            //opacity설정해서 스크롤 내릴때 이미지 서서히 사라지게끔 설정
            

            if (scrollRatio <= 0.22) { //translate3d는 (x,y,z) 값이 들어감 또한 하드웨어 가속이 보장됨으로 성능향상이
                // in
                objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
            } else {
                // out
                objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
            }

            if (scrollRatio <= 0.42) {
                // in
                objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
                objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
            } else {
                // out
                objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
                objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
            }

            if (scrollRatio <= 0.62) {
                // in
                objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
                objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
            } else {
                // out
                objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
                objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
            }

            if (scrollRatio <= 0.82) {
                // in
                objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
                objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
            } else {
                // out
                objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
                objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`;
            }

            break;
        //case1 은 normal type이라 필요없음

        case 2:
            // console.log('2 play');
            let sequence2 = Math.round(calcValues(values.imageSequence, currentYOffset));//이미지 인덱스를 위한 계산 처리
            objs.context.drawImage(objs.videoImages[sequence2], 0, 0);//canvas의 drawimage를 통해 vidoImages배열




            if(scrollRatio <= 0.5) {
                //in
                objs.canvas.style.opacity = calcValues(values.canvas_opacity_in, currentYOffset);
            } else {
                //out
                objs.canvas.style.opacity = calcValues(values.canvas_opacity_out, currentYOffset);
            }


            if (scrollRatio <= 0.32) {
                // in
                objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
            } else {
                // out
                objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
            }

            if (scrollRatio <= 0.67) {
                // in
                objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
                objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
                objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
            } else {
                // out
                objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
                objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
                objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
            }

            if (scrollRatio <= 0.93) {
                // in
                objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
                objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
                objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
            } else {
                // out
                objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
                objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
                objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
            }

            //currentScene 3에서 쓰는 캔버스를 미리 그려주기 시작   
            if (scrollRatio > 0.9) { //0.9 이상부터라고 if문 안에다가 붙여넣으면 변수 충돌 안남 
              const objs = sceneInfo[3].objs; //지역변수로 지정
              const values = sceneInfo[3].values; //지역변수로 지정
              const widthRatio = window.innerWidth / objs.canvas.width; //윈도우/캔버스
              const heightRatio = window.innerHeight / objs.canvas.height;
              let canvasScaleRatio;

              //크기조절을 다르게 설정
              if (widthRatio <= heightRatio) {
                //캔버스보다 브라우저창이 홀쭉한 경우
                canvasScaleRatio = heightRatio;
              } else {
                //캔버스보다 브라우저창이 납작한 경우
                canvasScaleRatio = widthRatio;
              }

              objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
              objs.context.fillStyle = "white"; //  fillStyle박스 색깔 바꿈
              objs.context.drawImage(objs.images[0], 0, 0);

              //캔버스 사이즈에 맞춰 가정한 innerwidth와  innerheight
              const recalculatedInnerWidth =
                document.body.offsetWidth / canvasScaleRatio; //스크롤바 제외한 값을 구하기 위해 window.innerwidth대신 씀
              const recalculatedInnerHeight =
                window.innerHeight / canvasScaleRatio;

              const whiteRectWidth = recalculatedInnerWidth * 0.15; //15%기준으로 박스 생성
              values.rect1X[0] =
                (objs.canvas.width - recalculatedInnerWidth) / 2; //전체에서 빼서 반으로 나눔 = 한쪽 15%박스를 선택하는것
              values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
              values.rect2X[0] =
                values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
              values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

              // 좌우 흰색 박스 그리기
              objs.context.fillRect(
                parseInt(values.rect1X[0]),
                0,
                parseInt(whiteRectWidth),
                objs.canvas.height
              );
              objs.context.fillRect(
                parseInt(values.rect2X[0]),
                0,
                parseInt(whiteRectWidth),
                objs.canvas.height
              );
            }


                 break;

            case 3:
               
                let step = 0; //단계를 나눠서 처리하기 위한 초긱밧

                //가로세로 모두 꽉차게 하기 위해 여기서 세팅
                const widthRatio = window.innerWidth / objs.canvas.width; //윈도우/캔버스
                const heightRatio = window.innerHeight / objs.canvas.height;
                let canvasScaleRatio;

                //크기조절을 다르게 설정 
                if(widthRatio <= heightRatio){
                    //캔버스보다 브라우저창이 홀쭉한 경우 
                    canvasScaleRatio = heightRatio;
                } else {
                  //캔버스보다 브라우저창이 납작한 경우
                  canvasScaleRatio = widthRatio;
                }

                objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
                objs.context.fillStyle = 'white'; //  fillStyle박스 색깔 바꿈
                objs.context.drawImage(objs.images[0], 0, 0);

                //캔버스 사이즈에 맞춰 가정한 innerwidth와  innerheight
                const recalculatedInnerWidth = document.body.offsetWidth / canvasScaleRatio; //스크롤바 제외한 값을 구하기 위해 window.innerwidth대신 씀
                const recalculatedInnerHeight= window.innerHeight/ canvasScaleRatio;

                //에니메이션 시작 부분
                if (!values.rectStartY) {
                  //이 매서드는 DOM의 정보를 불러온다, 한번 셋팅되면 다시 실행 안됨
                //   values.rectStartY = objs.canvas.getBoundingClientRect().top; //스크롤 순간에 잡아냄으로 속도에 따라서 값이 변함
                  values.rectStartY = objs.canvas.offsetTop //고정된값이기 때문에 스크롤 속도에 상관없이 값이 고정
                  + (objs.canvas.height - objs.canvas.height * canvasScaleRatio)/2;
                  values.rect1X[2].start = (window.innerHeight / 2) / scrollHeight; //창사이즈 절반 높이부터 시작(왼쪽박스)
                  values.rect2X[2].start = (window.innerHeight / 2) / scrollHeight; //창사이즈 절반 높이부터 시작(오른쪽박스)
                  values.rect1X[2].end = values.rectStartY / scrollHeight; //end시점 결정(왼쪽박스)
                  values.rect2X[2].end = values.rectStartY / scrollHeight; //end시점 결정(오른쪽박스)
                }
                
            
                const whiteRectWidth = recalculatedInnerWidth * 0.15; //15%기준으로 박스 생성
                values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2;//전체에서 빼서 반으로 나눔 = 한쪽 15%박스를 선택하는것                
                values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
                values.rect2X[0] = values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
                values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

                    // 좌우 흰색 박스 그리기
                objs.context.fillRect(parseInt(calcValues(values.rect1X, currentYOffset)),0,
                parseInt(whiteRectWidth), objs.canvas.height);
                objs.context.fillRect(parseInt(calcValues(values.rect2X, currentYOffset)),0,
                parseInt(whiteRectWidth), objs.canvas.height);

                if(scrollRatio < values.rect1X[2].end) {//캔버스가 브라우저 상단에 닿지 않았다면)
                    step = 1;
                    objs.canvas.classList.remove("sticky"); //css sticky
                } else {
                    step = 2;
                    //imageBlendY: [0,0,{start: 0, end: 0}]
                    //이미지 블랜드11
                    objs.context.drawImage(objs.images[1], 0, 200);
                    objs.canvas.classList.add("sticky");
                    objs.canvas.style.top =`${-(objs.canvas.height - objs.canvas.height * canvasScaleRatio)/2}px`; //마이너스 방향으로 땡김
                }
                
             break;
                
         }
       
        
        
    }
    



    
    function scrollLoop() { //스크롤이 얼만큼 되었는지 판별하는 함수  
        
        enterNewScene = false;
        prevScrollHeight = 0; //초기화 시켜주기위한 값

        for(let i = 0; i < currentScene; i++) { //현재 스크린에 나타나는 신이 i값으로 와야함
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }     

        if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight){
            enterNewScene = true; //scene이 넘어가면서 나오는 -값을 없에주기 위해(opacity값)
            //변수가 true가 되면 그때 새로운 scene으로 넘어간다 라는 뜻
            currentScene++;
            document.body.setAttribute(`id`,`show-scene-${currentScene}`);
        } //스크롤을 아래로 내릴때 현재 scene 1 ->2 로 넘어가는 시점이라고 가정하면
          //스크롤 위치(yOffset) 값이 전의 신의 스크롤값(0 + 1) 과 현재 스크롤 위치값(yOffset 스크롤 위치 - scene1의 마지막 부분) 보다 
          //커지는 경우 scene의 순번이 바뀐다는 것을 if로 표현

          
        if(yOffset < prevScrollHeight) {
            if(currentScene === 0) return; //currentScene 0번째 scene이라면 그냥 종료(브라우저가 바운스 효과로 인해 마이너스 값이 나올 수 있음을 방지)
            currentScene--;
            document.body.setAttribute(`id`,`show-scene-${currentScene}`);//변수랑 문자열 섞여있으면 ` (백틱) 써야된다

        } //스크롤을 위로 올릴때 scene 2->1로 페이지가 올라가는 시점이라고 가정하면
          //yOffset이 prevScrollHeight + 와 current Scene 값 보다 작아지면 scene 번호가 바뀐다는 것을 표현

         //현재 보여지는 scene을 보여줌 

         if (enterNewScene) return;

         playAnimaation();

        
    }   
   


    window.addEventListener('resize',setLayout); //윈도우 창이 변할때 setLayout 함수 실행
    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset; //yoffset을 갱신해줌 편의상 변수로 만듬
        scrollLoop();
    });
    // window.addEventListener(`DOMContentLoaded`, setLayout);//htML 콘텐트만 로딩되면 바로 시작
    window.addEventListener('load', () => {         //익명함수로 여러 함수 호출
        setLayout();
        sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0],0,0);//새로고침시 이미지 처음 그리고 시작 하기 위한 설정
    });//윈도우 로드됫리 이벤트 발생
    window.addEventListener('resize', setLayout); //윈도우 창 재 조절시 이벤트 발생


    setLayout();



}) ();////