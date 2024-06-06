import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{

 signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      // Make HTTP POST request to your backend endpoint
      this.http.post<any>('https://web-production-38d2f.up.railway.app/myapi/signup/', formData).subscribe(
        response => {
          console.log('Form submitted successfully!', response);
          this.router.navigate(['/login']);
          // Handle successful submission here
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
