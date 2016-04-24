var socket = io();

var connectionCount = document.getElementById('connection-count');

socket.on('usersConnected', function (count) {
  connectionCount.innerText = 'Connected Users:' + count;
});

var statusMessage = document.getElementById('status-message');

socket.on('statusMessage', function (message) {
  statusMessage.innerText = message;
});

var results = document.getElementById('results');
var yourVote = document.getElementById('your-vote');
var visualResults = document.getElementById('visual-results');

socket.on('voteCount', function (message) {
  var votes = message.votes;
  resultText = "";
for (var key in votes) {
if (votes.hasOwnProperty(key)) {
  resultText = `${resultText} ${key}: ${votes[key]}`;
  }
}
results.innerText = resultText;
yourVote.innerText = `Your vote has been cast for ${message.yourVote}`;
});


var buttons = document.querySelectorAll('#choices button');

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    socket.send('voteCast', this.innerText);
  });
}
