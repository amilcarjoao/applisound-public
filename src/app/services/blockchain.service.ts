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
