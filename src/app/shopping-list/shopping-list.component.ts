import { Component, OnDestroy, OnInit } from '@angular/core'
import { Ingredient } from '../shared/ingredient.model'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import * as fromShoppingListActions from './store/shopping-list.actions'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredientsSub: Observable<Ingredient[]>

  constructor(
    private store: Store<fromApp.IAppState>
    ) {}

  ngOnInit(): void {
    this.ingredientsSub = this.store.select((state) => state.shoppingList.ingredients)
  }

  addToEditing(index: number) {
    this.store.dispatch(new fromShoppingListActions.EditIngridientStartAction(index))
  }
}
