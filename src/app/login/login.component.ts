import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      const email = formData.username; 

      // Make HTTP POST request to your backend endpoint
      this.http.post<any>('http://127.0.0.1:8000/myapi/login/', formData).subscribe(
        response => {
          console.log('Login successful:', response);
          // Redirect to dashboard or any other page after successful login
          const username = this.extractUsername(email);
          localStorage.setItem('accessToken', response.access);
          localStorage.setItem('UserName', username);
          location.reload();
          this.router.navigate(['/home']).then(() => {
            // Reload the Angular site after navigation
            location.reload();
          });
        },
        error => {
          console.error('Login failed:', error);
          // Handle error, display error message, etc.
        }
      );
    } else {
      // Form is invalid, handle error or display validation messages
    }
  }
  private extractUsername(email: string): string {
    // Split the email address by '@' and return the first part
    return email.split('@')[0];
  }
}
