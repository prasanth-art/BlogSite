import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Blog } from '../../models/Blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'https://localhost:7226';
  
  constructor(private httpClient: HttpClient) {}


  getAllBlogs(): Observable<Blog[]> {
    return this.httpClient.get<Blog[]>(`${this.apiUrl}/user/getAllBlogs`);
  }

  getBlogByUser(user: string): Observable<Blog> {
    return this.httpClient.get<Blog[]>(`${this.apiUrl}/user/${user}`).pipe(map(blogs => blogs[0])
    );
  }

  getBlogsByCategory(category: string): Observable<Blog[]> {
    return this.httpClient.get<Blog[]>(`${this.apiUrl}/category/${category}`);
  }

  createBlog(blog: any): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/create`, blog);
  }

  deleteBlog(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
}
