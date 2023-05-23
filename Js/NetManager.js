
let url = "wss://crash.kingbet.in/wss";  //请求的后端地址

let websocket = null;//全局WebSocket对象
let lockReconnect = false; // 网络断开重连
let wsCreateHandler = null; // 创建连接
function createWebSocket(fn){
  try{
    websocket = new WebSocket(`${url}?${getToken()}/webSocketServer`);
  }catch {
    reconnect();
    return;
  }
 
  websocket.onopen = function(event) {
   // websocket.send("连接成功");
    console.log("服务已连接")
    logIn()
  };
 
  websocket.onmessage = function(event){
    var data=JSON.parse(event.data);
    if (data.action != undefined){
     // console.log("返回数据："+data.action)
      var event= new Event(data.action)
      event.data = data
      document.dispatchEvent(event)
    }else if(data.channel != undefined){
      //console.log("返回数据："+data.channel)
      var event= new Event(data.channel)
      event.data = data
      document.dispatchEvent(event)
    }
  };
  websocket.onclose = function(event) {
    console.log("服务连接关闭")
  };
  websocket.onerror = function(event) {
 
    console.log(event,"连接出错")
  };
}
/**
 *  异常处理
 * 处理可以检测到的异常，并尝试重新连接
 */
function reconnect() {
  if (lockReconnect) {
    return;
  }
  console.log("reconnect");
  lockReconnect = true;
  // 没链接上会一直连接，设置延迟，避免过多请求
  wsCreateHandler && clearTimeout(wsCreateHandler);
  wsCreateHandler = setTimeout(function() {
    console.log("-----websoket异常-------");
    createWebSocket();
    lockReconnect = false;
  }, 1000);
}
function websocketClose() {
  console.log('执行了关闭')
  websocket.close();    //手动关闭websocket
}

function getToken(){
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsInV1aWQiOiIyMDIyMTIzMDE2NDE0MDhjNjllIiwidXNlcl9uYW1lIjoiMTQ4MTQyOTAwODNAcXEuY29tIiwicGFyZW50X2lkIjoyNCwiZGVhbGVyX3BpZCI6MSwiZGVhbGVyX2lkIjoyLCJpc19maXJzdF9sb2dpbiI6ZmFsc2UsImF1dGgiOnRydWUsImlhdCI6MTY4Mzg3MDc0NCwiZXhwIjoxNjg1MTY2NzQ0fQ==.a41f094c484b51082cb3351311da805c"
}

function sendMessage(aMsg){
  console.log("SendMsg :"+aMsg)
  websocket.send(aMsg)
}

//登录
function logIn(){
    let mas = JSON.stringify(
        {
            "action": "USER_LOGIN",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsInV1aWQiOiIyMDIyMTIzMDE2NDE0MDhjNjllIiwidXNlcl9uYW1lIjoiMTQ4MTQyOTAwODNAcXEuY29tIiwicGFyZW50X2lkIjoyNCwiZGVhbGVyX3BpZCI6MSwiZGVhbGVyX2lkIjoyLCJpc19maXJzdF9sb2dpbiI6ZmFsc2UsImF1dGgiOnRydWUsImlhdCI6MTY4Mzg3MDc0NCwiZXhwIjoxNjg1MTY2NzQ0fQ==.a41f094c484b51082cb3351311da805c"
        }
    )
    sendMessage(mas)
}

//打开游戏推送
function startNotify(){
    let mas = JSON.stringify(
        {
            "action": "GAME_OPEN",
          } 
    )
    sendMessage(mas)
}

//关闭游戏推送
function closeNotify(){
  let mas = JSON.stringify(
      {
          "action": "GAME_CLOSE",
        } 
  )
  sendMessage(mas)
}

//下注
// 1=>'绿宝石',
// 2=>'红宝石',
// 3=>'黄宝石',
// 4=>'蓝宝石',
// 5=>'窃贼',
function tryBetting(markId,moneyType,amount){
  let mas = JSON.stringify(
      {
          "action": "BET",
          "mark_id": markId,
          "currency_type": moneyType, //1 系统货币 2 信用币
          "amount": amount
        } 
  )
  sendMessage(mas)
}

//取消下注
function cancelBetting(markId){
  let mas = JSON.stringify(
      {
          "action": "CANCEL",
          "bet_id": markId,
      } 
  )
  sendMessage(mas)
}

//获取游戏进度
function getGameProgress(){
  let mas = JSON.stringify(
      {
          "action": "UPDATE",
      } 
  )
  sendMessage(mas)
}

//获取当前下注记录
function getBetList(isSelf){
  let mas = JSON.stringify(
      {
        "action": "BET_LIST",
        "is_self": isSelf,       //bool: true查询自己的下注记录 false查询所有记录 默认false 
        "order_by": "bet",        //enum： bet 下注金额， id 下注时间 默认值 bet
        "direction": "desc",  //enum： asc,desc 默认值 desc
      } 
  )
  sendMessage(mas)
}

//获取游戏参数
function getGameInfo(){
  let mas = JSON.stringify(
      {
        "action": "CONFIG",
      } 
  )
  sendMessage(mas)
}