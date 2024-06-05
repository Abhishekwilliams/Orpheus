import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{

 signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

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
      this.http.post<any>('http://127.0.0.1:8000/myapi/signup/', formData).subscribe(
        response => {
          console.log('Form submitted successfully!', response);
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
