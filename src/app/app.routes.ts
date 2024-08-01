import { Router, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { VerifyComponent } from '../views/verify/verify.component';

export const routes: Routes = [
  {
    path: '',
    component: VerifyComponent,
    pathMatch: 'full',
    runGuardsAndResolvers: 'always', // Ensure route guards and resolvers are always executed
  },
];
