import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CustomerService, Customer } from '../../services/customer.service';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.css']
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  loading = false;
  error = '';
  searchTerm: string = '';

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
    console.log('KOMPONENTA SE UCITAVA');
  }

  loadCustomers(): void {
    this.loading = true;
    this.customerService.getCustomers().subscribe({
      next: (data) => {
        console.log('Dobijeni podaci:', data);
        this.customers = data.customers;
        this.loading = false;
      },
      error: (err) => {
        console.error('Greška:', err);
        this.error = 'Greška prilikom učitavanja korisnika';
        this.loading = false;
      }
    });
  }

  get filteredCustomers(): Customer[] {
    const term = this.searchTerm.toLowerCase();
    return this.customers.filter(c =>
      (c.firstName + ' ' + c.lastName + ' ' + c.email + ' ' + c.tel + ' ' + c.details)
        .toLowerCase()
        .includes(term)
    );
  }

  goToAdd(): void {
    this.router.navigate(['/customers/add']);
  }

  onEdit(id: string): void {
    this.router.navigate(['/customers/edit', id]);
  }

  deleteCustomer(id: string): void {
    this.customerService.deleteCustomer(id).subscribe(() => {
      this.loadCustomers();
    });
  }
}
