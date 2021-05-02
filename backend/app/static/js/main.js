function getResp()
{
	url = document.getElementById('urlField').value
	reqURL = "/api?url=" + url
	httpGet(reqURL)
}

function httpGet(theUrl)
{
	var source = new EventSource(theUrl);

	source.onmessage = function(event) {
		document.getElementById("output").innerHTML += event.data
		console.log("A",event.data)
	}
}
