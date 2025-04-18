// services/blockchain.service.ts
import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  private web3: Web3;
  private contractABI: any; // À définir selon votre smart contract
  private contractAddress: string;

  constructor() {
    // Initialisation de Web3 avec Metamask ou autre provider
    if (typeof window.ethereum !== 'undefined') {
      this.web3 = new Web3(window.ethereum);
    } else {
      this.web3 = new Web3(new Web3.providers.HttpProvider(environment.ethereumNodeUrl));
    }
    this.contractAddress = environment.smartContractAddress;
  }

  async connectWallet(): Promise<string> {
    try {
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      return accounts[0];
    } catch (error) {
      throw new Error('Erreur de connexion au wallet: ' + error.message);
    }
  }

  async createDevisContract(devisData: any): Promise<string> {
    try {
      const contract = new this.web3.eth.Contract(this.contractABI, this.contractAddress);
      const account = await this.connectWallet();
      
      const devisHash = this.web3.utils.sha3(JSON.stringify(devisData));
      
      const result = await contract.methods.createDevis(
        devisHash,
        devisData.clientAddress,
        this.web3.utils.toWei(devisData.amount.toString(), 'ether')
      ).send({
        from: account,
        gas: 500000
      });

      return result.transactionHash;
    } catch (error) {
      throw new Error('Erreur lors de la création du contrat: ' + error.message);
    }
  }
}

// smart-contracts/DevisContract.sol
pragma solidity ^0.8.0;

contract DevisContract {
    struct Devis {
        bytes32 devisHash;
        address client;
        address entreprise;
        uint256 amount;
        uint256 timestamp;
        bool isValid;
        bool isPaid;
    }

    mapping(bytes32 => Devis) public devis;
    address public owner;

    event DevisCreated(bytes32 indexed devisHash, address indexed client, uint256 amount);
    event DevisSigned(bytes32 indexed devisHash, address indexed client);
    event DevisPaid(bytes32 indexed devisHash, address indexed client);

    constructor() {
        owner = msg.sender;
    }

    function createDevis(bytes32 _devisHash, address _client, uint256 _amount) 
        public 
        returns (bool) 
    {
        require(msg.sender == owner, "Seule l'entreprise peut creer un devis");
        
        devis[_devisHash] = Devis({
            devisHash: _devisHash,
            client: _client,
            entreprise: owner,
            amount: _amount,
            timestamp: block.timestamp,
            isValid: true,
            isPaid: false
        });

        emit DevisCreated(_devisHash, _client, _amount);
        return true;
    }

    function signDevis(bytes32 _devisHash) public {
        require(devis[_devisHash].client == msg.sender, "Seul le client peut signer");
        require(devis[_devisHash].isValid, "Le devis n'est pas valide");
        
        emit DevisSigned(_devisHash, msg.sender);
    }

    function payDevis(bytes32 _devisHash) public payable {
        Devis storage d = devis[_devisHash];
        require(d.client == msg.sender, "Seul le client peut payer");
        require(d.isValid, "Le devis n'est pas valide");
        require(!d.isPaid, "Le devis a deja ete paye");
        require(msg.value == d.amount, "Montant incorrect");

        d.isPaid = true;
        payable(owner).transfer(msg.value);

        emit DevisPaid(_devisHash, msg.sender);
    }
}
