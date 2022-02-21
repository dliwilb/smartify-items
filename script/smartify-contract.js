const testRinkebyRPC = 'https://rinkeby-light.eth.linkpool.io/';
const infuraRinkebyRPC = 'https://rinkeby.infura.io/v3/2c1d58028d4343dbb2680897c28b8bc2';
const httpsRPC = infuraRinkebyRPC;

// await connectWallet();
// await switchNetwork();
// const provider = new ethers.providers.Web3Provider(window.ethereum);
// const provider = ethers.getDefaultProvider(4);
// const provider = new ethers.providers.JsonRpcProvider();

async function readContractStatVar(){
    console.log('Reading contract state variables...');
    document.getElementById('list-contract-info').innerHTML = 'Loading...';

    const provider = new ethers.providers.JsonRpcProvider(httpsRPC);
    const smartifyContract = new ethers.Contract(smartifyContractAddress, smartifyContractABI, provider);

    let listContent = '';

    listContent += "<li>name: " + await smartifyContract.name() + "</li>";
    listContent += "<li>symbol: " + await smartifyContract.symbol() + "</li>";
    listContent += "<li>nftNameSymbolHardcoded: " + await smartifyContract.nftNameSymbolHardcoded() + "</li>";
    listContent += "<li>useIpfs: " + await smartifyContract.useIpfs() + "</li>";
    listContent += "<li>useIpfsHardcoded: " + await smartifyContract.useIpfsHardcoded() + "</li>";
    const ipfsGateway = await smartifyContract.ipfsGateway();
        listContent += "<li>ipfsGateway: " + ipfsGateway + ` (${ethers.utils.parseBytes32String(ipfsGateway)})</li>`;
    listContent += "<li>totalSupply: " + await smartifyContract.totalSupply() + "</li>";
    listContent += "<li>allowSetUri: " + await smartifyContract.allowSetUri() + "</li>";
    listContent += "<li>tokenUriHardcoded: " + await smartifyContract.tokenUriHardcoded() + "</li>";

    listContent += "<li>isMintAvailable: " + await smartifyContract.isMintAvailable() + "</li>";
    const mintFeeWei = await smartifyContract.mintFee();
        listContent += "<li>mintFee: " + mintFeeWei + ` wei (${mintFeeWei*1e-18} ether)</li>`;
    listContent += "<li>treasuryAddress: " + await smartifyContract.treasuryAddress() + "</li>";
    listContent += "<li>treasuryHardcoded: " + await smartifyContract.treasuryHardcoded() + "</li>";
    listContent += "<li>alowAdmin: " + await smartifyContract.allowAdmin() + "</li>";
    listContent += "<li>userAddsUser: " + await smartifyContract.userAddsUser() + "</li>";
    listContent += "<li>whitelistWaiver: " + await smartifyContract.whitelistWaiver() + "</li>";
    listContent += "<li>owner: " + await smartifyContract.owner() + "</li>";
    listContent += "<li>nextOwner: " + await smartifyContract.nextOwner() + "</li>";

    document.getElementById('list-contract-info').innerHTML = listContent;

}

async function readUserAddedByAdmin() {
    console.log('Reading whitelisted addresses...');
    document.getElementById('list-UserAddedByAdmin').innerHTML = 'Loading...';
    
    const provider = new ethers.providers.JsonRpcProvider(httpsRPC);
    const smartifyContract = new ethers.Contract(smartifyContractAddress, smartifyContractABI, provider);

    const blockNum = await provider.getBlockNumber();   
    const queryPeriodHour = 24;
    const queryPeriodBlock = queryPeriodHour * 60 * 60 / 5;
    const fromBlock = blockNum - queryPeriodBlock;
    const toBlock = blockNum;

    let listContent = '';

    const eventFilter = smartifyContract.filters.UserAddedByAdmin();
    const events = await smartifyContract.queryFilter(eventFilter, fromBlock, toBlock);

    for (let i = events.length-1; i >= 0; i--) {
        const newUser = events[i].args[0];
        const approvedBy = events[i].args[1];
        // console.log(newUser + " added by " + approvedBy);
        listContent += `<li>${newUser} (added by ${approvedBy})</li>`;
    }

    if ( listContent == '' ){
        listContent = 'None';
    }

    document.getElementById('list-UserAddedByAdmin').innerHTML = listContent;

}


async function readUserAddedByUser() {
    console.log('Reading whitelisted addresses...');
    document.getElementById('list-UserAddedByUser').innerHTML = 'Loading...';

    const provider = new ethers.providers.JsonRpcProvider(httpsRPC);
    const smartifyContract = new ethers.Contract(smartifyContractAddress, smartifyContractABI, provider);

    const blockNum = await provider.getBlockNumber();   
    const queryPeriodHour = 24;
    const queryPeriodBlock = queryPeriodHour * 60 * 60 / 5;
    const fromBlock = blockNum - queryPeriodBlock;
    const toBlock = blockNum;

    let listContent = '';

    const eventFilter = smartifyContract.filters.UserAddedByUser();
    const events = await smartifyContract.queryFilter(eventFilter, fromBlock, toBlock);

    for (let i = events.length-1; i >= 0; i--) {
        const newUser = events[i].args[0];
        const approvedBy = events[i].args[1];
        // console.log(newUser + " added by " + approvedBy);
        listContent += `<li>${newUser} (added by ${approvedBy})</li>`;
    }

    if ( listContent == '' ){
        listContent = 'None';
    }

    document.getElementById('list-UserAddedByUser').innerHTML = listContent;

}

async function adminAddUser() {
    if ( ethers.utils.isAddress(document.getElementById('address').value) ){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const smartifyContract = new ethers.Contract(smartifyContractAddress, smartifyContractABI, signer);
        try {
            await smartifyContract.adminAddUser(document.getElementById('address').value);
        } catch(e) {
            console.log(e);
            alert(e);
        }
    }
}

async function userAddUser() {
    if ( ethers.utils.isAddress(document.getElementById('address').value) ){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const smartifyContract = new ethers.Contract(smartifyContractAddress, smartifyContractABI, signer);
        try {
            await smartifyContract.userAddUser(document.getElementById('address').value);
        } catch(e) {
            console.log(e);
            alert(e);
        }
    }
}

async function addAdmin() {
    if ( ethers.utils.isAddress(document.getElementById('address').value) ){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const smartifyContract = new ethers.Contract(smartifyContractAddress, smartifyContractABI, signer);
        try {
            await smartifyContract.addAdmin(document.getElementById('address').value);
        } catch(e) {
            console.log(e);
            alert(e);
        }
    }
}


async function verifyUser() {
    if ( ethers.utils.isAddress(document.getElementById('address').value) ){

        const provider = new ethers.providers.JsonRpcProvider(httpsRPC);
        const smartifyContract = new ethers.Contract(smartifyContractAddress, smartifyContractABI, provider);
        
        const isWhitelisted = await smartifyContract.verifyUser(document.getElementById('address').value); 
        document.getElementById('div-address-info').innerHTML = 'isWhitelisted: ' + isWhitelisted;

    } else {
        document.getElementById('div-address-info').innerHTML = 'Please enter a valid address.';
    }

}


async function verifyAdmin() {
    if ( ethers.utils.isAddress(document.getElementById('address').value) ){
        const provider = new ethers.providers.JsonRpcProvider(httpsRPC);
        const smartifyContract = new ethers.Contract(smartifyContractAddress, smartifyContractABI, provider);
        
        const isAdmin = await smartifyContract.verifyAdmin(document.getElementById('address').value); 
        document.getElementById('div-address-info').innerHTML = 'isAdmin: ' + isAdmin;
    } else {
        document.getElementById('div-address-info').innerHTML = 'Please enter a valid address.';
    }
}


async function tokenURI() {
    document.getElementById('div-token-info').innerHTML = 'Retrieving info...';

    const provider = new ethers.providers.JsonRpcProvider(httpsRPC);
    const smartifyContract = new ethers.Contract(smartifyContractAddress, smartifyContractABI, provider);
    try {
        const result = await smartifyContract.tokenURI(document.getElementById('token-id').value); 
        document.getElementById('div-token-info').innerHTML = 'tokenURI | ' + result;
    } catch (e) {
        alert(e);
    }
}

async function ownerOf() {
    document.getElementById('div-token-info').innerHTML = 'Retrieving info...';

    const provider = new ethers.providers.JsonRpcProvider(httpsRPC);
    const smartifyContract = new ethers.Contract(smartifyContractAddress, smartifyContractABI, provider);
    try {
        const result = await smartifyContract.ownerOf(document.getElementById('token-id').value); 
        document.getElementById('div-token-info').innerHTML = 'ownerOf | ' + result;
    } catch (e) {
        alert(e);
    }
}

async function royaltyInfo() {
    document.getElementById('div-token-info').innerHTML = 'Retrieving info...';

    const provider = new ethers.providers.JsonRpcProvider(httpsRPC);
    const smartifyContract = new ethers.Contract(smartifyContractAddress, smartifyContractABI, provider);
    try {
        const [receiver, amount] = await smartifyContract.royaltyInfo(document.getElementById('token-id').value, 100); 
        document.getElementById('div-token-info').innerHTML = 'royaltyInfo | ' + amount + '% to ' + receiver;
    } catch (e) {
        alert(e);
    }
}