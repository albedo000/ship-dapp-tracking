import { Injectable } from '@angular/core';

import { Contract, ContractFactory, providers, Signer } from 'ethers';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor() { }

  async deploy(address: string, provider: providers.Web3Provider, contractDataAbi: Array<{}>, contractDataByteCode: string, signer: Signer): Promise<[contract: Contract, contractAddress: string]> {
    await provider.send("eth_requestAccounts", []);
    let factory = new ContractFactory(contractDataAbi, contractDataByteCode, signer);
    let contract: Contract = await factory.deploy(address);
    await contract.deployed();
    let contractAddress: string = contract.address;
    return [contract, contractAddress];
  }

  async connect(address: string, provider: providers.Web3Provider, contractDataAbi: Array<{}>, signer: Signer): Promise<[contract: Contract, seller: string, buyer: string, transport: string]> {
    await provider.send("eth_requestAccounts", []);
    let contract = new Contract(address, contractDataAbi, signer);
    let seller = await contract['getSeller']();
    let buyer = await contract['getBuyer']();
    let transport = await contract['getTransport']();
    return [contract, seller, buyer, transport];
  }

}
