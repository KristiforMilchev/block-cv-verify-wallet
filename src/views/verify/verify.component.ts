import { Component } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { createInjectableType } from '@angular/compiler';

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
    private router: ActivatedRoute
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
    if (this.challenge == null) return;

    this.signature = await this.authService.sign(this.challenge!);
  }

  copy() {
    navigator.clipboard
      .writeText(this.signature!)
      .then(() => {
        console.log('Text copied to clipboard');
        this.closeCurrentTab();
      })
      .catch((err) => {
        console.error('Could not copy text: ', err);
      });
  }

  closeCurrentTab(): void {
    window.close();
  }
}
