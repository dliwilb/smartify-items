// let isGettingTokenOwner = false;

const params = new Proxy(new URLSearchParams(window.location.search), {
	get: (searchParams, prop) => searchParams.get(prop),
});
console.log(params);

if (params["nft_contract_address"] !== null && params["token_id"] !== null){
    document.getElementById('nft-contract-address').value = params["nft_contract_address"];
	document.getElementById('nf-token-id').value = params["token_id"];
    getOwner0xAddress();
}


async function getOwner0xAddress(){
    console.log('New token owner info requested.');
    document.getElementById('div-nft-info').innerHTML = '';
    document.getElementById('div-nft-transfer').style.display = 'none';
    document.getElementById('div-confirm-transfer').style.display = 'none';

    await connectWallet();
    await switchNetwork();

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const nftContractAddress = document.getElementById('nft-contract-address').value;
    const tokenId = document.getElementById('nf-token-id').value;
    // console.log(tokenId);

    document.getElementById('nft-owner').value = '';
    if( ethers.utils.isAddress(nftContractAddress) ){
        document.getElementById('nft-owner').placeholder = '';

        if ( tokenId != ''){
            const nftContract = new ethers.Contract(nftContractAddress, ERC721Abi, provider);
            // const nameOfNft = await nftContract.name();
            const ownerOfNft = await nftContract.ownerOf(tokenId);
            document.getElementById('nft-owner').value = ownerOfNft;

            const nftURI = await nftContract.tokenURI(tokenId);
            const nftJSON = await fetchJSON(nftURI);

            document.getElementById('div-nft-info').innerHTML = 
                `<img src="${nftJSON.image}" width=512 height=512>`;

            
            // console.log(connected0xAccount);
            if (ownerOfNft == ethers.utils.getAddress(connected0xAccount.toString())){
                document.getElementById('nft-owner').value += '    (You)';

                document.getElementById('div-nft-transfer').style.display = 'block';
            }
            
        }
        else {
            document.getElementById('nft-owner').placeholder = 'Invalid token ID';
        }
    }
    else {
        document.getElementById('nft-owner').placeholder = 'Invalid NFT contract address';
    };

}

async function onTransfer() {
    document.getElementById('div-nft-transfer').style.display = 'none';
    document.getElementById('div-confirm-transfer').style.display = 'block';
}

async function confirmTransfer() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const nftContractAddress = document.getElementById('nft-contract-address').value;
    const tokenId = document.getElementById('nf-token-id').value;
    const nftContract = new ethers.Contract(nftContractAddress, ERC721Abi, signer);
    const transferReceipt = await nftContract.transferFrom(ethers.utils.getAddress(connected0xAccount.toString()), document.getElementById('recipient-address').value, tokenId);
    console.log(transferReceipt);
}

async function fetchJSON(api_uri) {
	let response = await fetch(api_uri);
	
	if (!response.ok) {
	    throw new Error(`HTTP error! status: ${response.status}`);
	}
	
	let myJSON = await response.json();
	
	return await myJSON;
}