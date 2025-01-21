import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-general-lock',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './general-lock.component.html',
  styleUrl: './general-lock.component.css'
})
export class GeneralLockComponent {
  clientSearchInput:boolean=false
  onInputFocus(){
    this.clientSearchInput=true;
  }
  onInputBlur(){
    this.clientSearchInput=false;
  }
  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    const targetElement = event.target as HTMLElement;
    const clickedInside = targetElement.closest('.col-md-3');

    if (!clickedInside) {
      this.clientSearchInput = false;
    }
  }
}
