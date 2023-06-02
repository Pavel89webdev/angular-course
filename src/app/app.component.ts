import { Component, OnInit } from '@angular/core'
import { IAppState } from './store/app.reducer'
import * as authActions from './auth/store/auth.action'
import { Store } from '@ngrx/store'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    '../../node_modules/bootstrap/dist/css/bootstrap.css',
    './app.component.css',
  ],
})
export class AppComponent implements OnInit {
  title = 'course-app'

  constructor(
    private store: Store<IAppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new authActions.AutoLoginAction())
  }
}
