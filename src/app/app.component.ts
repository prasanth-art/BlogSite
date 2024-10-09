import { Component } from '@angular/core';
import { Blog } from 'src/models/Blog';
import { BlogService } from './services/blog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'BlogSite';
  // blogs: Blog[] = [];

  // constructor(private blogService: BlogService) {}

  // onSearch(criteria: {category: string; startDate: Date | null; endDate: Date | null}): void {
  //   this.blogService.getBlogsByCategory(criteria.category)
  //                   .subscribe(blogs => this.blogs = blogs);
  }
