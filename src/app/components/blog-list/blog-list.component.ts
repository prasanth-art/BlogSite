import { Component, Input, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { Blog } from '../../../models/Blog';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})

export class BlogListComponent implements OnInit {
  blogs: Blog[] = [];
  selectedCategory: string = '';
  startDate: Date = new Date();
  endDate: Date = new Date();

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.fetchAllBlogs();
  }

  fetchAllBlogs() {
    this.blogService.getAllBlogs().subscribe((blogs) => {
      this.blogs = blogs;
      console.log(this.blogs);
    });
  }

  clearFilter(): void {
    this.selectedCategory = '';
    this.fetchAllBlogs();
  }

  fetchBlogsByCategory() {
    if (this.selectedCategory) {
      this.blogService.getBlogsByCategory(this.selectedCategory).subscribe((blogs) => {
        this.blogs = blogs;
      });
    } else {
      this.fetchAllBlogs();
    }
  }

  deleteBlog(id: string) {
    console.log('Are you sure?');
    this.blogService.deleteBlog(id).subscribe(() => {
      this.blogs = this.blogs.filter(blog => blog.id! == id);
    })
    this.fetchAllBlogs();
  }
}
