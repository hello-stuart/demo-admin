import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
@Component({
  selector: 'app-live-casino-result',
  standalone: true,
  imports: [CommonModule,FormsModule, DataTablesModule, ReactiveFormsModule],
  templateUrl: './live-casino-result.component.html',
  styleUrl: './live-casino-result.component.css'
})
export class LiveCasinoResultComponent implements OnInit {
  clientSearchInput: boolean = false
  form!: FormGroup;
  dtOptions: Config = {};

  constructor(private fb: FormBuilder){
    // Initialize form
    this.form = this.fb.group({
      casinoType: ['', Validators.required],
      gameType:['', Validators.required]
      // Empty string as default, with required validation
    });
  }
  // Method to check if the field is invalid and touched
  isFieldInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
  

  // Submit handler
  onSubmit() {
    if (this.form.invalid) {
      // Mark all controls as touched to trigger validation messages
      this.form.markAllAsTouched();
    } else {
    }
  }
  onInputFocus() {
    this.clientSearchInput = true;
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',

      language: {
        lengthMenu: 'show _MENU_ entries',
        search: '',
        searchPlaceholder: 'Search...',
        emptyTable: 'There are no records to show',
        entries: '',
        info: '',
        infoFiltered: ''
      }
    };
  }
  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    const targetElement = event.target as HTMLElement;
    const clickedInside = targetElement.closest('.col-lg-3');

    if (!clickedInside) {
      this.clientSearchInput = false;
    }
  }

  casinoType=[
    'Ezugi',
    'Super Spade',
    'Slot 3',
    'Evolution',
    'Cock Fight',
    'Ludo Classic',
    'PopTheBall',
    'Binary',
    'Slot 2',
    'Slot',
    'Vivogames-LuckyStreak',
    'Rummy',
    'Ludo Lands',
    'vivo gaming',
    'snake and ladders',
    'Smart Soft',
    'Astar games',
    'Creed roomz'
  ]
}
