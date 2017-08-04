chrome.browserAction.onClicked.addListener
(function(tab)
{
    /**insert jq for isolated world**/

    chrome.tabs.executeScript
    ({
        file: 'jquery-2.1.4.js'

    });
    chrome.tabs.executeScript
    ({
        file: 'wx.js'

    });
});

chrome.extension.onMessage.addListener
(function(request, sender, sendResponse)
{
    if(request.initialcomplete == "WxInitialComplete")
    {
        chrome.tabs.getSelected
        (null, function(tabs)
        {
            window.WxTabid = tabs.id;
        });
        chrome.browserAction.setIcon({
            path : {
                "48": "icon.jpg",
                "128": "icon.jpg"
            }
        });
        console.log("change icon complete!");
    }

    if(request.initialcomplete == "QQInitialComplete")
    {
        chrome.tabs.getSelected(null,function(tabs){window.QQTabid = tabs.id;});
    }

});
chrome.runtime.onConnect.addListener
(function(port)
{
    //console.log(port.name == "WxConnectToBg");
    port.onMessage.addListener(function(msg)
    {
        if(msg.WxTransferMessage)
        {
            chrome.tabs.sendMessage(window.QQTabid,{QQRetrieveMessage:msg.WxTransferMessage},function(){
                //console.log("Bg Send message to qq module.");
            });
        }
    });
});