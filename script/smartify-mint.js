console.log("smartify.js loaded");

document.getElementById('api-key').value = getCookie("api-key");
document.getElementById('secret-api-key').value = getCookie("secret-api-key");



document.getElementById('button-for-file').addEventListener(
    'click', 
    () => {
        document.getElementById('file-to-pin').click()
    }
);

function savePinataKeys(){
    setCookie("api-key", document.getElementById('api-key').value, 30);
    setCookie("secret-api-key", document.getElementById('secret-api-key').value, 30);
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    console.log(document.cookie);
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function updateFile(){
    // console.log('file changed');
    if (document.getElementById('file-to-pin').value != ''){
        document.getElementById('button-for-file').innerHTML = document.getElementById('file-to-pin').files[0].name;
    }
}


function showDiv(elementId){
    if (document.getElementById(elementId).style.display == 'block'){
        document.getElementById(elementId).style.display = 'none';
    } else {
        document.getElementById(elementId).style.display = 'block';
    }
}



async function pinFileToIPFS() {
    // imports needed for this function
    // const axios = require('axios');
    // const fs = require('fs');
    // const FormData = require('form-data');

    // let fs = new FileSystem();


    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    // console.log(url);

    let file = document.getElementById('file-to-pin').files[0];
    console.log(file);

    let data = new FormData();
    data.append('file', file);


    return axios.post(url,
        data,
        {
            headers: {
                'Content-Type': `multipart/form-data; boundary= ${data._boundary}`,
                'pinata_api_key': "6057ec87e6e379605d4f",
                'pinata_secret_api_key': "6fe56761bc893daa5dfcef3989d496dbfba7f8fe26ee8a51cb223e8782bcab13"
            }
        }
    ).then(function (response) {
        //handle response here
        // data: {
        //     IpfsHash: 'QmUtuFJf7XXqL3GgnMcAzcVx3mJXfFJAWxCC9NDPUACY27',
        //     PinSize: 392595,
        //     Timestamp: '2022-01-16T20:47:38.041Z'
        // } 
        console.log(response.data);
        document.getElementById('nft-image-ipfs').value = "ipfs://" + response.data.IpfsHash;
        // ipfs://QmRV22bKxopT1pbGxSZ8C2v5oUrsBjmrFRwwcjitAvbM2v

    }).catch(function (error) {
        //handle error here
        console.log(error);
    });

}

async function pinJSONToIPFS() {

    // {
    //     /* The "pinataMetadata" object will not be part of your content added to IPFS */
    //     /* Pinata simply stores the metadata provided to help you easily query your JSON object pins */
    //     pinataOptions: {
    //         cidVersion: (the integer for your desired CID version),
    //         customPinPolicy: (custom pin policy for this json)
    //     },
    //     pinataMetadata: {
    //         name: (optional) - This is a custom name you can have for referencing your JSON object. This will be displayed in the Pin Manager "name" column if provided,
    //         keyvalues: {
    //             customKey: customValue,
    //             customKey2: customValue2
    //         }
    //     },
    //     /* The contents of the "pinataContent" object will be added to IPFS */
    //     /* The hash provided back will only represent the JSON contained in this object */
    //     /* The JSON the returned hash links to will NOT contain the "pinataMetadata" object above */
    //     pinataContent: {
    //         Any valid JSON goes here
    //     }
    // }

    const JSONBody = {
        pinataMetadata: {
            "name": "lets be frens - json"
        },
        pinataContent: {
            "name": "lets be frens",
            "description": "lets be frens",
            "image": "ipfs://QmQxShCc1WA4JW1Wq8rvvM9fbDxMUHJNzcsYBA37FZz98N"
        }
    };

    // const axios = require('axios');

    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    return axios
        .post(url, JSONBody, {
            headers: {
                pinata_api_key: "6057ec87e6e379605d4f",
                pinata_secret_api_key: "6fe56761bc893daa5dfcef3989d496dbfba7f8fe26ee8a51cb223e8782bcab13"
            }
        })
        .then(function (response) {
            //handle response here
            console.log(response.data);
            document.getElementById('nft-meta-ipfs').value = "ipfs://" + response.data.IpfsHash;
        })
        .catch(function (error) {
            //handle error here
            console.log(error);
        });
    
}

async function mintNFT() {
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const signer = provider.getSigner();
	let nftaddress = '0xf7774f3538ABB28c802933303d7ceA7367D95478';
	let nft_abi = [{"inputs": [],"stateMutability": "nonpayable","type": "constructor"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "_owner","type": "address"},{"indexed": true,"internalType": "address","name": "_approved","type": "address"},{"indexed": true,"internalType": "uint256","name": "_tokenId","type": "uint256"}],"name": "Approval","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "_owner","type": "address"},{"indexed": true,"internalType": "address","name": "_operator","type": "address"},{"indexed": false,"internalType": "bool","name": "_approved","type": "bool"}],"name": "ApprovalForAll","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "previousOwner","type": "address"},{"indexed": true,"internalType": "address","name": "newOwner","type": "address"}],"name": "OwnershipTransferred","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "_from","type": "address"},{"indexed": true,"internalType": "address","name": "_to","type": "address"},{"indexed": true,"internalType": "uint256","name": "_tokenId","type": "uint256"}],"name": "Transfer","type": "event"},{"inputs": [],"name": "CANNOT_TRANSFER_TO_ZERO_ADDRESS","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "NOT_CURRENT_OWNER","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_approved","type": "address"},{"internalType": "uint256","name": "_tokenId","type": "uint256"}],"name": "approve","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_owner","type": "address"}],"name": "balanceOf","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_tokenId","type": "uint256"}],"name": "getApproved","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_owner","type": "address"},{"internalType": "address","name": "_operator","type": "address"}],"name": "isApprovedForAll","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_to","type": "address"},{"internalType": "uint256","name": "_tokenId","type": "uint256"},{"internalType": "string","name": "_uri","type": "string"}],"name": "mint","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "name","outputs": [{"internalType": "string","name": "_name","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "owner","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_tokenId","type": "uint256"}],"name": "ownerOf","outputs": [{"internalType": "address","name": "_owner","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_from","type": "address"},{"internalType": "address","name": "_to","type": "address"},{"internalType": "uint256","name": "_tokenId","type": "uint256"}],"name": "safeTransferFrom","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_from","type": "address"},{"internalType": "address","name": "_to","type": "address"},{"internalType": "uint256","name": "_tokenId","type": "uint256"},{"internalType": "bytes","name": "_data","type": "bytes"}],"name": "safeTransferFrom","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_operator","type": "address"},{"internalType": "bool","name": "_approved","type": "bool"}],"name": "setApprovalForAll","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "bytes4","name": "_interfaceID","type": "bytes4"}],"name": "supportsInterface","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "symbol","outputs": [{"internalType": "string","name": "_symbol","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_tokenId","type": "uint256"}],"name": "tokenURI","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_from","type": "address"},{"internalType": "address","name": "_to","type": "address"},{"internalType": "uint256","name": "_tokenId","type": "uint256"}],"name": "transferFrom","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_newOwner","type": "address"}],"name": "transferOwnership","outputs": [],"stateMutability": "nonpayable","type": "function"}];	
    let contract = new ethers.Contract(nftaddress, nft_abi, signer)
		
	let mintTo = document.getElementById('nft-recipient-address').value;
	let tokenId = document.getElementById('nft-token-ID').value;
	let tokenUri = document.getElementById('nft-meta-ipfs').value;
	// console.log(mintTo + tokenId + tokenUri);
	
	// function mint(address _to, uint256 _tokenId, string calldata _uri) external onlyOwner {
    let transaction = await contract.mint(mintTo, tokenId, tokenUri);
    // let tx = await transaction.wait();
    // let event = tx.events[0];
    // let value = event.args[2];
    // let tokenId = value.toNumber()
	
}