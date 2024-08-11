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
    const nonce = Date.now();
    const message = solidityPacked(['address', 'uint256'], [address, nonce]);
    const messageHash = keccak256(message);

    const ethSignedMessageHash = keccak256(
      solidityPacked(
        ['string', 'bytes32'],
        ['\x19Ethereum Signed Message:\n32', messageHash]
      )
    );

    return { messageHash: ethSignedMessageHash, nonce };
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
