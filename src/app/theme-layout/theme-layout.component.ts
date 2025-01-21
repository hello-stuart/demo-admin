import { Component } from '@angular/core';
import { LayoutComponent } from '../theme/layout/layout.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-theme-layout',
  standalone: true,
  imports: [LayoutComponent],
  templateUrl: './theme-layout.component.html',
  styleUrl: './theme-layout.component.css'
})
export class ThemeLayoutComponent {

  constructor(private router: Router){
  // temp solution
    const loginAuth = localStorage.getItem('loginAuth');
    if(!loginAuth) this.router.navigateByUrl('/login');
  }
}
