function messageHandler(msg) {
	if (msg.origin === "http://disqus.loc" || msg.origin === 'http://webrender.github.io')
		var data = msg.data.split(':');
		document.querySelector('#comment_iframe_'+data[0]).height=data[1];
}

window.addEventListener("message", messageHandler, false);
