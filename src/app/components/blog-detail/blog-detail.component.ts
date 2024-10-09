import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { Blog } from 'src/models/Blog';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit{
  blog: Blog | null = null;

  constructor(private route: ActivatedRoute, 
    private blogService: BlogService, 
    private router: Router) {}

  ngOnInit(): void {
    const userName = this.route.snapshot.paramMap.get('name') || '';

    if (userName) {
      this.blogService.getBlogByUser(userName).subscribe((blog) => {
        if (blog) {
          this.blog = blog;
        } else {
          alert('Blog not found');
          this.router.navigate(['/']);
        }
      });
    }
  } 
}
