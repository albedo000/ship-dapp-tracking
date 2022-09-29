import { Component } from '@angular/core';

import { ethers } from 'ethers';

import data from '../../chain/artifacts/chain/contracts/logistic.sol/logistic.json';

import { User } from './utilities/user-type';

declare let window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'ship-dapp-tracking';

  user: User = User.none;
  contract!: ethers.Contract;
  address!: string;
  state!: number;

  seller!: string;
  buyer!: string;
  transport!: string;
  
  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = this.provider.getSigner();

  constructor() {}

  async deployContract(customerAddress: string): Promise<void> {
    await this.provider.send("eth_requestAccounts", []);
    const factory = new ethers.ContractFactory(data.abi, data.bytecode, this.signer);
    this.contract = await factory.deploy(customerAddress);
    await this.contract.deployed();
    this.user = User.seller;
    this.buyer = customerAddress;
    this.seller = await this.signer.getAddress();
    this.address = this.contract.address;
    this.getState();
  }

  async connect(address: string): Promise<void> {
    await this.provider.send("eth_requestAccounts", []);
    this.contract = new ethers.Contract(address, data.abi, this.signer);
    this.getState();
    this.address = address;
    let signerAddress = await this.signer.getAddress();
    this.seller = await this.contract['getSeller']();
    this.buyer = await this.contract['getBuyer']();
    this.transport = await this.contract['getTransport']();
    switch(signerAddress) {
      case this.seller:
        this.user = User.seller;
        break;
      case this.buyer:
        this.user = User.buyer;
        break;
      case this.transport:
        this.user = User.vector;
        break;
      default:
        this.user = User.none;
    }
  }

  async getState(): Promise<void> {
    this.state = await this.contract['getState']();
    this.contract.on('handover', async () => {
      this.transport = await this.contract['getTransport']();
    })
  }

}
