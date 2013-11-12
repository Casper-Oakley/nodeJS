	var tag = document.createElement('script');
	var socket = io.connect(window.location.hostname, {'force new connection': true});
	tag.src = "https://www.youtube.com/iframe_api";
	var firstID;
	socket.on('message', function (data) {
		firstID=data.message;
	});
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag,firstScriptTag);
	var player;
	function onYouTubeIframeAPIReady(){
		console.log(firstID);
		player = new YT.Player('player', {
			height:'390',
			width:'640',
			Id: firstID,
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange,
				'onError': onPlayError
			}
		});
	}
	function onPlayerReady(event){
		event.target.playVideo();
	}
function onPlayerStateChange(event) {
	}
	function onPlayError(event){
		player.loadVideoById(firstID);
	}
	function stopVideo() {
		player.stopVideo();
	}

window.onload = function() {

	var field = document.getElementById("field");
	var sendButton = document.getElementById("send");

	socket.on('message', function (data) {
		console.log(data.message);
		player.loadVideoById(data.message);
	});
	
	sendButton.onclick = function() {
		var text = field.value;
		socket.emit('send', { message: text });
	};

}
