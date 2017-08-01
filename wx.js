/**
 * Created by Nemesiss on 2017/7/31.
 */
//$(".main_inner .panel .nav_view .chat_list .scrollbar-dynamic .ng-scope .ng-scope .info .msg")[0].innerText;
//$(".main_inner .ng-scope #chatArea .box_hd .title_wrap .poi .title_name").html();
if(window.location == "https://wx2.qq.com/")
{
    //initial chatlist
    var chatlist = $(".main_inner .panel .nav_view .chat_list .scrollbar-dynamic .ng-scope .chat_item .info");
    function initialNicknameList()
    {
        chrome.extension.sendMessage({initialcomplete:"ok"}, function(){
            console.log("Start change icon");
        });
        var nicknamearray = new Array();
        for (var i = 0, length = chatlist.length; i < length; i++) {
            nicknamearray[i] = chatlist[i].innerText;
        }
    }

    function checkNewMessage()
    {


        var newmessageconterdom = $(".main_inner .panel .nav_view .chat_list .scrollbar-dynamic .ng-scope .chat_item .avatar .web_wechat_reddot_middle");
        if (newmessageconterdom.length > 0)
        {
            newMessageHandler(newmessageconterdom);
        }
        else
        {
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
                $(".main_inner .panel .nav_view .chat_list .scrollbar-dynamic .ng-scope .chat_item .info")[4].click();
                bindNameAndMessage[j] = [NameArray[j],MessageArray[j]];
                //send message to qq module
                chrome.storage.local.set({"MessagePack": bindNameAndMessage},function(){console.log("Message Package Sent!");});
            }
            else
            {
                console.log("Message catch error.");//throw error
            }
        }



    }
    console.log("Starting");
    initialNicknameList(chatlist);
    setInterval(function () {
        checkNewMessage();
    },500);
}
else
{
    console.log("wx.js:Not in wx page,disable main function");
}
