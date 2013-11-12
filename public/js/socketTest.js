	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag,firstScriptTag);
	var player;
	function onYouTubeIframeAPIReady(){
		player = new YT.Player('player', {
			height:'390',
			width:'640',
			videoId: 'M7lc1UVf-VE',
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange
			}
		});
	}
	function onPlayerReady(event){
		event.target.playVideo();
	}
function onPlayerStateChange(event) {
	}
	function stopVideo() {
		player.stopVideo();
	}

window.onload = function() {

	var socket = io.connect(window.location.hostname);
	var field = document.getElementById("field");
	var sendButton = document.getElementById("send");

	socket.on('message', function (data) {
		console.log(data);
	});
	
	sendButton.onclick = function() {
		var text = field.value;
		socket.emit('send', { message: text });
	};

}
