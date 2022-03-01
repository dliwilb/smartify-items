let ARTIST_NAME_CONTRACT_ADDR;

switch ( Number(DEPLOYED_NETWORK_ID) ){
    case 0x4:       // Testnet Rinkeby
		ARTIST_NAME_CONTRACT_ADDR = '0x5CC096590A6e34A3Ff014A40bf8629a7BD3bF862'
        break;
    case 0x2710:    // smartBCH
		// ARTIST_NAME_CONTRACT_ADDR = '0x8912EE75259778AA70981B73307C8B1b6B4A9ee1'
        break;
}


const ARTIST_NAME_CONTRACT_ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "newAdmin",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approvedBy",
				"type": "address"
			}
		],
		"name": "AdminAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "removedAdmin",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "removedBy",
				"type": "address"
			}
		],
		"name": "AdminRemoved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_address",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "_artistName",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "_admin",
				"type": "address"
			}
		],
		"name": "AdminSetArtistName",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "_artistName",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "_addressFrom",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "_addressTo",
				"type": "address"
			}
		],
		"name": "ClaimArtistName",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "_artistName",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "_addressFrom",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "_addressTo",
				"type": "address"
			}
		],
		"name": "PassArtistName",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bool",
				"name": "_toStatus",
				"type": "bool"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "changedBy",
				"type": "address"
			}
		],
		"name": "SetAllowAdmin",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_address",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "_artistNameTo",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "_artistNameFrom",
				"type": "bytes32"
			}
		],
		"name": "SetArtistName",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "toAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "changedBy",
				"type": "address"
			}
		],
		"name": "SetTreasury",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_addressToMakeAdmin",
				"type": "address"
			}
		],
		"name": "addAdmin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "addressToArtist",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "_artistName",
				"type": "bytes32"
			}
		],
		"name": "adminSetArtistName",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "allowAdmin",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "allowSetArtistName",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "allowTransferArtistName",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "artistNames",
		"outputs": [
			{
				"internalType": "bool",
				"name": "registered",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "successor",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_bytes32",
				"type": "bytes32"
			}
		],
		"name": "bytes32ToString",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_addressFrom",
				"type": "address"
			}
		],
		"name": "claimArtistName",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "claimOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "collectContractBalanceToTreasury",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getArtistName",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "hardcodeTreasury",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_nextOwner",
				"type": "address"
			}
		],
		"name": "nameNextOwner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "nextOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_addressTo",
				"type": "address"
			}
		],
		"name": "passArtistName",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_addressToRemoveFromAdmin",
				"type": "address"
			}
		],
		"name": "removeAdmin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "_allowAdmin",
				"type": "bool"
			}
		],
		"name": "setAllowAdmin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "_allowTransferArtistName",
				"type": "bool"
			}
		],
		"name": "setAllowPassArtistName",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "_allowSetArtistName",
				"type": "bool"
			}
		],
		"name": "setAllowSetArtistName",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_artistNameTo",
				"type": "bytes32"
			}
		],
		"name": "setArtistName",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "setArtistNameFee",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_addressToMakeTreasury",
				"type": "address"
			}
		],
		"name": "setTreasury",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "transferArtistNameFee",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "treasuryAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "treasuryHardcoded",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_adminAddress",
				"type": "address"
			}
		],
		"name": "verifyAdmin",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];