import { Component, OnDestroy, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs'
import * as auhtActions from '../auth/store/auth.action'
import * as recipeActions from '../recipes/store/recipe.actions'
import { IAppState } from '../store/app.reducer'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  authSub: Subscription
  isAuthenticated = false

  constructor(
    private store: Store<IAppState>
    ) {}

  ngOnInit(): void {
    this.authSub = this.store.select('auth').subscribe(({user}) => {
      this.isAuthenticated = Boolean(user);
    })
  }

  onSaveData() {
    this.store.dispatch(new recipeActions.StoreRecipeAction())
  }

  onFetchData() {
    this.store.dispatch(new recipeActions.FetchAllRecipesStartAction())
  }

  onLogout(){
    this.store.dispatch(new auhtActions.LogoutAction())
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
}
