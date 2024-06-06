import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-createblog',
  templateUrl: './createblog.component.html',
  styleUrl: './createblog.component.css'
})
export class CreateblogComponent {
  title: string = '';
  author: string = '';
  content: string = '';
  created_at: string; 
  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<CreateblogComponent>,
    private datePipe: DatePipe
  ) {
    this.created_at = this.datePipe.transform(new Date(), 'dd/MM/yyyy') || '';
   }

  createPost(): void {
    const postData = {
      title: this.title,
      author: this.author,
      content: this.content,
      created_at: this.created_at
    };

    this.http.post('https://web-production-38d2f.up.railway.app/myapi/blog/', postData)
      .subscribe((response) => {
        console.log('Post created successfully:', response);
        this.dialogRef.close();
        location.reload();
      }, (error) => {
        console.error('Error creating post:', error);
      });
  }
}
