import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-multi-login-accounts',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './multi-login-accounts.component.html',
  styleUrl: './multi-login-accounts.component.css'
})
export class MultiLoginAccountsComponent {
  tab : string = "MultiLoginAccount";
}
