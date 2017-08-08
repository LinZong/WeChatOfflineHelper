
document.getElementById('editArea').addEventListener('myCustomEvent',
    function() {
    angular.element('pre:last').scope().editAreaCtn = document.getElementById("editArea").innerText;
    angular.element('pre:last').scope().sendTextMessage();
    document.getElementById("editArea").innerText = "";
});