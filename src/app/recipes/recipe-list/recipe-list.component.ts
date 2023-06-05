import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core'
import { Recipe } from '../recipe.model'
import { Subscription } from 'rxjs'
import { IAppState } from 'src/app/store/app.reducer'
import { Store } from '@ngrx/store'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = []
  recipiesStoreSub: Subscription

  constructor(
    private store: Store<IAppState>
    ) {}

  ngOnInit(): void {
    this.recipiesStoreSub = this.store.select('recipes').subscribe(
      (recipies) => {
        this.recipes = recipies.recipes
      }
    )
  }

  ngOnDestroy(): void {
    this.recipiesStoreSub.unsubscribe()
  }
}
