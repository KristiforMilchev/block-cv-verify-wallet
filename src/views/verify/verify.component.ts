import { Component } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { createInjectableType } from '@angular/compiler';
import { WalletService } from '../../../services/wallet.service';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.css',
})
export class VerifyComponent {
  wallet?: string | null;
  challenge?: string | null;
  signature?: string;
  constructor(
    public authService: AuthenticationService,
    private router: ActivatedRoute,
    private walletService: WalletService
  ) {}

  ngOnInit() {
    this.router.queryParamMap.subscribe((params) => {
      this.wallet = params.get('wallet');
      this.challenge = params.get('challange');
    });
  }

  async onConnect() {
    await this.authService.connect();
  }

  async onGenerateSignature() {
    let signature = await this.walletService.generateSignature();

    window.opener.postMessage({ signature: signature }, '*');
  }

  closeCurrentTab(): void {
    window.close();
  }
}
