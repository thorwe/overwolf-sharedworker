function addMessage(message) {
	var obj = document.createElement("div");
	obj.innerText = message;
	document.querySelector('#messages').appendChild(obj);
}

var worker = new SharedWorker("shared_worker.js");
worker.port.addEventListener("message", function(event) { addMessage(event.data); }, false );
worker.port.start();

var el = document.getElementById("chatEntry");
el.addEventListener("keydown", function(evt) {
	if (evt.keyCode == 13) {
		evt.preventDefault();
		worker.port.postMessage(el.value);
		el.value = "";
	};

}, false);

// dunno of a more appropriate way yet
addEventListener( 'beforeunload', function()
{
    worker.port.postMessage( 'closing' );
});