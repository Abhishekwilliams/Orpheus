import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.css'
})
export class ContactusComponent implements OnInit{
  contactForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      // Make HTTP POST request to your backend endpoint
      this.http.post<any>('https://web-production-38d2f.up.railway.app/myapi/send-email/', formData).subscribe(
        response => {
          console.log('Form submitted successfully!', response);
          // Display snackbar message
          this.snackBar.open('Email sent successfully', 'Close', {
            duration: 5000, // Duration in milliseconds
            horizontalPosition: 'center', // Horizontal position: 'start', 'center', 'end'
            verticalPosition: 'bottom', // Vertical position: 'top', 'bottom'
            panelClass: ['custom-snackbar'], // Custom CSS class
            // Add more options as needed
          });
          // Reset form after successful submission
          this.contactForm.reset();
        },
        error => {
          console.error('Error submitting form:', error);
          // Handle error, display error message, etc.
        }
      );
    } else {
      // Form is invalid, handle error or display validation messages
    }
  }

}
