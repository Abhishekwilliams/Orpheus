import { Injectable } from '@angular/core';
declare var Razorpay: any; // Declare Razorpay globally
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor() { }
  payWithRazorpay(amount: number, currency: string) {
    const options = {
      key: 'YOUR_RAZORPAY_KEY', // Replace with your Razorpay Key ID
      amount: amount * 100, // Amount in paisa
      currency: currency,
      name: 'Your App Name',
      description: 'Payment for something',
      image: 'https://your-logo-url.com',
      handler: (response: any) => {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        // You can handle the response as needed, e.g., save it to your server
      },
      prefill: {
        name: '',
        email: '',
        contact: ''
      },
      notes: {
        address: 'Some address'
      },
      theme: {
        color: '#3399cc'
      }
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
  }
}
