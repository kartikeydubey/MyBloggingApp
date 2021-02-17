import { Component, OnInit, ViewChild } from '@angular/core';
import { CreateEditBlogComponent } from '../create-edit-blog/create-edit-blog.component';
import { BlogModel } from 'src/app/Models/BlogModel';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Router } from '@angular/router';
import { faSort } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-my-dash-board',
  templateUrl: './my-dash-board.component.html',
  styleUrls: ['./my-dash-board.component.scss'],
})
export class MyDashBoardComponent implements OnInit {
  @ViewChild('createEditModal')
  createEditModal!: CreateEditBlogComponent;
  blogs: Observable<BlogModel[]>;
  isAscending = true;
  faSort = faSort;

  constructor(private router: Router, private store: Store<AppState>) {
    this.blogs = this.store.select((state) => state.blog);
  }

  ngOnInit(): void {
    this.store.dispatch({
      type: 'SORT_BLOG',
      payload: { isAscending: this.isAscending },
    });
  }

  //On click on Date header column
  sortByDate(): void {
    this.isAscending = !this.isAscending;
    this.store.dispatch({
      type: 'SORT_BLOG',
      payload: { isAscending: this.isAscending },
    });
  }

  //Opens a popup on clicking Create button
  openBlogModal(): void {
    this.createEditModal.showBlogModal();
  }

  //Opens a popup on clicking Edit button
  onEdit(blog: BlogModel) {
    const blogObj = {
      id: blog.id,
      title: blog.title,
      description: blog.description,
    } as BlogModel;
    console.log(blog);
    this.createEditModal.showEditBlogModal(blogObj);
  }

  //Deletes the row on clicking delete button
  onDelete(blog: BlogModel) {
    console.log(blog);
    const blogObj = {
      id: blog.id,
      title: blog.title,
      description: blog.description,
    } as BlogModel;
    this.createEditModal.deleteBlog(blogObj);
  }
}
