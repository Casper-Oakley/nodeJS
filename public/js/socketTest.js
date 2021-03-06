	var host = location.origin.replace(/^http/,'ws');
	var ws = new WebSocket(host);
	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";
	var firstID;
	ws.onmessage = function (event) {
		firstID = event.data;
	}
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
	
	ws.onmessage = function (event) {
		firstID = event.data;
		console.log(firstID);
		player.loadVideoById(firstID);
	}
	sendButton.onclick = function() {
		var text = field.value;
		ws.send(text);
	};

}
