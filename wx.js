/**
 * Created by Nemesiss on 2017/7/31.
 */
//$(".main_inner .panel .nav_view .chat_list .scrollbar-dynamic .ng-scope .ng-scope .info .msg")[0].innerText;
//$(".main_inner .ng-scope #chatArea .box_hd .title_wrap .poi .title_name").html();
if(window.location == "https://wx2.qq.com/")
{
    //initial chatlist


        chrome.extension.sendMessage({initialcomplete:"WxInitialComplete"}, function(){
            console.log("Start change icon");
            console.log("Send Wx tab id to Background");

        });
       chrome.extension.onMessage.addListener(
        function(request) {

            if(request.TransferQQReplyToWx)
            {
                UnboxReplyMessage(request.TransferQQReplyToWx);
            }
        });


    function checkNewMessage()
    {
        var newmessageconterdom = $(".main_inner .panel .nav_view .chat_list .scrollbar-dynamic .ng-scope .chat_item .avatar .web_wechat_reddot_middle");
        if (newmessageconterdom.length > 0)
        {
            newMessageHandler(newmessageconterdom);
        }
    }

    function newMessageHandler(NewMessageCounter)
    {
        //遍历窗口，遇到多的可能还要click
        var bindNameAndMessage = new Array();
        var NameArray = new Array();
        var MessageArray = new Array();
        for (j = 0, length = NewMessageCounter.length; j < length; j++)
        {
            if (NewMessageCounter[j].innerText >= 1)
            {
                //Handle multi message
                NameArray[j] = $(".main_inner .panel .nav_view .chat_list .scrollbar-dynamic .ng-scope .chat_item .info .nickname .nickname_text")[j].innerText;
                MessageArray[j] = $(".main_inner .panel .nav_view .chat_list .scrollbar-dynamic .ng-scope .ng-scope .info .msg")[j].innerText;
                $(".main_inner .panel .nav_view .chat_list .scrollbar-dynamic .ng-scope .chat_item .info .msg")[j].click();
                $(".main_inner .panel .nav_view .chat_list .scrollbar-dynamic .ng-scope .chat_item .info")[(document.getElementsByClassName("chat_item").length-1)].click();
                bindNameAndMessage[j] = [NameArray[j],MessageArray[j]];
                //send message to qq module
                window.port.postMessage({WxTransferMessage:bindNameAndMessage});
            }
            else
            {
                console.log("Message catch error.");//throw error
            }
        }


    }
    function UnboxReplyMessage(ReplyMessageArray)
    {
        var ReplyName = ReplyMessageArray[0];
        var ReplyMessage = ReplyMessageArray[1];
        for (var i = 0;i < document.getElementsByClassName("chat_item").length;i++)
        {
            if (ReplyName == $(".chat_list .ng-scope .ng-scope .chat_item .info .nickname")[i].innerText)
            {
                $(".chat_list .ng-scope .ng-scope .chat_item .info .nickname")[i].click();
                //再一次深刻认识Content_script和页面正常Script的姿势水平区别  以及Angular的恶意。
                fireCustomEvent(ReplyMessage);
                $(".chat_list .ng-scope .ng-scope .chat_item .info .nickname")[document.getElementsByClassName("chat_item").length - 1].click()
            }
        }
        console.log(ReplyMessage);
    }

    function injectScript(file, node)
    {
        var th = document.getElementsByTagName(node)[0];
        var s = document.createElement('script');
        s.setAttribute('type', 'text/javascript');
        s.setAttribute('src', file);
        th.appendChild(s);
    }
    var customEvent = document.createEvent('Event');
    customEvent.initEvent('myCustomEvent', true, true);
    function fireCustomEvent(data)
    {
        EditArea = document.getElementById('editArea');
        EditArea.innerText = data;
        EditArea.dispatchEvent(customEvent);
    }
    injectScript(chrome.extension.getURL('qq.js'),'body');
    console.log("Starting");
    setInterval(function () {
        checkNewMessage();
    },500);
    window.port = chrome.extension.connect({name: "WxConnectToBg"});


}
else
{
    console.log("wx.js:Not in wx page,disable main function");
}

