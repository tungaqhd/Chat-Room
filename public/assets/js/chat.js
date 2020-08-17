const socket = io()

socket.on('updateOnline', (totalOnline) => {
    $('#totalOnline').text(totalOnline);
});

socket.on('receiveMessage', (user, messagge, timestamp) => {
    $('#messages').append(`
    <div class="message">
    <div class="row">
      <div class="col-md-1 avatar-box">
        <img
          src="https://via.placeholder.com/300x250"
          class="avatar"
        />
      </div>
      <div class="col-md-9">
        <a class="username" href="/user/tungaqhd">tungaqhd</a>
        <span class="message-content">
          ${messagge}
        </span>
      </div>
      <div class="col-md-2">
        <p class="date">1:25 am</p>
      </div>
    </div>
  </div>
    `);
});

$('#send').click(() => {
    const message = $('#message').val();
    $('#message').val('');
    socket.emit('sendMessage', 'tungaqhd', message)
})