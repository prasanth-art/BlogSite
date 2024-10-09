import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent {
  blogForm: FormGroup;

  constructor(private fb: FormBuilder, private blogService: BlogService, private router: Router) {
    this.blogForm = this.fb.group({
      // Id: [''],
      BlogName: ['', [Validators.required, Validators.minLength(20)]],
      Category: ['', [Validators.required, Validators.minLength(20)]],
      Article: ['', [Validators.required, Validators.minLength(20)]],
      AuthorName: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.blogForm.valid) {
      console.log('Form Data:', this.blogForm.getRawValue());
      this.blogService.createBlog(this.blogForm.value).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
