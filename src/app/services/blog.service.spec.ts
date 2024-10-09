import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Blog } from 'src/models/Blog';

import { BlogService } from './blog.service';

describe('BlogService', () => {
  let service: BlogService;
  let httpMock: HttpTestingController;

  const mockBlog: Blog = { 
    id: '1', blogName: 'First Blog of the Year', category: 'First Blog of the Year', authorName: 'John Doe', article: 'Content of the first blog', timeStamp: new Date('2024-10-08')
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BlogService]
    });
    service = TestBed.inject(BlogService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch all blogs', () => {
    service.getAllBlogs().subscribe((blogs) => {
      expect(blogs.length).toBe(1);
      expect(blogs).toEqual([mockBlog]);
    });
    const req = httpMock.expectOne('https://localhost:7226/user/getAllBlogs');
    expect(req.request.method).toBe('GET');
    req.flush([mockBlog]);
  });
    
  it('should delete a blog by id', () => {
      service.deleteBlog('1').subscribe((res) => {
        expect(res).toBeTruthy();
      });
      
    const req = httpMock.expectOne('https://localhost:7226/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

});
