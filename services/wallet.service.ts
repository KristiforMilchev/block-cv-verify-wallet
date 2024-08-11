import { Injectable } from '@angular/core';
import { keccak256, solidityPacked, toUtf8Bytes } from 'ethers';
import { AuthenticationService } from './authentication.service';
import { SignatureData } from '../models/signature-data';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  constructor(private authService: AuthenticationService) {}

  private async generateVerificationCode(address: string) {
    const nonce = Date.now(); // Generate a nonce or UUID for uniqueness

    // Construct the message
    const message = 'Your original message or data here'; // this is the original data before hashing

    // Generate the message hash using ethers
    const messageHash = keccak256(toUtf8Bytes(message));

    // Add the Ethereum signed message prefix and hash it again
    const prefixedMessageHash = keccak256(
      toUtf8Bytes(`\x19Ethereum Signed Message:\n32${messageHash}`)
    );

    return { prefixedMessageHash, nonce };
  }

  async generateSignature(): Promise<SignatureData | null> {
    let address = await this.authService.getConnectedAddress(
      this.authService.provider!
    );
    if (address == undefined) return null;

    let data = await this.generateVerificationCode(address);
    let signature = await this.authService.sign(data.prefixedMessageHash);

    return {
      Message: data.prefixedMessageHash,
      Signature: signature,
      Nounce: data.nonce,
      Address: address,
    };
  }
}
