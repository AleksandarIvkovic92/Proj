import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customer-add.html',
  styleUrls: ['./customer-add.css']
})
export class CustomerAddComponent {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private customerService: CustomerService, private router: Router) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      tel: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      details: [''],
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.customerService.addCustomer(this.form.value).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
