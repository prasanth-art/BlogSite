import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { BlogService } from 'src/app/services/blog.service';

import { BlogListComponent } from './blog-list.component';

describe('BlogListComponent', () => {
  let component: BlogListComponent;
  let fixture: ComponentFixture<BlogListComponent>;
  let blogService: BlogService;

  const mockBlogs = [
    { id: '1', blogName: 'First Blog of the Year', category: 'First Blog of the Year', authorName: 'John Doe', article: 'Content of the first blog', timeStamp: new Date('2024-10-08')},
    { id: '2', blogName: 'Second Blog of the Year', category: 'Second Blog of the Year', authorName: 'Jane Doe', article: 'Content of the second blog', timeStamp: new Date('2024-10-08')},
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogListComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [BlogService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogListComponent);
    component = fixture.componentInstance;
    blogService = TestBed.inject(BlogService);
  
    
    spyOn(blogService, 'getAllBlogs').and.returnValue(of(mockBlogs));
    spyOn(blogService, 'deleteBlog').and.returnValue(of(void 0));
  });

    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should fetch all blogs on initialization', () => {
      component.ngOnInit();
      
      expect(blogService.getAllBlogs).toHaveBeenCalled();
      expect(component.blogs.length).toBe(2);
      expect(component.blogs).toEqual(mockBlogs);
    });

    it('should delete a blog and update the blog list', () => {
      component.ngOnInit();
      component.deleteBlog('1');
      
      component.blogs = component.blogs.filter(blog => blog.id !== '1');

      expect(blogService.deleteBlog).toHaveBeenCalledWith('1');
      expect(component.blogs.length).toBe(1);
    });

    it('should clear the category filter and fetch all blogs', () => {
      component.clearFilter();
      
      expect(component.selectedCategory).toBe('');
      expect(blogService.getAllBlogs).toHaveBeenCalled();
    });

});
