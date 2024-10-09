import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { CreateBlogComponent } from './components/create-blog/create-blog.component';

const routes: Routes = [
  { path: '', component: BlogListComponent},
  { path: 'create-blog', component: CreateBlogComponent},
  { path: 'blog/:name', component: BlogDetailComponent},
  // { path: 'blog/:name', component: BlogDetailComponent }
  { path: '**', redirectTo: '', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
