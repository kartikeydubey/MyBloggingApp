import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './Components/user-login/user-login.component';
import { MyDashBoardComponent } from './Components/my-dash-board/my-dash-board.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CreateEditBlogComponent } from './Components/create-edit-blog/create-edit-blog.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { StoreModule } from '@ngrx/store';
import { blogReducer } from './Reducers/blog.reducer';
import { AuthGuardService } from './Services/auth-guard.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

export const ROUTES = [
  {
    path: '',
    component: UserLoginComponent,
  },
  {
    path: 'dashboard',
    component: MyDashBoardComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    MyDashBoardComponent,
    CreateEditBlogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forChild(ROUTES),
    ModalModule.forRoot(),
    StoreModule.forRoot({ blog: blogReducer }),
    FontAwesomeModule
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
