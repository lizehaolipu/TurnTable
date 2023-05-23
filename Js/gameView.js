let Application = PIXI.Application,
                Container = PIXI.Container,
                loader = PIXI.loader,
                resources = PIXI.loader.resources,
                Graphics = PIXI.Graphics,
                TextureCache = PIXI.utils.TextureCache,
                Sprite = PIXI.Sprite,
                Text = PIXI.Text,
                TextStyle = PIXI.TextStyle;


let SPECIALStone = 99999
let roundEndAngle = 0
let canRewJiaoMap = new Map()
let rewArrMap = new Map()

let howlerBack = undefined
let howlerSpeak = undefined
let updateTimer = undefined
//用于标注是否收到Update数据
let receiveUpdateTag = false
//用于标注是否收到CONFIG
let receiveGameViewTag = false
let GameIsStart = false
let limitTime = 0
let curRunTime = 0 //当前游戏已执行时长
let GameTimer = setInterval(function () {
    startGameTimer()
 },1000)
//转盘倍率
let timesStyle = new TextStyle({
        fontFamily: "textWord",
        fontSize: 40,
        fill: "#ffffff"
});

let RebetStyle = new TextStyle({
    fontFamily: "albWord",
    fontSize: 60,
    fill: "#ffffff"
});

let selfNamestyle = new TextStyle({
        fontFamily: "albWord",
        fontSize: 25,
        fill: "#ffffff"
});

let otherNamestyle = new TextStyle({
        fontFamily: "albWord",
        fontSize: 25,
        fill: "#bc893c"
});
let playerMoneystyle = new TextStyle({
        fontFamily: "albWord",
        fontSize: 25,
        fill: "#ffffff"
});
 
let doorTag = 1; //1代表开门后是倒计时。2代表盗贼
let outLampArr =[]
//Create a Pixi Application
//创建一个 Pixi应用 需要的一些参数

//创建一个 Pixi应用
let app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    transparent: true,
});
window.addEventListener(`resize`,function(){
    app.renderer.resize(window.innerWidth,window.innerHeight)
})
//获取舞台
let stage = app.stage;
//获取渲染器
let renderer = app.renderer;
let playground = document.getElementById('px-render');
//把 Pixi 创建的 canvas 添加到页面上
playground.appendChild(renderer.view);
let ticker = app.ticker;

let isCreateFirst = false
let isCreateTwo = false
let isCreateThree = false
let u = undefined,
    loginbtn = undefined,
    gPack = undefined,  
    tPack = undefined,
    dPack = undefined,
    nPack = undefined,
    blocks = undefined,
    posX = undefined,
    posY = undefined,
    backB = undefined,
    pixie = undefined, //金门动画
    zhuchiRen = undefined,//主持人动画
    speakImg = undefined,
    backLock = undefined,
    bump = undefined,
    pointerImg = undefined,
    orderSp = undefined,
    SpecialScene = undefined,
    SpecialStone = undefined,

    WinScene = undefined,
    WinStone = undefined,

    BlueMoneyScene = undefined,
    blueNormalTxt = undefined,
    blusMoney= undefined,

    GreenMoneyScene = undefined,
    greenNormalTxt = undefined,
    greenMoney = undefined,

    YellowMoneyScene = undefined,
    yellowNormalTxt = undefined,
    yellowMoney= undefined,

    RedMoneyScene = undefined,
    RedNormalTxt = undefined,
    RedMoney= undefined,

    PurMoneyScene= undefined,
    PurNormalTxt = undefined,
    PurMoney= undefined,
    
    GameQiPaoScene = undefined,//气泡
    QiPaoMessage = undefined,//气泡内容
    TipMessage = undefined,//提示文本
    lampBack = undefined,

    backCai = undefined,//彩色底图
    backHui = undefined,//灰色底图
    backJin =undefined,//金色底图
    playerMoneySp = undefined,
    rebetBtn =undefined,
    backQipao = undefined,//对话气泡
    CurStageInfo = undefined, //当前轮信息
    curAllRunNum = 0,
    daozei = undefined,//盗贼
    curStep = 0//当前转盘转动次数
   

let OrderScneMap = new Map()
let OrderSceneMoneyMap = new Map()
let CancelOrderInfo = new Object() //取消下注的信息
let HasOrderScneMap = new Map() //保存每次下注的信息
let HasOrderScneUseMap = new Map() //保存每次下注的信息，每次游戏结束需要清空
let betMap = new Map()
let ResultInfoArr= [] //三轮，每轮的结果
let startRotation = false;
let turnEndTag = false
let backLockRounTag = false; //金门外转动标签
let backLockRounTime = 0; //金门外转动时长

//当中心灯亮的时候测试阶段只能等全部亮完后才能关闭
let ligthIsEnd = false
let doorOpenTag = false
//倒计时时间
let TimeDurayion = 5
//历史下单操作记录
let orderMoneyMap = new Map()
//转动结束的宝石
let endGemStone = 5;
let isHasDrop = false
//只有等有初始化数据后才能走Update内循环
let IsInRoundUpdate = false
let limitTag = false
//转动结束时倍率
let endTimes = 3
//1=>'绿宝石',2=>'红宝石',3=>'黄宝石',4=>'蓝宝石',5=>'窃贼',
let gemstoneArr = 
    ["1","2","3","4","5",
    "1","2","3","4","5",
    "1","2","3","4","5",
    "1","2","3","4","5",
    "1","2","3","4","5",
    "1","2","3","4","5"
    ]
//---倍率
let timesArr = 
    ["1","2","3","4","5",
    "1","2","3","4","5",
    "1","2","3","4","5",
    "1","2","3","4","5",
    "1","2","3","4","5",
    "1","2","3","4","5"
    ]
let gemstoneMap = new Map()

 //测试 User1 代表玩家自己
let playerMoneyInfoArr = []
let SoundBack = "Back"
let SoundOne = "A"
//历史记录
let historyArr = []
//下单界面可用金额列表
let moneyArr = [100,50,20,10,5,2]
let choseOrderId = 0

let videoSource =undefined
let sounds = undefined
let baseScale = 0.9

let blueScenePosY = 0
let greenScenePosY = 0
let yellowScenePosY = 0
let redScenePosY = 0
let purScenePosY = 0
let betScenePosY = 0



document.addEventListener("USER_LOGIN",function(event){
    receiveLogin(event.data)
})

document.addEventListener("GAME_OPEN",function(event){
    handleGameNotify()
})

document.addEventListener("BET",function(event){
    receiveBet(event.data)
})

document.addEventListener("BET_NOTIFY",function(event){
    receiveBetNotify(event.data)
})

document.addEventListener("CANCEL",function(event){
    receiveCanceleBet(event.data)
})

document.addEventListener("UPDATE",function(event){
    receiveGameUpdate(event.data)
})

document.addEventListener("BROADCAST",function(event){
    receiveBroadcast(event.data)
})

document.addEventListener("GAME_LOTTERY",function(event){
    receiveGameLottery(event.data)
})

document.addEventListener("GAME_START",function(event){
    receiveGameStart(event.data)
})

document.addEventListener("GAME_END",function(event){
    receiveGameEnd(event.data)
})

document.addEventListener("WIN",function(event){
    receiveGameWin(event.data)
})

document.addEventListener("BET_LIST",function(event){
    receiveBetList(event.data)
})

document.addEventListener("CONFIG",function(event){
    receiveGameInfo(event.data)
})
//加载资源
loader
.add("images/bg.png")
.add("images/loginImg.png") 
.add("images/topbg.png")
.add("images/gameIcon.json")
.add("images/turntable.json")
.add("images/door.json")
.add("images/stady/101.png") 
.add("images/stady/102.png") 
.add("images/stady/103.png") 
.add("images/stady/104.png") 
.add("images/stady/105.png") 
.add("images/stady/106.png") 
.add("images/stady/107.png")
.add("images/stady/108.png")  
.add("images/speak/302.png") 
.add("images/speak/303.png") 
.add("images/speak/304.png") 
.add("images/speak/305.png") 
.add("images/speak/306.png") 
.add("images/speak/307.png") 
.add("images/speak/308.png")
.add("images/speak/309.png")  
.add("images/speak/310.png")  
.add("images/daozei.png")  
.load(setup);
function setup() {
    
    //创建spriteu实例，简化创建精灵
    u = new SpriteUtilities(PIXI);
    //创建Bump实例，用于碰撞检测
    bump = new Bump(PIXI);
    gPack = resources["images/gameIcon.json"].textures;
    tPack = resources["images/turntable.json"].textures;
    dPack = resources["images/door.json"].textures;
    posX = app.renderer.width / 2 //+180;
    posY = app.renderer.height / 2 -40 ;

    let back = new Sprite(resources["images/bg.png"].texture);
    back.anchor.set(0.5); //设置锚点为中心
    back.width = window.innerWidth
    back.height = window.innerHeight
    back.x = app.renderer.width / 2 ;
    back.y = app.renderer.height / 2;
    stage.addChild(back);

    gameScene = new Container();
    gameScene.x = posX;
    gameScene.y = posY;
    // // 设置container容器原点
    gameScene.pivot.x = posX;
    gameScene.pivot.y = posY;

    stage.addChild(gameScene);

    let style2 = new TextStyle({
        fontFamily: "albWord",
        fontSize: 30,
        fill: "##382b44"
    });


    loginbtn = new Sprite(resources["images/loginImg.png"].texture);
    loginbtn.anchor.set(0.5)
    loginbtn.x = posX ;
    loginbtn.y = posY +300;
    loginbtn.interactive = true;
    loginbtn.visible = true 
    loginbtn.on('click', (e) => {
        Login()
     });
    gameScene.addChild(loginbtn);


    blocks = new Container();
    blocks.x = posX;
    blocks.y = posY;
    // // 设置container容器原点
    blocks.pivot.x = posX;
    blocks.pivot.y = posY;
    blocks.scale.set(0.85)
    blocks.visible = false 
    gameScene.addChild(blocks);
   

    centerOutScene = new Container()
    centerOutScene.x = posX;
    centerOutScene.y = posY;
    // // 设置container容器原点
    centerOutScene.pivot.x = posX;
    centerOutScene.pivot.y = posY;
    blocks.addChild(centerOutScene)

    let point1 =  u.sprite(gPack["pointer1.png"]);
    point1.x = posX - 33;
    point1.y = posY - 460;
    centerOutScene.addChild(point1);


    let backA =  u.sprite(gPack["record_back.png"]);
    backA.x = posX;
    backA.y = posY -450;
    centerOutScene.addChild(backA);

  
    backB = u.sprite(tPack["back4.png"]);
    backB.anchor.set(0.5)
    backB.x = posX;
    backB.y = posY;
    centerOutScene.addChild(backB);

    gameCenterScene = new Container();
    gameCenterScene.x = posX;
    gameCenterScene.y = posY;
    // // 设置container容器原点
    gameCenterScene.pivot.x = posX;
    gameCenterScene.pivot.y = posY;
    centerOutScene.addChild(gameCenterScene);

  


     
    //宝石容器
    gameGemStoneScene = new Container();
    gameGemStoneScene.x = posX;
    gameGemStoneScene.y = posY;
    // // 设置container容器原点
    gameGemStoneScene.pivot.x = posX;
    gameGemStoneScene.pivot.y = posY;
    gameCenterScene.addChild(gameGemStoneScene);
    backCai = u.sprite(tPack["back3.png"]);
    backCai.anchor.set(0.5)
    backCai.x = posX;
    backCai.y = posY;
    gameGemStoneScene.addChild(backCai);
    gameStoneCenterScene = new Container();
    gameGemStoneScene.addChild(gameStoneCenterScene);
    //----

   // 第2轮容器
    gameTimesScene = new Container();
    gameTimesScene.x = posX;
    gameTimesScene.y = posY;
    gameTimesScene.pivot.x = posX;
    gameTimesScene.pivot.y = posY;
    gameCenterScene.addChild(gameTimesScene)

    backHui = u.sprite(tPack["back1.png"]);
    backHui.anchor.set(0.5)
    backHui.x = posX;
    backHui.y = posY;
    gameTimesScene.addChild(backHui);
    gameTimeCenterScene = new Container()
    gameTimesScene.addChild(gameTimeCenterScene);
    //---
    // 第3轮容器
    gameTimesThreeScene = new Container();
    gameTimesThreeScene.x = posX;
    gameTimesThreeScene.y = posY;
    gameTimesThreeScene.pivot.x = posX;
    gameTimesThreeScene.pivot.y = posY;
    gameCenterScene.addChild(gameTimesThreeScene)

    backJin = u.sprite(tPack["back2.png"]);
    backJin.anchor.set(0.5)
    backJin.x = posX;
    backJin.y = posY;
    gameTimesThreeScene.addChild(backJin);
    gameTimeThreeCenterScene = new Container()
    gameTimesThreeScene.addChild(gameTimeThreeCenterScene);
    //---
    lampBack = u.sprite(gPack["lamp_back.png"]);
    lampBack.anchor.set(0.5)
    lampBack.x = posX;
    lampBack.y = posY;
    lampBack.rotation = 6 * Math.PI / 180;
    gameCenterScene.addChild(lampBack);

    gameRewTopScene = new Container();
    gameCenterScene.addChild(gameRewTopScene);

    gameTopDotScene = new Container();
    gameCenterScene.addChild(gameTopDotScene);


    pointerImg = u.sprite(gPack["pointer2.png"]);
    pointerImg.anchor.set(0.5)
    pointerImg.x = posX ;
    pointerImg.y = posY - 410;
    pointerImg.circular = true
    blocks.addChild(pointerImg);
    

    backLock = u.sprite(gPack["lock_open.png"]);
    backLock.anchor.set(0.5)
    backLock.x = posX;
    backLock.y = posY;
    blocks.addChild(backLock);

    //门后倒计时文本

    gameTimeScene = new Container();
    gameTimeScene.x = posX;
    gameTimeScene.y = posY;

    // // 设置container容器原点
    gameTimeScene.pivot.x = posX;
    gameTimeScene.pivot.y = posY;
    gameCenterScene.addChild(gameTimeScene);

    let style = new TextStyle({
        fontFamily: "albWord",
        fontSize: 100,
        fill: "white"
    });

    message = new Text("0", style);
    message.anchor.set(0.5)


    message.x = posX ;
    message.y = posY;
    message.visible = false
    blocks.addChild(message);

    daozei = new Sprite(resources["images/daozei.png"].texture);
    daozei.anchor.set(0.5)
    daozei.scale.set(0.1)
    daozei.x = posX ;
    daozei.y = posY;
    daozei.visible = false
    blocks.addChild(daozei);
   
    //主持人
    zhuchiRenStadyScene = new Container();
    blocks.addChild(zhuchiRenStadyScene);
    let zhuchuFrames = [resources["images/stady/101.png"].texture,resources["images/stady/102.png"].texture,resources["images/stady/103.png"].texture,resources["images/stady/104.png"].texture,
    resources["images/stady/105.png"].texture,resources["images/stady/106.png"].texture,resources["images/stady/107.png"].texture,resources["images/stady/108.png"].texture];
    zhuchiRen = u.sprite(zhuchuFrames);
    zhuchiRen.anchor.set(0.5)
    zhuchiRen.scale.set(0.32)
    zhuchiRen.position.set(posX -680,posY + 180);
    zhuchiRenStadyScene.addChild(zhuchiRen);
    zhuchiRen.animationSpeed = 0.2//fps = 10
    zhuchiRen.loop = true
    zhuchiRen.visible = true
    zhuchiRen.gotoAndPlay(0);
   //说话
    zhuchiRenSpeakScene = new Container();
    blocks.addChild(zhuchiRenSpeakScene);
    let zhuchuSpFrames = [resources["images/speak/302.png"].texture,resources["images/speak/303.png"].texture,resources["images/speak/304.png"].texture,resources["images/speak/305.png"].texture,
    resources["images/speak/306.png"].texture,resources["images/speak/307.png"].texture,resources["images/speak/308.png"].texture,resources["images/speak/309.png"].texture,resources["images/speak/310.png"].texture];
    speakImg = u.sprite(zhuchuSpFrames);
    speakImg.anchor.set(0.5)
    speakImg.scale.set(0.32)
    speakImg.position.set(posX -680,posY + 180);
    zhuchiRenSpeakScene.addChild(speakImg);
    speakImg.animationSpeed = 0.15//fps = 10
    speakImg.loop = true
    speakImg.visible = false
    speakImg.gotoAndPlay(0);

        //对话气泡
    GameQiPaoScene = new Container();
    blocks.addChild(GameQiPaoScene);
    backQipao = u.sprite(gPack["qipao.png"]);
    backQipao.anchor.set(0.5)
    backQipao.x = posX - 680;
    backQipao.y = posY - 300;
    GameQiPaoScene.addChild(backQipao);
    QiPaoMessage = new Text("", otherNamestyle);
    QiPaoMessage.x = backQipao.x - backQipao.width/ 2 + 50;
    QiPaoMessage.y = backQipao.y - backQipao.height /2  + 20;
    GameQiPaoScene.addChild(QiPaoMessage);
    GameQiPaoScene.visible = false

    //------------------------金门动画
    let pixieFrames = [dPack["1.png"], dPack["2.png"], dPack["3.png"], dPack["4.png"], dPack["5.png"], dPack["6.png"], dPack["7.png"]];
    pixie = u.sprite(pixieFrames);
    pixie.position.set(posX-130,posY - 120);
    blocks.addChild(pixie);
    pixie.animationSpeed = 0.5//fps = 10
    pixie.loop = false
    pixie.onComplete = () => {
        if (doorOpenTag){
            // //开门后
            if(doorTag == 1){
                message.visible = true
            }else{
                //放大大贼
                showThief()
            }
            
        }else{
            //关门后 下单按钮移走
            if(doorTag == 1){
                dropBetBtn()
            }
           
        }
    }; 
    //------------------------------------
     //灯1
     gameLight1Scene = new Container();
     gameLight1Scene.x = posX;
     gameLight1Scene.y = posY;
     gameLight1Scene.pivot.x = posX;
     gameLight1Scene.pivot.y = posY;
     gameLight1Scene.visible = false
     gameCenterScene.addChild(gameLight1Scene);
 
        //灯2
     gameLight2Scene = new Container();
     gameLight2Scene.x = posX;
     gameLight2Scene.y = posY;
     gameLight2Scene.pivot.x = posX;
     gameLight2Scene.pivot.y = posY;
     gameLight2Scene.visible = false
     gameCenterScene.addChild(gameLight2Scene);
        //灯3
     gameLight3Scene = new Container();
     gameLight3Scene.x = posX;
     gameLight3Scene.y = posY;
     gameLight3Scene.pivot.x = posX;
     gameLight3Scene.pivot.y = posY;
     gameLight3Scene.visible = false
     gameCenterScene.addChild(gameLight3Scene);

    createLamp(backB.width /2 -276,gameLight1Scene)
    createLamp(backB.width /2 -257,gameLight2Scene)
    createLamp(backB.width /2 -238,gameLight3Scene)
    createOutLamp(backB.width /2 -35)
     //历史记录相关
     gameHistoryScene = new Container();
     gameHistoryScene.x = posX;
     gameHistoryScene.y = posY;
     gameHistoryScene.pivot.x = posX;
     gameHistoryScene.pivot.y = posY;
     blocks.addChild(gameHistoryScene);

     updatehistoryRecord()

     gameBottomScene = new Container();
     gameBottomScene.x = posX;
     gameBottomScene.y = posY;

     // // 设置container容器原点
     gameBottomScene.pivot.x = posX;
     gameBottomScene.pivot.y = posY - 30;
     blocks.addChild(gameBottomScene);

    betScene = new Container(); 
    gameBottomScene.addChild(betScene)
    betScenePosY= betScene.y
     //重新下单
    rebetBtn = u.sprite(gPack["btn_g.png"]);
    rebetBtn.anchor.set(0,0.5)
    rebetBtn.x = posX + 550;
    rebetBtn.y = posY + 480;
    betScene.addChild(rebetBtn);
    rebetBtn.interactive  = true;
    rebetBtn.on('click', (e) => {
       rebetBtnClick()
    });

    rebetTxt = new Text("REBET", RebetStyle);
    rebetBtn.anchor.set(0,0.5)
    rebetTxt.x = posX + 650;
    rebetTxt.y = posY + 450;
    betScene.addChild(rebetTxt);
   //------ 控制器按钮相关
     //btn_b,btn_g,btn_p,btn_r,btn_y
     gameBottomBlueScene = new Container();
     gameBottomScene.addChild(gameBottomBlueScene)
     blueScenePosY = gameBottomBlueScene.x
     btn_b = u.sprite(gPack["btn_y.png"]);
     //btn_b.anchor.set(0.5)
     btn_b.x = posX -500;
     btn_b.y = posY + backCai.width / 2 -40;
     btn_b.interactive  = true;
     btn_b.on('click', (e) => {
        clicOrderBtn(btn_b.x,4)
     });
     gameBottomBlueScene.addChild(btn_b);
     let blueSp = u.sprite(gPack["bb_4.png"]);
     blueSp.x = posX - 460;
     blueSp.y = posY + backCai.width / 2 - 110;
     gameBottomBlueScene.addChild(blueSp);


     BlueMoneyScene = new Container();
     gameBottomBlueScene.addChild(BlueMoneyScene)

     btnBCancel = u.sprite(gPack["btn_remove.png"]);
     //btn_b.anchor.set(0.5)
     btnBCancel.x = blueSp.x - blueSp.width / 2 ;
     btnBCancel.y = blueSp.y + 85;
     btnBCancel.interactive  = true;

     btnBCancel.on('click', (e) => {
        removeOrderBtn(BlueMoneyScene,4)
     });
    BlueMoneyScene.addChild(btnBCancel);
  
    blueNormalTxt = new Text("BET", style2);
    blueNormalTxt.x = blueSp.x + 50;;
    blueNormalTxt.y = blueSp.y + 125;
    blueNormalTxt.anchor.set(0.5)
    betMap.set(4,blueNormalTxt)
    gameBottomBlueScene.addChild(blueNormalTxt);

    blusMoney = new Text("-1", style2);
    blusMoney.x = blueSp.x + 50;;
    blusMoney.y = blueSp.y + 125;
    blusMoney.anchor.set(0.5)
    BlueMoneyScene.addChild(blusMoney);
    BlueMoneyScene.visible = false
    OrderScneMap.set(4,BlueMoneyScene)
    OrderSceneMoneyMap.set(4,blusMoney)

     gameBottomGreeScene = new Container();
     gameBottomScene.addChild(gameBottomGreeScene)
     greenScenePosY = gameBottomGreeScene.y
     btn_g = u.sprite(gPack["btn_y.png"]);
     // backJ.anchor.set(0.5)
     btn_g.x = posX -300;
     btn_g.y = posY + backCai.width / 2 -10;
     btn_g.interactive = true;
     btn_g.on('click', (e) => {
        clicOrderBtn(btn_g.x,1)
     });
     gameBottomGreeScene.addChild(btn_g);
     let greeSp = u.sprite(gPack["bb_1.png"]);
     greeSp.x = posX - 260;
     greeSp.y = posY + backCai.width / 2 - 80;
     gameBottomGreeScene.addChild(greeSp);

     GreenMoneyScene = new Container();
     gameBottomGreeScene.addChild(GreenMoneyScene)
    
     btnGCancel = u.sprite(gPack["btn_remove.png"]);
     btnGCancel.x = greeSp.x - greeSp.width / 2 ;
     btnGCancel.y = greeSp.y + 85;
     btnGCancel.interactive  = true;
     btnGCancel.on('click', (e) => {
        removeOrderBtn(GreenMoneyScene,1)
     });

    GreenMoneyScene.addChild(btnGCancel);


    greenNormalTxt = new Text("BET", style2);
    greenNormalTxt.anchor.set(0.5)
    greenNormalTxt.x = greeSp.x + 50;
    greenNormalTxt.y = greeSp.y + 125;
    betMap.set(1,greenNormalTxt)
    gameBottomGreeScene.addChild(greenNormalTxt);

    greenMoney = new Text("-1", style2);
    greenMoney.anchor.set(0.5)
    greenMoney.x = greeSp.x + 50;
    greenMoney.y = greeSp.y + 125;
    GreenMoneyScene.addChild(greenMoney);
    GreenMoneyScene.visible = false
    OrderScneMap.set(1,GreenMoneyScene)
    OrderSceneMoneyMap.set(1,greenMoney)

     gameBottomYellowScene = new Container();
     gameBottomScene.addChild(gameBottomYellowScene)
     yellowScenePosY=gameBottomYellowScene.y
     btn_y = u.sprite(gPack["btn_y.png"]);
     // backJ.anchor.set(0.5)
     btn_y.x = posX -100;
     btn_y.y = posY + backCai.width / 2 +20;
     btn_y.interactive = true;
     btn_y.on('click', (e) => {
        clicOrderBtn(btn_y.x,5)
     });
     gameBottomYellowScene.addChild(btn_y);
     let yellowSp = u.sprite(gPack["bb_5.png"]);
     yellowSp.x = posX - 60;
     yellowSp.y = posY + backCai.width / 2 - 50;
     gameBottomYellowScene.addChild(yellowSp);


     YellowMoneyScene = new Container();
     gameBottomYellowScene.addChild(YellowMoneyScene)
     
     btnYCancel = u.sprite(gPack["btn_remove.png"]);
     btnYCancel.x = yellowSp.x - yellowSp.width / 2 ;
     btnYCancel.y = yellowSp.y + 85;
     btnYCancel.interactive  = true;
     btnYCancel.on('click', (e) => {
        removeOrderBtn(YellowMoneyScene,1)
     });
    YellowMoneyScene.addChild(btnYCancel);

    yellowNormalTxt = new Text("BET", style2);
    yellowNormalTxt.anchor.set(0.5)
    yellowNormalTxt.x = yellowSp.x + 50;
    yellowNormalTxt.y = yellowSp.y + 130;
    betMap.set(5,yellowNormalTxt)
    gameBottomYellowScene.addChild(yellowNormalTxt);

    yellowMoney = new Text("-1", style2);
    yellowMoney.anchor.set(0.5)
    yellowMoney.x = yellowSp.x + 50;
    yellowMoney.y = yellowSp.y + 130;
    YellowMoneyScene.addChild(yellowMoney);
    YellowMoneyScene.visible = false
    OrderScneMap.set(5,YellowMoneyScene)
    OrderSceneMoneyMap.set(5,yellowMoney)

     gameBottomRedScene = new Container();
     gameBottomScene.addChild(gameBottomRedScene)
     redScenePosY = gameBottomRedScene.y
     btn_r = u.sprite(gPack["btn_y.png"]);
     // backJ.anchor.set(0.5)
     btn_r.x = posX +100;
     btn_r.y = posY + backCai.width / 2 - 10;
     btn_r.interactive = true;
     btn_r.on('click', (e) => {
        clicOrderBtn(btn_r.x,2)
     });
     gameBottomRedScene.addChild(btn_r);
     let redSp = u.sprite(gPack["bb_2.png"]);
     redSp.x = posX + 140;
     redSp.y = posY + backCai.width / 2 - 80;
     gameBottomRedScene.addChild(redSp);

     RedMoneyScene = new Container();
     gameBottomRedScene.addChild(RedMoneyScene)
     

     btnRCancel = u.sprite(gPack["btn_remove.png"]);
     btnRCancel.x = redSp.x - redSp.width / 2 ;
     btnRCancel.y = redSp.y + 85;
     btnRCancel.interactive  = true;
     btnRCancel.on('click', (e) => {
        removeOrderBtn(RedMoneyScene,2)
     });
     RedMoneyScene.addChild(btnRCancel);

     RedNormalTxt = new Text("BET", style2);
     RedNormalTxt.anchor.set(0.5)
     RedNormalTxt.x = redSp.x + 50;
     RedNormalTxt.y = redSp.y + 130;
     betMap.set(2,RedNormalTxt)
     gameBottomRedScene.addChild(RedNormalTxt);

    RedMoney = new Text("-1", style2);
    RedMoney.anchor.set(0.5)
    RedMoney.x = redSp.x + 50;
    RedMoney.y = redSp.y + 130;
    RedMoneyScene.addChild(RedMoney);
    RedMoneyScene.visible = false
    OrderScneMap.set(2,RedMoneyScene)
    OrderSceneMoneyMap.set(2,RedMoney)


     gameBottomPurScene = new Container();
     gameBottomScene.addChild(gameBottomPurScene)
     purScenePosY=gameBottomPurScene.y
     btn_p = u.sprite(gPack["btn_y.png"]);
     // backJ.anchor.set(0.5)
     btn_p.x = posX + 300;
     btn_p.y = posY + backCai.width / 2 - 40;
     btn_p.interactive = true;
     btn_p.on('click', (e) => {
        clicOrderBtn(btn_p.x,3)
     });
     gameBottomPurScene.addChild(btn_p);
     let purSp = u.sprite(gPack["bb_3.png"]);
     purSp.x = posX + 340;
     purSp.y = posY + backCai.width / 2 - 110;
     gameBottomPurScene.addChild(purSp);


     PurMoneyScene = new Container();
     gameBottomPurScene.addChild(PurMoneyScene)
    
     btnPCancel = u.sprite(gPack["btn_remove.png"]);
     btnPCancel.x = purSp.x - purSp.width / 2 ;
     btnPCancel.y = purSp.y + 85;
     btnPCancel.interactive  = true;
     btnPCancel.on('click', (e) => {
        removeOrderBtn(PurMoneyScene,3)
     });
    PurMoneyScene.addChild(btnPCancel);

    PurNormalTxt = new Text("BET", style2);
    PurNormalTxt.anchor.set(0.5)
    PurNormalTxt.x = purSp.x + 50;
    PurNormalTxt.y = purSp.y + 130;
    betMap.set(3,PurNormalTxt)
    gameBottomPurScene.addChild(PurNormalTxt);

    PurMoney = new Text("BET", style2);
    PurMoney.anchor.set(0.5)
    PurMoney.x = purSp.x + 50;
    PurMoney.y = purSp.y + 130;
    PurMoneyScene.addChild(PurMoney);
    PurMoneyScene.visible = false
    OrderScneMap.set(3,PurMoneyScene)
    OrderSceneMoneyMap.set(3,PurMoney)
    //---------------------------------------------------
     //创建下单界面
     gameOrderScene = new Container();
     gameOrderScene.x = posX;
     gameOrderScene.y = posY;
     gameOrderScene.pivot.x = posX;
     gameOrderScene.pivot.y = posY;
     gameOrderScene.visible = false
     blocks.addChild(gameOrderScene)
     orderSp = u.sprite(gPack["textback.png"]);
     orderSp.x = posX ;
     orderSp.y = posY ;
     gameOrderScene.addChild(orderSp);

     //创建下单界面金额
     gameOrderMoneyScene = new Container();
     gameOrderMoneyScene.x = posX;
     gameOrderMoneyScene.y = posY;
     gameOrderMoneyScene.pivot.x = posX;
     gameOrderMoneyScene.pivot.y = posY;
     gameOrderScene.addChild(gameOrderMoneyScene)



    //特殊宝石
    SpecialScene = new Container();
    SpecialScene.visible = false
    blocks.addChild(SpecialScene);

    //结果展示
    WinScene = new Container();
    WinScene.visible = false
    blocks.addChild(WinScene);


        //创建玩家列表
    gamePlayerMoneyScene = new Container();
    gameScene.addChild(gamePlayerMoneyScene)
   
    playerMoneySp = u.sprite(gPack["rank.png"]);
    playerMoneySp.anchor.set(0.5)
    playerMoneySp.x = posX + 650;
    playerMoneySp.y = posY - 100 ;
    gamePlayerMoneyScene.visible = false   //--- false
    gamePlayerMoneyScene.addChild(playerMoneySp);
    
    let stealer = new Text("STEALER", style2);
    stealer.x = playerMoneySp.x  - 100;;
    stealer.y = playerMoneySp.y - 220;
    stealer.anchor.set(0.5)
    gamePlayerMoneyScene.addChild(stealer);

    let win = new Text("WIN", style2);
    win.x = playerMoneySp.x + 90;;
    win.y = playerMoneySp.y -220;
    win.anchor.set(0.5)
    gamePlayerMoneyScene.addChild(win);

    gamePlayerMoneyTxtScene = new Container();
    gamePlayerMoneyScene.addChild(gamePlayerMoneyTxtScene)
    //-------------------
    //提示板
    TipMessage = new Text("", selfNamestyle);
    TipMessage.anchor.set(0.5)
    TipMessage.x = posX +500;
    TipMessage.y = posY -450;
    blocks.addChild(TipMessage);

    let howlerABack = new Howl({
        src: ['audio/beijing.mp3'],
        loop:`true`
       });
    howlerABack.play()

    howlerSpeak = new Howl({
        src: ['audio/gyl3.m4a']
       });
}

//显示盗贼
function showThief(){
    daozei.visible = true
    TweenMax.to(daozei.scale, 2, {
        x: 0.15,
        y: 0.15,
        ease: Linear.easeNone // 线性缓动函数，使缩放动画匀速
      
    });
}

//隐藏盗贼
function hideThief(){
    TweenMax.to(daozei.scale, 2, {
        x: 0.1,
        y: 0.1,
        ease: Linear.easeNone, // 线性缓动函数，使缩放动画匀速
        onComplete: onShowEnd
    });
}

function onShowEnd(){
    daozei.visible = false
}

//更新玩家列表
function updatePlayerInfo(){
    playerMoneyInfoArr.sort((a,b)=>{
        return b.Bet - a.Bet
    })
    gamePlayerMoneyTxtScene.removeChildren()
    for(let i =0;i< playerMoneyInfoArr.length;i++){
        let namestyle = otherNamestyle
        if (playerMoneyInfoArr[i].Name == "User1"){
            namestyle = selfNamestyle
        }
        let nameTextString = playerMoneyInfoArr[i].Name
        let nameTxt = new Text(nameTextString, namestyle);
        nameTxt.x = playerMoneySp.x -140; //120
        nameTxt.y = playerMoneySp.y - playerMoneySp.width / 2 + 40 + i * 35;
        nameTxt.anchor.set(0.5)
        gamePlayerMoneyTxtScene.addChild(nameTxt);
    
        let moneyTxt = new Text(playerMoneyInfoArr[i].Bet, namestyle);
        moneyTxt.x = playerMoneySp.x + 110;//90
        moneyTxt.y = playerMoneySp.y  - playerMoneySp.width / 2 + 40 + i * 35;
        moneyTxt.anchor.set(0.5)
        gamePlayerMoneyTxtScene.addChild(moneyTxt);
   }
}

//播放音频
function startAudio(){
    howlerSpeak.play() 
 }

//创建特殊宝石
function createSpecialStone(){
    SpecialScene.removeChildren()
    let backT = u.sprite(gPack["bb_"+SpecialStone+".png"]);
    backT.scale.set(0)
    backT.anchor.set(0.5)
    backT.x = posX; 
    backT.y = posY ;
    SpecialScene.addChild(backT);
    SpecialScene.visible = true
    let targetScale = 1.5
    TweenMax.to(backT.scale, 1, {
        x: targetScale,
        y: targetScale,
        ease: Linear.easeNone // 线性缓动函数，使缩放动画匀速
    });
}

//隐藏特殊宝石
function hideSpecialStone(){
    //.getChildAt
    let num= SpecialScene.children.length
    if (num > 0){
        // let backT = SpecialScene.getChildAt(0)
        // let lscale = 1
        // let localTimer = setInterval(()=>{
        //     if(backT.scale.x <= 0){
        //         SpecialScene.visible = false
        //         clearInterval(localTimer)
        //     }
        //     lscale -=0.5
        //     if(lscale < 0){
        //         lscale = 0
        //     }
        //     backT.scale.set(lscale)
        // },50)
        let backT = SpecialScene.getChildAt(0)
        TweenMax.to(backT.scale, 0.5, {
            x: 0,
            y: 0,
            ease: Linear.easeNone // 线性缓动函数，使缩放动画匀速
        });
    }else{
        SpecialScene.visible = false
    }
    
}

//结果展示
function createWinStone(){
    startRotation = false
    pointRotaTag = false
    hideSpecialStone()
    WinScene.removeChildren();
    let backT = u.sprite(gPack["bb_"+WinStone.MarkId+".png"]);
    backT.anchor.set(0.5)
    backT.scale.set(0)
    backT.x = posX; 
    backT.y = posY ;
    WinScene.addChild(backT);
    WinScene.visible = true
    // let lscale = 0
    // let localTimer = setInterval(()=>{
    //     if(backT.scale.x >=1){
    //         clearInterval(localTimer)
    //     }
    //     lscale +=0.3
    //     if(lscale > 1.3){
    //         lscale = 1.3
    //     }
    //     backT.scale.set(lscale)
    // },50)
    let targetScale = 1.5
    TweenMax.to(backT.scale, 1, {
        x: targetScale,
        y: targetScale,
        ease: Linear.easeNone // 线性缓动函数，使缩放动画匀速
    });
    //游戏结束
    CurStageInfo = undefined
    //显示历史宝石
    if (WinStone && WinStone.MarkId){
        if(historyArr.length == 20){
            historyArr.pop()
        }
        historyArr.push(WinStone.MarkId)
        updatehistoryRecord()
    }
}

//隐藏结果展示
function hideWinStone(){
    let num= WinScene.children.length
    if (num > 0){
        let backT = WinScene.getChildAt(0)
        // let lscale = 1.2
        // let localTimer = setInterval(()=>{
        //     if(backT.scale.x <= 0){
        //         WinScene.visible = false
        //         clearInterval(localTimer)
        //     }
        //     lscale -=0.5
        //     if(lscale < 0){
        //         lscale = 0
        //     }
        //     backT.scale.set(lscale)
        // },50)
        TweenMax.to(backT.scale,0.5, {
            x: 0,
            y: 0,
            ease: Linear.easeNone // 线性缓动函数，使缩放动画匀速
        });
    }else{
        WinScene.visible = false
    }
}

function createLamp(radius,scene){
    let gAngle = 360 / 30
    for( let i =0;i < 30;i++){
        let realAngle = gAngle * i + 2
        let backT = u.sprite(gPack["lamp_y.png"]);
        backT.rotation = realAngle * Math.PI / 180;
        backT.x = posX + radius * Math.cos(realAngle * Math.PI/180); 
        backT.y = posY  + radius * Math.sin(realAngle * Math.PI/180);  
        scene.addChild(backT);
    }
}

function createOutLamp(radius){
    let gAngle = 360 / 20

    for( let i = 0;i < 20;i++){
        if (i != 15){
            let realAngle = gAngle * i -1.7
            let backT = u.sprite(gPack["lamp_y.png"]);
            backT.rotation = realAngle * Math.PI / 180;
            backT.x = posX + radius * Math.cos(realAngle * Math.PI/180); 
            backT.y = posY  + radius * Math.sin(realAngle * Math.PI/180);
            outLampArr.push(backT)
            blocks.addChild(backT);
        }
    }
    shinOutLamp()
}

function shinOutLamp(){
    let timer = setInterval(()=>{
        for(let i =0;i <outLampArr.length;i++){
            let rand = Math.random()
            if (rand <= 0.5 ){
                outLampArr[i].visible = false
            }else{
                outLampArr[i].visible = true
            }
        }
    },1000)
}


function addHistoryInfo(){
    historyArr.push("1")
    updatehistoryRecord()
}

//历史记录
function updatehistoryRecord(){
    gameHistoryScene.removeChildren()
    let gEffAngle = 296.9
    let gEffr = backB.width /2 +50
    let gAngle = 298
    let gr = backB.width /2 +39
    for( let i =0;i < historyArr.length;i++){
        let realEffAngle = gEffAngle + i * 5
        let eff = u.sprite(gPack["eff.png"]);
        eff.scale.set(0.7)
        eff.rotation = (realEffAngle  + 92)* Math.PI / 180;
        eff.x = posX + gEffr * Math.cos(realEffAngle * Math.PI/180); 
        eff.y = posY  + gEffr * Math.sin(realEffAngle * Math.PI/180);
        gameHistoryScene.addChild(eff);

        let realAngle = gAngle + i * 5
        let backT = u.sprite(gPack["sb_"+historyArr[i]+".png"]);
        backT.scale.set(0.6)
        backT.rotation = (realAngle  + 92)* Math.PI / 180;
        backT.x = posX + gr * Math.cos(realAngle * Math.PI/180); 
        backT.y = posY  + gr * Math.sin(realAngle * Math.PI/180);
        gameHistoryScene.addChild(backT);
    }
}

function removehistoryRecord(){
    gameHistoryScene.removeChildren()
    historyArr = []
}

function startClinton(){
    parent.createWebSocket()
}

function openDoor(){
    backLock.rotation = 0
    let endRot = (360) * Math.PI / 180
    TweenMax.to(backLock,1.5,{
        rotation: endRot,
        ease: Quad.easeInOut, // 四次方缓动函数，使旋转动画中间部分速度变化更加平滑
        onComplete: outDoorRounEnd//firstRoundEnd
    })
}

function outDoorRounEnd(){
    doorOpenTag = true
    pixie.animationSpeed = 0.5
    pixie.play()
}
function closeDoor(){
    doorOpenTag = false
    pixie.animationSpeed = -0.5
    pixie.play()
}

let hasAmplify = false
//放大
function amplify(){
   
    let posx = app.renderer.width / 2 ;
    let posy = app.renderer.height / 2;
    hasAmplify = true
    let baseScale = 1
    TweenMax.to(blocks.scale, 1, {
        x: baseScale,
        y: baseScale,
        ease: Linear.easeNone // 线性缓动函数，使缩放动画匀速
    });
    TweenMax.to(blocks, 1, {
        x: posx,
        y: posy + 100,
        ease: Linear.easeNone // 线性缓动函数，使缩放动画匀速
    });
}

//缩小
function reduce(){
    if(hasAmplify){
        hasAmplify = false
        let baseScale = 0.85
        TweenMax.to(blocks.scale, 1, {
            x: baseScale,
            y: baseScale,
            ease: Linear.easeNone // 线性缓动函数，使缩放动画匀速
        });
        let posx = app.renderer.width / 2 ;
        let posy = app.renderer.height / 2 ;

        TweenMax.to(blocks, 1, {
            x: posx,
            y: posy,
            ease: Linear.easeNone // 线性缓动函数，使缩放动画匀速
        });
    }
}

function tesetRoun(){
    gameCenterScene.rotation = 0
    startRoun(3,0)
}

const timeline = new TimelineMax({
    repeat: -1,
    yoyo: true
});

let endRoundAngle = 0
function startRoun(aTime,endAngle){
    gameCenterScene.rotation = 0
    endRoundAngle = endAngle
    let endRot = (360 +endAngle) * Math.PI / 180
    TweenMax.to(gameCenterScene,aTime - 0.5,{
        rotation: endRot,
        ease: Quad.easeInOut, // 四次方缓动函数，使旋转动画中间部分速度变化更加平滑
        onComplete: updateRotation//firstRoundEnd
    })

    // let startRotation = 0
    // let endRotation = 1.5;
    // // 添加旋转动画到timeline对象中
    // timeline.to(pointerImg, 1, {
    //     rotation: endRotation,
    //     ease: Quad.easeInOut//Power3.easeIn // 三次方缓动函数，使加速阶段速度变化更加平滑
    // }).to(pointerImg, 1, {
    //     rotation: startRotation,
    //     ease: Quad.easeInOut//Power3.easeOut, // 三次方缓动函数，使减速阶段速度变化更加平滑
    // });
    // timeline.play()
}

function updateRotation(){
    timeline.stop()
    if(pointerImg.rotation != 0){
        TweenMax.to(pointerImg,0.1,{
            rotation: 0,
            ease: Linear.easeNone,//Quad.easeInOut, // 四次方缓动函数，使旋转动画中间部分速度变化更加平滑
            onComplete: pointRoundEnd
        })
    }
}
function pointRoundEnd(){
    console.log("22222啊啊啊啊啊")
}
function endRoun(){
    //console.log("结束转："+curRunTime+" 当前时间"+getNowFormatDate())
    turnEndTag = true
    // ticker.stop()
}

function backLockRoun(){
    startCenterflicker()
    backLockRounTag = true
    let localTimer = setInterval(function(){
        backLockRounTime -= 1
        if (backLockRounTime == 0){
            backLockEndRoun()
            clearInterval(localTimer)
        }
      },1000)
}

function backLockEndRoun(){
    stopCenterflicker()
    backLockRounTag = false
    //显示特殊宝石
    createSpecialStone()
}

//开始转盘中心闪动
function startCenterflicker(){
    ligthIsEnd = false
    let index = 1
    gameLight1Scene.visible = true
    let timeLimit = 2
    let localTimer = setInterval(function(){
        timeLimit -= 1
        if (timeLimit == 1){
            gameLight2Scene.visible = true
        }else{
            gameLight3Scene.visible = true
            gameLight3Scene.children.some(function (block) {
                index += 1
                if (index % 3 == 0){
                    block.visible = true
                }else{
                    block.visible = false
                }
            })
            ligthIsEnd = true    
            clearInterval(localTimer)
        }
      },500)
}

//停止中心闪动
function stopCenterflicker(){
    if (ligthIsEnd){
        gameLight1Scene.visible = false
        gameLight2Scene.visible = false
        gameLight3Scene.visible = false
    }
}

//点击订单按钮
function clicOrderBtn(aPos,aOrderId){
    if (curRunTime > 15){
        //15秒后禁止下单
        return
    }
    gameOrderScene.x = aPos
    gameOrderScene.visible = true
    choseOrderId = aOrderId
    creatOderListText()
}

//创建下单界面金额
function creatOderListText(){
    gameOrderMoneyScene.removeChildren()
    for(let i =0;i< moneyArr.length;i++){
        let style2 = new TextStyle({
            fontFamily: "textWord",
            fontSize: 30,
            fill: "#ffffff"
        });
        let money = moneyArr[i];
        message2 = new Text(money, style2);
        message2.anchor.set(0.5)
        message2.x = posX + orderSp.width / 2 -10;
        message2.y = posY + 50 + i * 50;
        message2.visible = true
        message2.interactive = true
        message2.on('click', (e) => {
            closeOrderList(money)
        });
        gameOrderMoneyScene.addChild(message2);
    }
}

//下注
function closeOrderList(aMoney){
    gameOrderScene.visible = false
    orderMoneyMap.set(choseOrderId,aMoney)
    tryBetting(choseOrderId,1,aMoney)
}


//取消下注
function removeOrderBtn(aScene,OrderId){
    //取消下注
    CancelOrderInfo.OrderId = OrderId
    CancelOrderInfo.Scene = aScene
    cancelBetting(OrderId)
}


//重新下单
function rebetBtnClick(){
    for (var [orderId, aMoney] of orderMoneyMap.entries()) {
        orderMoneyMap.set(orderId,aMoney)
        tryBetting(orderId,1,aMoney)
    }
}



function getZheng(num){
    let index = String(num).indexOf(".")
    if(index>-1){
		let str = String(num)
        let  a= str.substring(1,index)
        let b= str.substring(index+1,index+2)
        if( b>= 5){
            a = Number(a)+ 1
        }
        return a
	}
	else{
		return -num
	}
}

function Login(){
    startClinton()
}

function receiveLogin(aData){
    if(aData.is_login){
        GameIsStart = false
       // ////console.log("登录成功，初步启动计时器 "+new Date().getTime())
        curRunTime = 0
        limitTime = 0
        startNotify()
    }
}

//打开游戏推送
function handleGameNotify(){
    //获取游戏参数
    receiveGameViewTag = false
    getGameInfo()
    let gameInfoTimer = setInterval(function () {
        ////console.log("请求转盘："+receiveGameViewTag)
        if (receiveGameViewTag){
             clearInterval(gameInfoTimer)
             gameInfoTimer = undefined
        }else{
            getGameInfo()
        }
      },100)
    getBetList(false)
    receiveUpdateTag = false
    getGameProgress()
    updateTimer = setInterval(function () {
       if (receiveUpdateTag){
            clearInterval(updateTimer)
            updateTimer = undefined
       }else{
            getGameProgress()
       }
     },100)
}

//获取当前下注记录
function receiveBetList(aMsg){
    playerMoneyInfoArr = []
//let playerMoneyInfoArr = [["User1",100],["User2",20],["User3",1],["User4",9]]
    var dataArr = aMsg.data;
    for(let i =0;i< dataArr.length;i++){
        var name = dataArr[i].username
        var bet = dataArr[i].bet
        playerMoneyInfoArr.push({Name:name,Bet:bet})
    }
    updatePlayerInfo()
}


function receiveBetNotify(aMsg){
    if(aMsg.status == 1){
        let data = aMsg.data
        let name = data.user_id
        let bet = data.bet
        playerMoneyInfoArr.push({Name:name,Bet:bet})
        updatePlayerInfo()
    }
    
}



//响应下单
function receiveBet(aMsg){
    var data=aMsg.data;
    if(aMsg.status == 1){
        let makId = data.mark_id
        betMap.get(makId).visible = false
        OrderScneMap.get(makId).visible = true
        OrderSceneMoneyMap.get(makId).text = data.bet
        AddHasOrderSceneMap(makId)
    }else{
        TipMessage.text = "下注失败"+aMsg.status
    }
}

//取消下单
function receiveCanceleBet(aMsg){
    var data= aMsg.data;
    if (aMsg == 1){
        betMap.get(CancelOrderInfo.OrderId).visible = true
        orderMoneyMap.delete(CancelOrderInfo.OrderId)
        CancelOrderInfo.Scene.visible = false
        RemoveHasOrderSceneMap(CancelOrderInfo.OrderId)
    }else{
        TipMessage.text = aMsg.msg
    }
}

function AddHasOrderSceneMap(aId){
    if(aId == 1){
        HasOrderScneMap.set(gameBottomGreeScene,1)
        HasOrderScneUseMap.set(gameBottomGreeScene,1)
    }
    if(aId == 2){
        HasOrderScneMap.set(gameBottomRedScene,2)
        HasOrderScneUseMap.set(gameBottomRedScene,2)
    }
    if(aId == 3){
        HasOrderScneMap.set(gameBottomPurScene,3)
        HasOrderScneUseMap.set(gameBottomPurScene,3)
    }
    if(aId == 4){
        HasOrderScneMap.set(gameBottomBlueScene,4)
        HasOrderScneUseMap.set(gameBottomBlueScene,4)
    }
    if(aId == 5){
        HasOrderScneMap.set(gameBottomYellowScene,5)
        HasOrderScneUseMap.set(gameBottomYellowScene,5)
    }
}

function RemoveHasOrderSceneMap(aId){
    if(aId == 1){
        HasOrderScneMap.delete(gameBottomGreeScene)
        HasOrderScneUseMap.delete(gameBottomGreeScene)
    }
    if(aId == 2){
        HasOrderScneMap.delete(gameBottomRedScene)
        HasOrderScneUseMap.delete(gameBottomRedScene)
    }
    if(aId == 3){
        HasOrderScneMap.delete(gameBottomPurScene)
        HasOrderScneUseMap.delete(gameBottomPurScene)
    }
    if(aId == 4){
        HasOrderScneMap.delete(gameBottomBlueScene)
        HasOrderScneUseMap.delete(gameBottomBlueScene)
    }
    if(aId == 5){
        HasOrderScneMap.delete(gameBottomYellowScene)
        HasOrderScneUseMap.delete(gameBottomYellowScene)
    }
}


//语音播报
function receiveBroadcast(aMsg){
   QiPaoMessage.removeChildren()
   let info = aMsg.data.msg
   let relaInfo = ""
   if (info.length >= 40){
       let all = info.substring(0, 40)
       
       let index1 = all.indexOf("{")
       if (index1 != -1){
            let index2 = all.lastIndexOf("}")
            let qian = all.substring(0,index1)
            let hou  = all.substring(index2 + 1)
            let num =  all.substring(index1 + 2,index2- 1)
            testSp = u.sprite(gPack["sb_"+num+".png"]);
            testSp.scale.set(0.5)
            testSp.anchor.set(0.5)
            testSp.x = 9.3 *index1;
            testSp.y = 14;
            //  backQipao.visible = false
            QiPaoMessage.addChild(testSp);
            let last = info.substring(40)
            relaInfo = qian+"    "+hou+"\n"+last
       }else
       {
        let last = info.substring(40)
        relaInfo = all+"\n"+last
       }
   }else{
        let index1 = info.indexOf("{")
        if (index1 != -1){
            let index2 = info.lastIndexOf("}")
            let qian = info.substring(0,index1)
            let hou  = info.substring(index2 + 1)
            let num =  info.substring(index1 + 2,index2- 1)
            testSp = u.sprite(gPack["sb_"+num+".png"]);
            testSp.scale.set(0.5)
            testSp.anchor.set(0.5)
            testSp.x = 14 *index1;
            testSp.y = 14;
            QiPaoMessage.addChild(testSp);
            relaInfo = qian+"    "+hou
        }else{
            relaInfo = info
        }
   }
    QiPaoMessage.text = relaInfo
    GameQiPaoScene.visible = true
   // 
     if(aMsg.data.play){
        //播语音
        startAudio()
        zhuchiRen.visible = false
        speakImg.visible = true
    } else{
        speakImg.visible = false
        zhuchiRen.visible = true
    }  
    let timeLimit = 4
    let localTimer = setInterval(function(){
        timeLimit -= 1
        if (timeLimit <= 0){
            GameQiPaoScene.visible = false
            if(aMsg.data.play){
                zhuchiRen.visible = true
                speakImg.visible = false
            }
            clearInterval(localTimer)
        }
      },1000)
}

//游戏进度
function receiveGameUpdate(aMsg){
    clearInterval(updateTimer)
    var data = aMsg.data;
    SpecialStone = data.result.special_id
    WinStone = {MarkId:data.result.win.mark_id,Times:data.result.win.times}
    var resultArr = data.result.result
    for(let i= 1;i<resultArr.length;i++){
        ResultInfoArr.push({MarkId:resultArr[i].mark_id,Times:resultArr[i].times})
    }
    curRunTime = Number(data.run_time)
    limitTime = data.run_time
    ////console.log("收到进度："+curRunTime+" 当前："+getNowFormatDate())
    GameIsStart = true
    curAllRunNum = data.result.result.length - 1
    TipMessage.text = "总轮数"+curAllRunNum
    receiveUpdateTag = true
    StartGameView()
}

 
//抽奖结果
function receiveGameLottery(aMsg){
    var data=aMsg.data;
    SpecialStone = data.special_id
    WinStone = {MarkId:data.win.mark_id,Times:data.win.times}
    var resultArr = data.result
    ResultInfoArr =[]
    for(let i= 1;i<resultArr.length;i++){
        ResultInfoArr.push({MarkId:resultArr[i].mark_id,Times:resultArr[i].times})
    }
    curRunTime = 15
    limitTime = 15
    ////console.log("收到结果："+curRunTime+" 当前："+getNowFormatDate())
    GameIsStart = true
    curAllRunNum = data.result.length - 1
    TipMessage.text = "总轮数"+curAllRunNum
}

//游戏参数
function receiveGameInfo(aMsg){
    var data= aMsg.data;
    var wheel = data.wheel
    //第1轮数据
    var one = wheel.one
    let arrone = []
    for(let i = 0;i < one.length;i++){
        let obj = new Object();
        obj.Key = one[i].type
        obj.Value = one[i].value
        arrone.push(obj)
    }
    gemstoneMap.set(1,arrone)
    //第2轮数据
    var two = wheel.tow
    let arrtwo = []
    for (let i = 0;i < two.length;i++){
        let obj = new Object();
        obj.Key = two[i].type
        obj.Value = two[i].value
        arrtwo.push(obj)
    }
    gemstoneMap.set(2,arrtwo)

     //第3轮数据
     var three = wheel.three
     let arrthree = []
     for (let i = 0;i < three.length;i++){
        let obj = new Object();
        obj.Key = three[i].type
        obj.Value = three[i].value
        arrthree.push(obj)
     }
     gemstoneMap.set(3,arrthree)
     receiveGameViewTag = true
     StartGameView()
}

//游戏开始
function receiveGameStart(aMsg){
    playerMoneyInfoArr=[]
    gamePlayerMoneyTxtScene.removeChildren()
    curAllRunNum = 0
    GameIsStart = true
    IsInRoundUpdate = true
    curRunTime = 0
    receiveUpdateTag = true
    limitTag = false
    //console.log("游戏开始:"+receiveUpdateTag+" 当前"+getNowFormatDate())
    StartGameView()
}
//游戏结束
function receiveGameEnd(aMsg){
   //console.log("游戏结束"+"__"+getNowFormatDate())
   hideWinStone()
    GameIsStart = false
    IsInRoundUpdate = false
    receiveUpdateTag = false
    limitTag = false
}

//游戏胜利
function receiveGameWin(aMsg){
 //-----TODO-----待加展示结果动效
}


//创建转盘中心奖品（宝石。倍率）
function createViewCenterInfo(Round,aGameInfoArr){
   if(Round == 1){
    isCreateFirst = true
   }
   if(Round == 2){
    isCreateTwo = true
   }
   if(Round == 3){
    isCreateThree = true
   }
   pointerImg.rotation = 0
   gameCenterScene.rotation = 0
   console.log("初始化："+Round+"_Ti_"+curRunTime+" 当前"+getNowFormatDate())
   rewArrMap.clear()
   gameRewTopScene.removeChildren()
   gameTopDotScene.removeChildren()
   gameStoneCenterScene.removeChildren()
   gameGemStoneScene.scale.set(0)
   gameTimeCenterScene.removeChildren()
   gameTimesScene.scale.set(0)
   gameTimeThreeCenterScene.removeChildren()
   gameTimesThreeScene.scale.set(0)
   
    let gAngle = 360 / 30
    let gr = backB.width /2 - 90
    for( let i =0;i < 30;i++){
        let realAngle = gAngle * i +270
        let value = aGameInfoArr[i].Value
        if (aGameInfoArr[i].Key == "MARK") {
            //宝石
            let backT = u.sprite(gPack["sb_"+value+".png"]);
            backT.circular = true
            backT.anchor.set(0.5)
            backT.rotation = (gAngle * i +5.5  + 92)* Math.PI / 180;
            backT.x = posX + gr * Math.cos(realAngle * Math.PI/180); 
            backT.y = posY  + gr * Math.sin(realAngle * Math.PI/180);
            if(value == 5){
                rewArrMap.set(gAngle * i,SPECIALStone)
            }else{
                rewArrMap.set(gAngle * i,value)
            }
            if (Round == 1){
                gameStoneCenterScene.addChild(backT);
            }else if(Round == 2){
                gameTimeCenterScene.addChild(backT);
            }else{
                gameTimeThreeCenterScene.addChild(backT);
            }
        }else{
            //倍率
            times = new Text(value, timesStyle);
            times.circular = true
            times.anchor.set(0.5)
            times.rotation = (gAngle * i +5.5)* Math.PI / 180;
            times.x = posX + (gr ) * Math.cos(realAngle * Math.PI/180); 
            times.y = posY  + (gr ) * Math.sin(realAngle * Math.PI/180);
            rewArrMap.set(gAngle * i,value)
            if (Round == 1){
                gameStoneCenterScene.addChild(times);
            }else if(Round == 2){
                gameTimeCenterScene.addChild(times);
            }else if(Round == 3){
                gameTimeThreeCenterScene.addChild(times);
            }
        }
    }
    let mr = backB.width /2 - 35
    for( let i =0;i < 30;i++){
        if (aGameInfoArr[i].Key == "MARK" && aGameInfoArr[i].Value == 5 ){
            let realAngle = gAngle * i + 263
            let spName = "metal1.png"
            if(Round != 1){
                spName = "metal2.png"
            }
            let back_m = u.sprite(gPack[spName]);
            back_m.rotation = (realAngle +97) * Math.PI / 180;
            back_m.x = posX + mr * Math.cos(realAngle * Math.PI/180); 
            back_m.y = posY  + mr * Math.sin(realAngle * Math.PI/180);
            gameRewTopScene.addChild(back_m)
    
        }
    }

    let dorR = backB.width /2 - 32
    for( let i =0;i < 30;i++){
        let realAngle = gAngle * i +10.5
        let back_m = u.sprite(gPack["lamp_p.png"]);
        back_m.rotation = (realAngle +97) * Math.PI / 180;
        back_m.x = posX + dorR * Math.cos(realAngle * Math.PI/180); 
        back_m.y = posY  + dorR * Math.sin(realAngle * Math.PI/180);
        gameTopDotScene.addChild(back_m)
    }
}

//界面数据都准备完成，开始游戏
function StartGameView(){
    if (receiveGameViewTag && receiveUpdateTag && curRunTime < 47){
        loginbtn.visible = false
        blocks.visible = true
        gamePlayerMoneyScene.visible = true
        if (curAllRunNum <= 0){
            //说明还没有抽奖结果
            curAllRunNum = 1
        }
        limitTag = false
        if (curRunTime >= 15){
            dropBetBtn()
        }
       IsInRoundUpdate = true
    }
}

//游戏计时器
function startGameTimer(){
    if (!GameIsStart){
        return
    } 
    curRunTime +=1
    if(IsInRoundUpdate){
        if(curRunTime >= 0 && curRunTime < 24){
            lampBack.visible = true
            hideWinStone()
        }
        if (curRunTime < 15){
            //第一轮  游戏开始倒计时、展示所有玩家下单数据
            if (limitTag){
                message.visible = true
                message.text = 14 - curRunTime
            }else{
                limitTag = true
                resetBetBtn()
                upBetBtn()
                gemstoneArr = gemstoneMap.get(1)
                createViewCenterInfo(1,gemstoneArr)
                gameGemStoneScene.scale.set(1)
                doorTag = 1
                openDoor()
                message.visible = true
                message.text = 14 - curRunTime
            }
        }
        if (curRunTime >= 15 && curRunTime < 21){
            if(curRunTime == 15){
                limitTag = false
            }
            if(!isCreateFirst){
                gemstoneArr = gemstoneMap.get(1)
                createViewCenterInfo(1,gemstoneArr)
                gameGemStoneScene.scale.set(1)
            }
            //第一轮 特殊宝石选取 20秒特殊宝石显示
            if (limitTag){
                if (curRunTime == 20){
                    //金门外停止转动
                    backLockRounTag = false
                    stopCenterflicker()
                    //显示特殊宝石
                    createSpecialStone()
                }
            }else{
                limitTag = true
                message.visible = false
                doorTag = 1
                closeDoor()
                startCenterflicker()
                //金门外转动
                backLockRounTag = true
                let ta = 0
                let tys = setInterval(() => {
                    ta += 0.01
                    if (ta > 1){
                        ta =1
                    }
                    if(0.5 <= ta && ta <1){
                        startShake()
                    }
                    if(ta == 1){
                        endShake()
                        clearInterval(tys)
                    }
                }, 0.01);
            
            }
        }

        if (curRunTime >= 21 && curRunTime < 24){
            if(!isCreateFirst){
                gemstoneArr = gemstoneMap.get(1)
                createViewCenterInfo(1,gemstoneArr)
                gameGemStoneScene.scale.set(1)
            }
            if(curRunTime == 21){
                limitTag = false
            }
            if (limitTag){
                if(curRunTime == 22){//23
                    //结束转动
                    endRoun()
                }
            }else{
                limitTag = true
                //转盘转动
                let endAngle = refreshCanRewAngle(true,ResultInfoArr[0].MarkId,1)
                if(curAllRunNum > 1){
                    amplify()
                }
                startRoun(3,endAngle)
            }
        }
        if (curRunTime == 24 && curAllRunNum == 1){
            if(!isCreateFirst){
                gemstoneArr = gemstoneMap.get(1)
                createViewCenterInfo(1,gemstoneArr)
                gameGemStoneScene.scale.set(1)
            }
             //结束游戏，显示结果
             hideSpecialStone()
             createWinStone()
        }
        if(curAllRunNum > 1 ){
           if( curRunTime >= 24){
             lampBack.visible = false
           }
           if(curRunTime == 24){
                startRotation = false
                pointRotaTag = false
           }
            if(curRunTime >= 24 && curRunTime < 30){
                if(curRunTime == 24){
                    limitTag = false
                }
                if(curRunTime == 25){
                    reduce()
                }
                if( !isCreateTwo){
                    gemstoneArr = gemstoneMap.get(2)
                    createViewCenterInfo(2,gemstoneArr)
                    gameTimesScene.scale.set(1)
                }
                if(limitTag){

                }else{
                    limitTag = true
                    hideSpecialStone()
                    //专场动画 1轮-》2轮
                    gemstoneArr = gemstoneMap.get(2)
                    createViewCenterInfo(2,gemstoneArr)
                    let tb = 0
                    let tyb = setInterval(() => {
                        tb += 0.01
                        if (tb > 1){
                            tb =1
                        }
                        if (tb <= 1){
                            gameTimesScene.scale.set(tb)
                            gameGemStoneScene.scale.set(1 - tb)
                            
                        }
                        if(tb != 1){
                          startShake()
                        }
                        if(tb == 1){
                            endShake()
                            clearInterval(tyb)
                        }
                    }, 0.01);
                }
            }
            if(curRunTime >= 30 && curRunTime < 33){
                if( !isCreateTwo){
                    gemstoneArr = gemstoneMap.get(2)
                    createViewCenterInfo(2,gemstoneArr)
                    gameTimesScene.scale.set(1)

                }
                if(curRunTime == 30){
                    limitTag = false
                }
                if(limitTag){
                    if(curRunTime == 31){ //32
                        //结束转动
                        endRoun()
                    }
                }else{
                    limitTag = true
                    //第2轮转
                    let endAngle = 0
                    if (ResultInfoArr[1].MarkId == 5){
                        endAngle = refreshCanRewAngle(true,ResultInfoArr[1].MarkId,2)
                    }else{
                       endAngle = refreshCanRewAngle(false,ResultInfoArr[1].Times,2)
                    }
                    if(curAllRunNum == 3){
                        amplify()
                    }
                    startRoun(3,endAngle)
                }
            }   
        }

        if(curRunTime == 33 && curAllRunNum == 2){
            if( !isCreateTwo){
                gemstoneArr = gemstoneMap.get(2)
                createViewCenterInfo(2,gemstoneArr)
                gameTimesScene.scale.set(1)
            }
            //结束转动，显示结果
            createWinStone()
        } 
       
        if(curAllRunNum == 3){
            if(curRunTime >= 33){
                lampBack.visible = false
            }
            if(curRunTime >= 33 && curRunTime < 39){
                if(curRunTime == 33){
                    limitTag = false
                    startRotation = false
                    pointRotaTag = false
                }
                if(curRunTime == 34){
                    reduce()
                }
                if( !isCreateThree){
                    gemstoneArr = gemstoneMap.get(3)
                    createViewCenterInfo(3,gemstoneArr)
                    gameTimesThreeScene.scale.set(1)
                }
                if(limitTag){

                }else{
                    limitTag = true
                     //专场动画 2轮-》3轮
                    gemstoneArr = gemstoneMap.get(3)
                    createViewCenterInfo(3,gemstoneArr)
                    let tc = 0
                    let tyc = setInterval(() => {
                        tc += 0.01
                        if (tc > 1){
                            tc =1
                        }
                        if (tc <= 1){
                            gameTimesThreeScene.scale.set(tc)
                            gameTimesScene.scale.set(1 - tc)
                        }
                        if( tc!= 1){
                            startShake()
                          }
                        if(tc == 1){
                            endShake()
                            clearInterval(tyc)
                        }
                    }, 0.01);
                    doorTag = 2
                    openDoor()
                }
            }
            if(curRunTime >= 39 && curRunTime < 42){
                if( !isCreateThree){
                    gemstoneArr = gemstoneMap.get(3)
                    createViewCenterInfo(3,gemstoneArr)
                    gameTimesThreeScene.scale.set(1)
                }
                if(curRunTime == 39){
                    limitTag = false
                    doorTag = 2
                    hideThief()
                    closeDoor()
                    
                }
                if(limitTag){
                    if(curRunTime == 40){ //41
                        //结束转动
                        endRoun()
                    }
                }else{
                    limitTag = true
                    //转3轮
                    let angle = refreshCanRewAngle(false,ResultInfoArr[2].Times,3)
                    startRoun(3,angle)
                }
            }
            if(curRunTime >= 42){
                if( !isCreateThree){
                    gemstoneArr = gemstoneMap.get(3)
                    createViewCenterInfo(3,gemstoneArr)
                    gameTimesThreeScene.scale.set(1)
                }
                if(curRunTime == 42){
                    limitTag = false
                }
                if(limitTag){
                   
                }else{
                    limitTag = true
                    //结束转动，显示结果
                    createWinStone()
                }
            }
        }
    }
}

//获取某个可获奖的角度
function refreshCanRewAngle(isStone,aRew,round){
    if(isStone && aRew == 5){
        aRew = SPECIALStone
    }
    let maxAng = -1
    for(let[key,value] of rewArrMap){
        if (value == aRew){
            if(maxAng == -1){
                maxAng = key
            }
            if (key < maxAng){
                maxAng = key
            }
        }
    }
    return maxAng
}

function startShake(){
    centerOutScene.x = posX +Math.random() * 4
    centerOutScene.y = posY + Math.random() * 4
}

function endShake(){
    centerOutScene.x = posX 
    centerOutScene.y = posY
}

//控制器按钮下降
function dropBetBtn(){
    if(isHasDrop){
        return
    }
    ////console.log("下降")
    isHasDrop = true
    let t = 1
    pVale = 400
    let isDropAll = true
    dropMove(betScene, betScenePosY + pVale)
    if(HasOrderScneUseMap.get(gameBottomBlueScene)){
          
    }else{
        dropMove(gameBottomBlueScene, blueScenePosY + pVale)
    }
    if(HasOrderScneUseMap.get(gameBottomGreeScene)){
      
    }else{
        dropMove(gameBottomGreeScene, greenScenePosY + pVale)
        isDropAll = false
    }
    if(HasOrderScneUseMap.get(gameBottomYellowScene)){
      
    }else{
        dropMove(gameBottomYellowScene, yellowScenePosY + pVale)
        isDropAll = false
    }
    if(HasOrderScneUseMap.get(gameBottomRedScene)){
      
    }else{
        dropMove(gameBottomRedScene, redScenePosY + pVale)
        isDropAll = false
    }
    if(HasOrderScneUseMap.get(gameBottomPurScene)){
       
    }else{
        dropMove(gameBottomPurScene, purScenePosY + pVale)
        isDropAll = false
    }
    if(isDropAll){
        dropMove(gameBottomBlueScene, blueScenePosY + pVale)
        dropMove(gameBottomGreeScene, greenScenePosY + pVale)
        dropMove(gameBottomYellowScene, yellowScenePosY + pVale)
        dropMove(gameBottomRedScene, redScenePosY + pVale)
        dropMove(gameBottomPurScene, purScenePosY + pVale)
    }
}

function dropMove(aScene,aTarget){
    TweenMax.to(aScene, 0.5, {
        y: aTarget,
        ease:  Power2.easeOut
    });
}

//控制器按钮上升
function upBetBtn(){
    if(!isHasDrop){
        return
    }
    let t = 1
    let isUpAll = true
    upMove(betScene, betScenePosY )
    if(HasOrderScneUseMap.get(gameBottomBlueScene)){
          
    }else{
        upMove(gameBottomBlueScene, blueScenePosY )
        isUpAll = false
    }
    if(HasOrderScneUseMap.get(gameBottomGreeScene)){
       
    }else{
        upMove(gameBottomGreeScene, greenScenePosY)
        isUpAll = false
    }
    if(HasOrderScneUseMap.get(gameBottomYellowScene)){
        
    }else{
        upMove(gameBottomYellowScene, yellowScenePosY)
        isUpAll = false
    }
    if(HasOrderScneUseMap.get(gameBottomRedScene)){
       
    }else{
        upMove(gameBottomRedScene, redScenePosY)
        isUpAll = false
    }
    if(HasOrderScneUseMap.get(gameBottomPurScene)){
       
    }else{
        upMove(gameBottomPurScene, purScenePosY )
        isUpAll = false
    }
    if(isUpAll){
        upMove(gameBottomBlueScene, blueScenePosY )
        upMove(gameBottomGreeScene, greenScenePosY)
        upMove(gameBottomYellowScene, yellowScenePosY)
        upMove(gameBottomRedScene, redScenePosY)
        upMove(gameBottomPurScene, purScenePosY )
    }
    isHasDrop = false
}

function upMove(aScene,aPos){
    TweenMax.to(aScene, 0.5, {
        y: aPos ,
        ease: Linear.easeNone // 线性缓动函数，使缩放动画匀速
    });
}
function resetBetBtn(){
    blueNormalTxt.visible = true
    greenNormalTxt.visible = true
	yellowNormalTxt.visible = true
	RedNormalTxt.visible = true
	PurNormalTxt.visible = true
    BlueMoneyScene.visible = false
    GreenMoneyScene.visible = false
    YellowMoneyScene.visible = false
    RedMoneyScene.visible = false
    PurMoneyScene.visible = false
}

//获取当前日期函数
function getNowFormatDate() {
    let date = new Date(),
      obj = {
        year: date.getFullYear(), //获取完整的年份(4位)
        month: date.getMonth() + 1, //获取当前月份(0-11,0代表1月)
        strDate: date.getDate(), // 获取当前日(1-31)
        week: '星期' + '日一二三四五六'.charAt(date.getDay()), //获取当前星期几(0 ~ 6,0代表星期天)
        hour: date.getHours(), //获取当前小时(0 ~ 23)
        minute: date.getMinutes(), //获取当前分钟(0 ~ 59)
        second: date.getSeconds() //获取当前秒数(0 ~ 59)
      }
    Object.keys(obj).forEach(key => {
      if (obj[key] < 10) obj[key] = `0${obj[key]}`
    })
    return `${obj.year}年${obj.month}月${obj.strDate}日${obj.week} ${obj.hour}:${obj.minute}:${obj.second}`
  }