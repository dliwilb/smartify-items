document.getElementById('api-key').value = getCookie("api-key");
document.getElementById('secret-api-key').value = getCookie("secret-api-key");

document.getElementById('button-for-file').addEventListener(
    'click', 
    () => {
        document.getElementById('file-to-smartify').click()
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
    if (document.getElementById('file-to-smartify').value != ''){
        document.getElementById('button-for-file').innerHTML = document.getElementById('file-to-smartify').files[0].name;
    }
}


function showDiv(elementId){
    if (document.getElementById(elementId).style.display == 'block'){
        document.getElementById(elementId).style.display = 'none';
    } else {
        document.getElementById(elementId).style.display = 'block';
    }
}


document.getElementById('nft-name').value = 'TEST';
document.getElementById('nft-description').value = 
`123
456
789
`;
document.getElementById('nft-hashtags').value = '#smartBCH, #ptt, test, #noise, #taiwan';



function goBack() {
    document.getElementById('div-preview').style.display = 'none';

    document.getElementById('button-preview').style.display = 'inline';
    document.getElementById('button-back').style.display = 'none';
    document.getElementById('button-smartify').style.display = 'none';

    document.getElementById('div-input').style.display = 'block';
}


function showPreview() {
    let previewContent = '';

    const hashtags = parseHashtags();
    // console.log(hashtags);

    previewContent = 
`
<img src="${URL.createObjectURL(document.getElementById('file-to-smartify').files[0])}" style="max-width: 600px; max-height: 800px">


[Title]
<div style="margin-left: 30px; display: inline-block">${document.getElementById('nft-name').value}</div>

[Description]
<div style="margin-left: 30px; display: inline-block">${document.getElementById('nft-description').value}</div>

[Hashtags]
<div style="margin-left: 30px; display: inline-block">`;

    for (let i = 0; i < hashtags.length; i++){
        if ( hashtags[i].match(/^\#\w+/) ) {
            previewContent += hashtags[i];
            previewContent += "\r\n";
        }
    }

    previewContent += '</div>';


    // previewContent += hashtags;

    document.getElementById('div-preview').innerHTML = previewContent;

    document.getElementById('div-input').style.display = 'none';

    document.getElementById('button-preview').style.display = 'none';
    document.getElementById('button-back').style.display = 'inline';
    document.getElementById('button-smartify').style.display = 'inline';

    document.getElementById('div-preview').style.display = 'block';
}


function parseHashtags(){
    const _inputHashtags = document.getElementById('nft-hashtags').value;

    let _hashtags = _inputHashtags.split(',');
    _hashtags = _hashtags.map(s => s.trim());

    // console.log(hashtags);
    return _hashtags;
}


async function pinFileToIPFS() {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    let file = document.getElementById('file-to-smartify').files[0];
    console.log(file);

    let data = new FormData();
    data.append('file', file);

    let ipfsCID = '';
    await axios.post(url,
        data,
        {
            headers: {
                'Content-Type': `multipart/form-data; boundary= ${data._boundary}`,
                'pinata_api_key': document.getElementById('api-key').value, 
                'pinata_secret_api_key': document.getElementById('secret-api-key').value
            }
        }
    ).then(function (response) {
        // data: {
        //     IpfsHash: 'QmUtuFJf7XXqL3GgnMcAzcVx3mJXfFJAWxCC9NDPUACY27',
        //     PinSize: 392595,
        //     Timestamp: '2022-01-16T20:47:38.041Z'
        // } 
        console.log(response.data);
        // document.getElementById('nft-image-ipfs').value = "ipfs://" + response.data.IpfsHash;
        // ipfs://QmRV22bKxopT1pbGxSZ8C2v5oUrsBjmrFRwwcjitAvbM2v
        ipfsCID =  response.data.IpfsHash;
    }).catch(function (error) {
        console.log(error);
    });
    return ipfsCID;
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
                pinata_api_key: document.getElementById('api-key').value, 
                pinata_secret_api_key: document.getElementById('secret-api-key').value
            }
        })
        .then(function (response) {
            //handle response here
            console.log(response.data);
            // document.getElementById('nft-meta-ipfs').value = "ipfs://" + response.data.IpfsHash;

        })
        .catch(function (error) {
            //handle error here
            console.log(error);
        });
    
}

async function mintNFT() {
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const signer = provider.getSigner();
    const smartifyContract = new ethers.Contract(smartifyContractAddress, smartifyContractABI, signer)
		
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