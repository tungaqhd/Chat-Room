const socket = io();

socket.on("updateOnline", (totalOnline) => {
  $("#totalOnline").text(totalOnline);
});

socket.on("receiveMessage", (username, messagge, timestamp, avatar, messageId) => {
  $("#messages").append(`
    <div id="${messageId}" class="message">
    <div class="row">
      <div class="col-md-1 avatar-box">
        <img
          src="/assets/img/avatar/${avatar}"
          class="avatar"
        />
      </div>
      <div class="col-md-9">
        <a class="username" href="/profile/${username}">${username}</a>
        <span class="message-content">
          ${messagge}
        </span>
      </div>
      <div class="col-md-2">
        <p class="date">${timestamp}</p>
      </div>
    </div>
  </div>
    `);
    $("#messages").animate({ scrollTop: $('#messages').prop("scrollHeight")}, 1000);
});

function sendMsg(e) {
  e.preventDefault();
  const message = $("#message").val();
  $("#message").val("");
  socket.emit("sendMessage", token, message);
}
$("#send").click(() => {
  const message = $("#message").val();
  $("#message").val("");
  socket.emit("sendMessage", token, message);
});
function deleteMsg(id) {
  socket.emit("deleteMsg", token, id);
}

socket.on("updateDeletedMessage", (id) => {
  $('#'+id).remove();
})