async function fetchJSON(api_uri) {
	let response = await fetch(api_uri);
	
	if (!response.ok) {
	    throw new Error(`HTTP error! status: ${response.status}`);
	}
	
	let myJSON = await response.json();
	
	return await myJSON;
}

function displaySwitch(_elementId, _displayStyle){
    document.getElementById(_elementId).style.display = 
		document.getElementById(_elementId).style.display == 'none' ? _displayStyle : 'none';
}