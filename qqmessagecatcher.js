
function checkStorage()
{
    chrome.storage.local.get('MessagePack', function(result)
    {
        if (result)
        {
            var MessageArray = result.MessagePack;
            if(document.getElementById("chat_textarea"))
            {
                wxMessageHandler(MessageArray);
            }
            else
            {
                for (var i=0;i<document.getElementsByClassName("member_nick").length;i++)
                {
                    if (document.getElementsByClassName("member_nick")[i].innerText == "Irony.Nemesiss")
                    {
                        document.getElementsByClassName("member_nick")[i].click();
                        wxMessageHandler(MessageArray);
                    }
                }

            }

        }
    });
}

function wxMessageHandler(wxMessageArray)
{

      console.log("N:"+wxMessageArray[0][0]+",M:"+wxMessageArray[0][1]);
      var MessageTransfer = "N:"+wxMessageArray[0][0]+",M:"+wxMessageArray[0][1];
      document.getElementById("chat_textarea").value = MessageTransfer;
      document.getElementById("send_chat_btn").click();
}


chrome.storage.onChanged.addListener(function(){checkStorage();});