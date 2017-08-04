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

    //console.log("N:"+ProcessedWxMessageArray[0][0]+",M:"+ProcessedWxMessageArray[0][1]);
    var MessageTransfer = "N:"+ProcessedWxMessageArray[0][0]+",M:"+ProcessedWxMessageArray[0][1];
    document.getElementById("chat_textarea").value = MessageTransfer;
    document.getElementById("send_chat_btn").click();
}


//chrome.storage.onChanged.addListener(function(){checkStorage();});
chrome.extension.sendMessage({initialcomplete:"QQInitialComplete"},function(){console.log("Send qq tab id to background.")});
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.QQRetrieveMessage)
        {
            WxMessageUnbox(request.QQRetrieveMessage);
        }
    });