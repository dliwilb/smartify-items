const DEPLOYED_NETWORK_ID = 0x4;    // Testnet Rinkeby
// const DEPLOYED_NETWORK_ID = 0x2710;       // smartBCH;


/* -------------------------------------------------------------------------------------- */


// IPFS gateways
const IPFS_GATEWAYS = [];
    IPFS_GATEWAYS[0] = 'https://ipfs.io/ipfs/';
    IPFS_GATEWAYS[1] = 'https://gateway.ipfs.io/ipfs/';
    IPFS_GATEWAYS[2] = 'https://infura-ipfs.io/ipfs/';
    IPFS_GATEWAYS[3] = 'https://gateway.pinata.cloud/ipfs/';
    IPFS_GATEWAYS[4] = 'https://cloudflare-ipfs.com/ipfs/';
const IPFS_GATEWAY = IPFS_GATEWAYS[2];


// Rinkeby
const RINKEBY_RPCS = [];
    RINKEBY_RPCS[0] = 'https://rinkeby-light.eth.linkpool.io/';
    RINKEBY_RPCS[1] = 'https://rinkeby.infura.io/v3/2c1d58028d4343dbb2680897c28b8bc2';
const RINKEBY_RPC = RINKEBY_RPCS[1];
const RINKEBY_SCANNER = 'https://rinkeby.etherscan.io/address/';

// smartBCH
const SMARTBCH_RPCS = [];
    SMARTBCH_RPCS[0] = 'https://smartbch.greyh.at';
    SMARTBCH_RPCS[1] = 'https://smartbch.fountainhead.cash/mainnet';
    SMARTBCH_RPCS[2] = 'https://global.uat.cash';
    SMARTBCH_RPCS[3] = 'https://rpc.uatvo.com';
const SMARTBCH_RPC = SMARTBCH_RPCS[0];
const SMARTBCH_SCANNER = 'https://www.smartscan.cash/address/';

// switch between networks

let HTTPS_RPC = '';
let NETWORK_SCANNER = '';
let TESTNET_MARKER = '';
switch ( DEPLOYED_NETWORK_ID ){
    case 0x4:       // Testnet Rinkeby
        HTTPS_RPC = RINKEBY_RPC;
        NETWORK_SCANNER = RINKEBY_SCANNER;
        break;
    case 0x2710:    // smartBCH
        HTTPS_RPC = SMARTBCH_RPC;
        NETWORK_SCANNER = SMARTBCH_SCANNER;
        break;
}
