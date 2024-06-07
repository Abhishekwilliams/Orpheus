import { Component } from '@angular/core';
import { PaymentService } from '../services/payment.service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  paymentDetails = {
    name: '',
    email: '',
    amount: 0
  };
  constructor(private paymentService: PaymentService) {}

  makePayment(event: Event) {
    event.preventDefault();
    const { amount, email, name } = this.paymentDetails;
    if (amount && email && name) {
      const currency = 'INR';
      this.paymentService.payWithRazorpay(amount, currency);
    }
  }

}
