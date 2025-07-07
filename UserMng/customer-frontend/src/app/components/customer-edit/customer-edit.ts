import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.css']
})
export class CustomerEditComponent implements OnInit {
  customerForm!: FormGroup;
  loading = false;
  error = '';
  id = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      tel: [''],
      email: ['', [Validators.required, Validators.email]],
      details: ['']
    });

    this.id = this.route.snapshot.paramMap.get('id')!;
    if (this.id) {
      this.loadCustomer();
    }
  }

  loadCustomer(): void {
    this.loading = true;
    this.customerService.getCustomer(this.id).subscribe({
      next: (data) => {
        this.customerForm.patchValue({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          tel: data.tel || '',
          email: data.email || '',
          details: data.details || ''
        });
        this.loading = false;
      },
      error: () => {
        this.error = 'Greška prilikom učitavanja korisnika';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.customerForm.invalid) return;

    this.customerService.updateCustomer(this.id, this.customerForm.value).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: () => {
        this.error = 'Greška prilikom snimanja korisnika';
      }
    });
  }
}
