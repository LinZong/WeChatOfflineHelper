function WxMessageUnbox(WxMessageArray)
{
    if (WxMessageArray)
    {
        var UnboxedMessageArray = WxMessageArray;
        if(document.getElementById("chat_textarea"))
        {
            wxMessageHandler(UnboxedMessageArray);
        }
        else
        {
            for (var i=0;i<document.getElementsByClassName("member_nick").length;i++)
            {
                if (document.getElementsByClassName("member_nick")[i].innerText == "Irony.Nemesiss")
                {
                    document.getElementsByClassName("member_nick")[i].click();
                    wxMessageHandler(UnboxedMessageArray);
                }
            }

        }

    }
}

function wxMessageHandler(ProcessedWxMessageArray)
{
    console.log("N:"+ProcessedWxMessageArray[0][0]+",M:"+ProcessedWxMessageArray[0][1]);
    var MessageTransfer = "N:"+ProcessedWxMessageArray[0][0]+",M:"+ProcessedWxMessageArray[0][1];
    document.getElementById("chat_textarea").value = MessageTransfer;
    document.getElementById("send_chat_btn").click();
    //Now prepare sth to get repeat
    window.OldReplyCounter = document.getElementsByClassName("buddy").length;//先看看Reply了多少条信息
}

//Initial some important variable
//Check New Reply

function NewMessageHandler(ExistReplyNum)
{
    var RepeatTree = document.getElementsByClassName("buddy");
    var NewRepeatNum = RepeatTree.length;
    var DivCount = NewRepeatNum - ExistReplyNum;
    var bindBox;
    for (var i = 0;i<DivCount;i++)
    {
        var RawReply = RepeatTree[ExistReplyNum+i].getElementsByClassName("chat_content")[0].innerText;
        var ReplyName = RawReply.split("#")[0];
        var ReplyMessage = RawReply.split("#")[1];
        bindBox = [ReplyName,ReplyMessage];
    }

    //然后就准备发送数据给Background吧！
    chrome.extension.sendMessage({ReplyMessagePack:bindBox,isQQReplyMessage:"true"},function () {
        console.log("Send QQ Reply to Background");

    });

    window.OldReplyCounter = document.getElementsByClassName("buddy").length;
}
window.OldReplyCounter = document.getElementsByClassName("buddy").length;
setInterval(function ()
{
if(document.getElementsByClassName("buddy").length>window.OldReplyCounter)
{
    NewMessageHandler(window.OldReplyCounter);
}


},500);

//chrome.storage.onChanged.addListener(function(){checkStorage();});
chrome.extension.sendMessage({initialcomplete:"QQInitialComplete"},function(){console.log("Send qq tab id to background.")});
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.QQRetrieveMessage)
        {
            WxMessageUnbox(request.QQRetrieveMessage);
        }
    });


