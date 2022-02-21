const provider = new ethers.providers.JsonRpcProvider(httpsRPC);
const smartifyContract = new ethers.Contract(smartifyContractAddress, smartifyContractABI, provider);

const ipfsGatewayReplacer = 'https://ipfs.io/ipfs/';




const params = new Proxy(new URLSearchParams(window.location.search), {
	get: (searchParams, prop) => searchParams.get(prop),
});

if (params["t"] !== null){
	document.getElementById('input-token-id').value = params["t"];
    showToken();
}



async function selectRandom() {
    const totalSupply = await smartifyContract.totalSupply();
    // console.log(totalSupply);
    document.getElementById('input-token-id').value = Math.floor(Math.random() * (totalSupply - 1)) + 1;
    await showToken();
}



async function showToken() {

    console.log('Loading token info...');

    const totalSupply = await smartifyContract.totalSupply();

    const tokenId = Number(document.getElementById('input-token-id').value);

    document.getElementById('div-token-info').innerHTML = '';

    if ( tokenId <= Number(totalSupply) ){

        const tokenOwner = await smartifyContract.ownerOf(tokenId);
        const tokenOwnerShort = tokenOwner.substring(0, 6) + '...' + tokenOwner.substring(tokenOwner.length - 4);
        const eventFilter = smartifyContract.filters.CreateToken(tokenId);
        const events = await smartifyContract.queryFilter(eventFilter);
        // console.log(events);

        // event CreateToken(
        //     uint256 indexed tokenId, 
        //     string indexed ipfsCID, 
        //     address indexed createdBy, 
        //     address mintTo, 
        //     uint16 editions, 
        //     uint16 royaltyAmount
        // );
        const creator = events[0].args[2];
        const creatorShort = creator.substring(0, 6) + '...' + creator.substring(creator.length - 4);

        const editions = events[0].args[4];
        // const royalties = events[0].args[5] / 100;

        let tokenURI = await smartifyContract.tokenURI(tokenId);
        const foundIPFSinURI = tokenURI.match(/ipfs:\/\/(\w+)/);
        // console.log(foundIPFSinURI);
        if (foundIPFSinURI != null){
            tokenURI = ipfsGatewayReplacer + foundIPFSinURI[1];
        }

        let nftJSON = await fetchJSON(tokenURI);
        const foundIPFSinJSONImage = nftJSON.image.match(/ipfs:\/\/(\w+)/);
        if (foundIPFSinJSONImage != null){
            nftJSON.image = ipfsGatewayReplacer + foundIPFSinJSONImage[1];
        }
        document.getElementById('div-token-info').innerHTML +=
        `
        <img class="nft-item-image" src="${nftJSON.image}">
        <p style="text-decoration: underline">ITMS #${tokenId}</p>
        <h3>${nftJSON.name}</h3>
        <div class="nft-description">${nftJSON.description}</div>
        <div class="nft-description">${nftJSON.hashtags.join(' ')}</div>
        <br>
        <p>[ Owner ]&nbsp;&nbsp;&nbsp;<a class="creator" href="collector.html?a=${tokenOwner}">${tokenOwnerShort}</a></p>
        <p>[ Creator ]&nbsp;&nbsp;&nbsp;<a class="creator" href="collector.html?a=${creator}">${creatorShort}</a>
        <p>${editions} edition(s)</p>     
        `;
        // `<img class="nft-image" src="${nftJSON.image}">`;
        // console.log(nftJSON.description);

    }



}

