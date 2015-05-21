var ports = [];

listenForMessage = function (event, port) {
	var data = event.data;
	if (data === "closing") {
		var index = ports.indexOf( port );
		ports.splice(index, 1 );
		data = "" +index + " left";
	}
	
	var portsLength = ports.length;
	for (var i = 0; i < portsLength; i++) {
		ports[i].postMessage(data);
	}
}

onconnect = function(event) {

    var port = event.ports[0];
    ports.push(port);
    port.start();

    port.addEventListener("message", function(event) { listenForMessage(event, port); } );
}
