import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { BlogService } from 'src/app/services/blog.service';

import { CreateBlogComponent } from './create-blog.component';

describe('CreateBlogComponent', () => {
  let component: CreateBlogComponent;
  let fixture: ComponentFixture<CreateBlogComponent>;
  let blogService: BlogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateBlogComponent],
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [BlogService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBlogComponent);
    component = fixture.componentInstance;
    blogService = TestBed.inject(BlogService);

    spyOn(blogService, 'createBlog').and.returnValue(of({}));
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
      
      expect(component.blogForm).toBeTruthy();
      expect(component.blogForm.controls['BlogName'].value).toBe('');
      expect(component.blogForm.controls['Category'].value).toBe('');
      expect(component.blogForm.controls['Article'].value).toBe('');
      expect(component.blogForm.controls['AuthorName'].value).toBe('');
      // expect(component.blogForm.controls['timeStamp'].value).toBe('');
  });

  it ('should create the blog when form valid', () => {
    component.blogForm.controls['BlogName'].setValue('Blog Name is required.Blog Name must be atleast 20 characters.');
    component.blogForm.controls['Category'].setValue('Category is required.Category must be atleast 20 characters.');
    component.blogForm.controls['Article'].setValue('Article is required.Category must be atleast 20 characters.');
    component.blogForm.controls['AuthorName'].setValue('Author is required.');
    // component.blogForm.controls['timeStamp'].setValue('Test timeStamp');

    component.onSubmit();

    expect(blogService.createBlog).toHaveBeenCalled();
    expect(blogService.createBlog).toHaveBeenCalledWith(component.blogForm.value);
  });

  it ('should not submit the form if invalid', () => {
    component.onSubmit();

    expect(blogService.createBlog).not.toHaveBeenCalled();
  });


});
