var ports = [];

listenForMessage = function (event, port) {
	var portsLength = ports.length;
	for (var i = 0; i < portsLength; i++) {
		ports[i].postMessage(event.data);
	}
}

onconnect = function(event) {

    var port = event.ports[0];
    ports.push(port);
    port.start();

    port.addEventListener("message", function(event) { listenForMessage(event, port); } );
}
