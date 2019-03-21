

var url = "ws://localhost:8080/";
var user;
var socket;
function connectToChat() {
  socket = new WebSocket(url);
  user = document.getElementById("name").value;
  socket.onmessage = function (msg) {
    var chatBox = document.getElementById("chatBox");
    var message = JSON.parse(msg.data);
    chatBox.innerHTML = "<b>" + message.user + "</b>:" + message.text + "<br>" + chatBox.innerHTML;
  };
  socket.onopen = function () {
    var message = {};
    message.user = user;
    message.text = "<b>Joined the chat</b>";
    socket.send(JSON.stringify(message));
  };
  document.getElementById("chat").setAttribute("style", "");
  document.getElementById("welcome").setAttribute("style", "display:none");
}
function sendMessage() {
  var message = {};
  message.user = user;
  message.text = document.getElementById("message").value;
  socket.send(JSON.stringify(message));
  document.getElementById("message").value = "";
}
window.onload = function () {
  document.getElementById("chat").setAttribute("style", "display:none");
}