function GetYourQQNickname()
{
    var SetNickName = document.getElementById("GetNickName").value;
    chrome.storage.local.set({QQNickName:SetNickName},function () {
        console.log("Set QQ Nickname as "+SetNickName);
        window.location.reload();
    })
}
function checkQQNickNameStorage()
{
    chrome.storage.local.get("QQNickName",function (result)
    {
        if(!result.QQNickName)
        {
            var s = document.createElement("p");
            s.innerText = "看起来好像并没有存到Q名的样子，估计要赶紧存一个.";
            document.getElementsByTagName("body")[0].appendChild(s);
        }
        else{
            var s = document.createElement("p");
            s.innerText = "Q名是:"+result.QQNickName;
            document.getElementsByTagName("body")[0].appendChild(s);
        }
    })
}
checkQQNickNameStorage();
document.getElementById("ok").onclick = GetYourQQNickname;
