import { Component } from '@angular/core';

import { ethers } from 'ethers';

import data from '../../chain/artifacts/chain/contracts/logistic.sol/logistic.json';

import { ContractService } from './services/contract.service';

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

  constructor(private contractService: ContractService) {}

  async deployContract(customerAddress: string): Promise<void> {
    [this.contract, this.address] = await this.contractService.deploy(customerAddress, this.provider, data.abi, data.bytecode, this.signer);
    [ this.user, this.buyer, this.address ] = [ User.seller, customerAddress, this.contract.address ];
    this.seller = await this.signer.getAddress();
    this.getState();
  }

  async connect(address: string): Promise<void> {
    let signerAddress = await this.signer.getAddress();
    [ this.contract, this.seller, this.buyer, this.transport ] = await this.contractService.connect(address, this.provider, data.abi, this.signer);
    this.getState();
    this.address = address;
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
