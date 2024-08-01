import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'blockcv';
  isLoggedIn: boolean = false;
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }
}
