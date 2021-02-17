import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { BlogModel } from 'src/app/Models/BlogModel';

@Component({
  selector: 'app-create-edit-blog',
  templateUrl: './create-edit-blog.component.html',
  styleUrls: ['./create-edit-blog.component.scss'],
})
export class CreateEditBlogComponent implements OnInit {
  @ViewChild('createEditModal')
  createEditModal!: ModalDirective;
  id: number = 1;
  blog: BlogModel = { id: 0, title: '', description: '', date: null };
  title: string = '';
  description: string = '';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  //On clicking  Confirm/Update button in the popup
  onSubmit(): void {
    if (this.blog.id > 0) {
      this.blog.title = this.title;
      this.blog.description = this.description;
      this.blog.date = new Date();
      this.editBlog(this.blog);
    } else {
      this.blog.id = this.id;
      this.blog.title = this.title;
      this.blog.description = this.description;
      this.blog.date = new Date();
      this.addBlog(this.blog);
      this.id++;
    }
    this.onCancel();
  }

  //On clicking Cancel button
  onCancel(): void {
    this.hideBlogModal();
    this.clearInputs();
  }

  //Clears all control inputs
  clearInputs(): void {
    this.blog = { id: null, title: '', description: '', date: null };
    this.title = '';
    this.description = '';
  }

  //Shows Add blog popup
  showBlogModal(): void {
    this.clearInputs();
    this.createEditModal.show();
  }

  //Shows edit blog popup
  showEditBlogModal(blog: BlogModel): void {
    this.createEditModal.show();
    this.blog = blog;
    this.title = blog.title;
    this.description = blog.description;
  }

  //Hides blog popup
  hideBlogModal(): void {
    this.createEditModal.hide();
  }

  //Adds blog in the store
  addBlog(blog: BlogModel): void {
    this.store.dispatch({
      type: 'ADD_BLOG',
      payload: blog,
    });
  }

  //Edits blog in the store
  editBlog(blog: BlogModel): void {
    this.store.dispatch({
      type: 'EDIT_BLOG',
      payload: blog,
    });
  }

  //Deletes blog from the store
  deleteBlog(blog: BlogModel): void {
    this.store.dispatch({
      type: 'DELETE_BLOG',
      payload: blog,
    });
  }

  //Disable the submit button
  disableSubmit() {
    return !(
      this.title.trim().length > 0 && this.description.trim().length > 0
    );
  }
}
