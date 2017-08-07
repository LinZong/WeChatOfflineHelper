//Initial some important variable
/**var OldReplyCounter = 0;
//Check New Reply

function NewMessageHandler(ExistReplyNum)
{
    var RepeatTree = document.getElementsByClassName("chat_content_group");
    var NewRepeatNum = RepeatTree.length;
    var DivCount = NewRepeatNum - ExistReplyNum;

    for (var i = 0;i<DivCount;i++)
    {
        var RawReply = document.getElementsByClassName("chat_content_group")[ExistReplyNum+i].getElementsByClassName("chat_content")[0].innerText;
        var ReplyName = RawReply.split("#")[0];
        var ReplyMessage = RawReply.split("#")[1];

    }
}

setInterval(function ()
{
    if(document.getElementsByClassName("chat_content_group").length>OldReplyCounter)
    {
        //NewMessageHandler
        NewMessageHandler(OldReplyCounter);
        OldReplyCounter = document.getElementsByClassName("chat_content_group").length;
    }
},500);

嗯这些废话都他妈没用了  但是我不舍得删.

var evt = document.createEvent("UIEvent");
**/
document.getElementById('editArea').addEventListener('myCustomEvent',
    function() {
    angular.element('pre:last').scope().editAreaCtn = document.getElementById("editArea").innerText;
    angular.element('pre:last').scope().sendTextMessage();
    document.getElementById("editArea").innerText = "";
});