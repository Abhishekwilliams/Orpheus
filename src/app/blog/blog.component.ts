import { Component,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { BlogDetailComponent } from '../blog-detail/blog-detail.component';
// import { BlogCreateComponent } from '../blog-create/blog-create.component';
import { CreateblogComponent } from '../createblog/createblog.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit{
  blogPosts: any[] = [];

  constructor(private http: HttpClient, public dialog: MatDialog,private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.fetchBlogPosts();
  }

  fetchBlogPosts() {
    // Make HTTP request to fetch blog posts
    // Replace 'http://your-django-backend/api/blog/' with the actual URL of your Django backend API endpoint
    this.http.get<any[]>('https://web-production-38d2f.up.railway.app/myapi/blog/')
      .subscribe(blogPosts => {
        this.blogPosts = blogPosts;
      });
  }

  openDialog(postId: number) {
    this.dialog.open(BlogDetailComponent, {
      data: {
        postId: postId
      }
    });
  }
  formatDate(date: string | null): string {
    if (date) {
      return this.datePipe.transform(date, 'dd/MM/yyyy') || '';
    }
    return '';
  }
  createNewBlog(){
    this.dialog.open(CreateblogComponent, {
      // data: {
      //   postId: postId
      // }
    });
  }
}
