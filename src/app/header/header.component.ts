import { Component, OnDestroy, OnInit } from '@angular/core'
import { DataStorageService } from '../shared/data-storage.service'
import { AuthService } from '../auth/auth.service'
import { Subscription } from 'rxjs'
import { IAppState } from '../store/app.reducer'
import { Store } from '@ngrx/store'
import * as auhtActions from '../auth/store/auth.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  authSub: Subscription
  isAuthenticated = false

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private store: Store<IAppState>
    ) {}

  ngOnInit(): void {
    this.authSub = this.store.select('auth').subscribe(({user}) => {
      this.isAuthenticated = Boolean(user);
    })
  }

  onSaveData() {
    this.dataStorageService.storeRecipies()
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe()
  }

  onLogout(){
    this.store.dispatch(new auhtActions.LogoutAction())
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
}
