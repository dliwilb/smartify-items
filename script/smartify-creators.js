const params = new Proxy(new URLSearchParams(window.location.search), {
	get: (searchParams, prop) => searchParams.get(prop),
});

if (params["a"] !== null){
	document.getElementById('creator-address').value = params["a"];
    onShowCreated();
}


function onShowCreated() {
    const creatorAddress = document.getElementById('creator-address').value;
    if ( ethers.utils.isAddress(creatorAddress) ){
        document.getElementById('div-frens-created').innerHTML = 'Loading...';
        showCreated(creatorAddress);
    } else {
        document.getElementById('div-frens-created').innerHTML = 'Please enter a valid creator address.';
        return 0;
    }
}

async function showCreated(createdBy) {
    // const provider = ethers.getDefaultProvider(4);
    const provider = new ethers.providers.JsonRpcProvider('https://rinkeby.infura.io/v3/2c1d58028d4343dbb2680897c28b8bc2');

    const nftContractAddress = '0x69F511EAca22eD5c5f48ba3d5D3D0442340948c9'; // v2.2
    const nftContract = new ethers.Contract(nftContractAddress, frensAbi, provider);

    const eventFilter = nftContract.filters.tokenCreated(null, null, createdBy);
    const events = await nftContract.queryFilter(eventFilter);
    // console.log(events);

    const createdByShort = createdBy.substring(0, 6) + '...' + createdBy.substring(createdBy.length - 4);

    document.getElementById('div-frens-created').innerHTML = 'frens&nbsp;&nbsp;made by&nbsp;&nbsp;' + createdByShort;

    let previousTokenURI = '';
    let isRepeating = false;

    let htmlToAdd = '';
    for (let i = events.length-1; i >= 0; i--) {
        const newItemId = events[i].args[0];
        let tokenURI = events[i].args[1].trim();

        if (tokenURI !== previousTokenURI) {
            isRepeating = false;

            if (i < events.length-1){
                htmlToAdd += '</div>';
            }

            previousTokenURI = tokenURI;

            const foundIPFSinURI = tokenURI.match(/ipfs:\/\/(\w+)/);
            if (foundIPFSinURI[1] != ''){
                tokenURI = 'https://ipfs.io/ipfs/' + foundIPFSinURI[1];
            }

            let nftJSON = await fetchJSON(tokenURI);

            const foundIPFSinJSONImage = nftJSON.image.match(/ipfs:\/\/(\w+)/);
            if (foundIPFSinJSONImage[1] != ''){
                nftJSON.image = 'https://ipfs.io/ipfs/' + foundIPFSinJSONImage[1];
            }

            htmlToAdd += 
                `
                <div class="nft-item">
                    <img class="nft-image" src="${nftJSON.image}">
                    <div class="nft-token-info">
                        # ${newItemId} : "${nftJSON.name}"
                    </div><!-- loc#a -->
                    <div class="nft-token-info" style="white-space: pre">${nftJSON.description}</div>
                `;
            

        } else {
            if (isRepeating == true){
                htmlToAdd += 
                `
                <span class="nft-token-info">#${newItemId} </span>&nbsp;
                `;
            } else {
                htmlToAdd += 
                `
                <span class="nft-token-info">Multiple Editions...&nbsp;&nbsp;also as&nbsp;&nbsp;&nbsp;#${newItemId} </span>&nbsp;
                `;
                isRepeating = true;
            }

        }

    }

    htmlToAdd += '</div><!-- loc#3 -->';
    isRepeating = false;
    
    document.getElementById('div-frens-created').innerHTML += htmlToAdd;


}


async function fetchJSON(api_uri) {
	let response = await fetch(api_uri);
	
	if (!response.ok) {
	    throw new Error(`HTTP error! status: ${response.status}`);
	}
	
	let myJSON = await response.json();
	
	return await myJSON;
}
