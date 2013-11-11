window.onload = function() {

	//var socket = io.connect('http://localhost:5000');
	var socket = io.connect('https://shrouded-harbor-7618.herokuapp.com:5000');
	var field = document.getElementById("field");
	var sendButton = document.getElementById("send");

	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag,firstScriptTag);
	var player;
	function onYouTubeIframeAPIReady(){
		console.log("ASIFUHADIUFHAEIDFB");
		player = new YT.Player('player', {
			height:'390',
			width:'640',
			videoID: 'M7lc1UVf-VE',
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange
			}
		});
	}
	function stopVideo() {
		player.stopVideo();
	}
	function onPlayerReady(event){
		event.target.playVideo();
	}
function onPlayerStateChange(event) {
	}
	socket.on('message', function (data) {
		console.log(data);
	});
	
	sendButton.onclick = function() {
		var text = field.value;
		socket.emit('send', { message: text });
	};

}
