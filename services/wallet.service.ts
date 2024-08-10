import { Injectable } from '@angular/core';
import { keccak256, solidityPacked } from 'ethers';
import { AuthenticationService } from './authentication.service';
import { SignatureData } from '../models/signature-data';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  constructor(private authService: AuthenticationService) {}

  private async generateVerificationCode(address: string) {
    const nonce = Date.now(); // Generate a nonce or UUID for uniqueness
    const messageHash = keccak256(
      solidityPacked(['address', 'uint256'], [address, nonce])
    );
    return { messageHash, nonce };
  }
  async generateSignature(): Promise<SignatureData | null> {
    let address = await this.authService.getConnectedAddress(
      this.authService.provider!
    );
    if (address == undefined) return null;

    let data = await this.generateVerificationCode(address);
    let signature = await this.authService.sign(data.messageHash);

    return {
      Message: data.messageHash,
      Signature: signature,
      Nounce: data.nonce,
      Address: address,
    };
  }
}
