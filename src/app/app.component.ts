import { Component ,OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'my-orpheus-sabha';
  username: string | null = null;
  accessToken: string | null = null;
  
  ngOnInit(): void {
    // Check if localStorage is available (browser environment)
    if (typeof localStorage !== 'undefined') {
      // Retrieve username from local storage
      this.username = localStorage.getItem('UserName');
      this.accessToken=localStorage.getItem('accessToken')
    }
  }
  logout(): void {
    // Clear username and accessToken from local storage
    localStorage.removeItem('UserName');
    localStorage.removeItem('accessToken');
    location.reload();

    // Optionally, perform any other logout-related actions
  }
}
