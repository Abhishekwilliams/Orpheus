import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css'
})
export class BlogDetailComponent {
  postContent!: string; // Use definite assignment assertion
  postId!: number;
  postTitle!: string;
  postAuthor!: string;
  postCreated_at!: Date;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { postId: number }, private http: HttpClient, private snackBar: MatSnackBar) {
    this.fetchPostContent(data.postId);
  }

  fetchPostContent(postId: number) {
    // Make HTTP request to fetch the full content of the blog post based on postId
    // Replace 'http://your-django-backend/api/blog/' with the actual URL of your Django backend API endpoint
    this.http.get<any>('https://web-production-38d2f.up.railway.app/myapi/blog/' + postId + '/')
      .subscribe(post => {
        this.postContent = post.content;
        this.postId = post.id;
        this.postTitle = post.title;
        this.postAuthor = post.author;
        this.postCreated_at = post.created_at;
      });
  }

  editPost() {
     // Construct the edited post data
  const editedPostData = {
    title: this.postTitle,
    content: this.postContent,
    author: this.postAuthor,
    created_at: this.postCreated_at
  };

  // Make an HTTP PUT request to update the post
  this.http.put<any>('https://web-production-38d2f.up.railway.app/myapi/blog/' + this.postId + '/', editedPostData)
    .subscribe(updatedPost => {
      // If the update is successful, you might want to perform some action
      console.log('Post updated successfully:', updatedPost);
      this.snackBar.open('Post updated successfully', 'Close', {
        duration: 5000, // Duration in milliseconds
        horizontalPosition: 'center', // Horizontal position: 'start', 'center', 'end'
        verticalPosition: 'bottom', // Vertical position: 'top', 'bottom'
        panelClass: ['custom-snackbar'], // Custom CSS class
        // Add more options as needed
      });
      
      // You may also update the post data displayed in the component
      this.postTitle = updatedPost.title;
      this.postContent = updatedPost.content;
      this.postAuthor = updatedPost.author;
      this.postCreated_at = updatedPost.created_at;
      location.reload();
    }, error => {
      // Handle error if update fails
      console.error('Error updating post:', error);
    });
  }

  deletePost() {
    // Implement delete post functionality here
    // Make an HTTP DELETE request to delete the post
    // Replace 'http://your-django-backend/api/blog/' with the actual URL of your Django backend API endpoint
    this.http.delete<any>('https://web-production-38d2f.up.railway.app/myapi/blog/' + this.postId + "/")
      .subscribe(() => {
        // If the deletion is successful, you might want to perform some action
        console.log('Post deleted successfully.');
        this.snackBar.open('Post deleted successfully', 'Close', {
          duration: 5000, // Duration in milliseconds
          horizontalPosition: 'center', // Horizontal position: 'start', 'center', 'end'
          verticalPosition: 'bottom', // Vertical position: 'top', 'bottom'
          panelClass: ['custom-snackbar'], // Custom CSS class
          // Add more options as needed
        });
        // For demonstration purposes, you can clear the post data
        this.postContent = '';
        this.postId = null!;
        this.postTitle = '';
        this.postAuthor = '';
        this.postCreated_at = new Date();
        location.reload();
      }, error => {
        // Handle error if deletion fails
        console.error('Error deleting post:', error);
      });
  }

}
