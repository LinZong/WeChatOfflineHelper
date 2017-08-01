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
    /**chrome.tabs.executeScript
    ({
        file: 'qqmessagecatcher.js'

    });**/
});

chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
    if(request.initialcomplete == "ok") {
        chrome.browserAction.setIcon({
            path : {
                "48": "icon.jpg",
                "128": "icon.jpg"
            }
        });
        console.log("change icon complete!");
    }

});