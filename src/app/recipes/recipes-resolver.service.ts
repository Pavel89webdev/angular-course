import { Resolve } from '@angular/router'
import { Recipe } from './recipe.model'
import { IAppState } from '../store/app.reducer'
import { Store } from '@ngrx/store'
import * as recipeActions from './store/recipe.actions'
import { Actions, ofType } from '@ngrx/effects'
import { map, switchMap, take } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { Observable, of, Subject } from 'rxjs'

@Injectable()
export class RecipeResolver implements Resolve<Recipe[]> {
  constructor(private store: Store<IAppState>, private action$: Actions) {}

  resolve() {
    return this.store.select('recipes').pipe(
      take(1),
      switchMap(({ recipes }) => {
        if (recipes.length) {
          return of(recipes)
        } else {
          this.store.dispatch(new recipeActions.FetchAllRecipesStartAction())

          return this.action$.pipe(
            ofType(recipeActions.SET_RECIPES),
            map((setRecipeAction: recipeActions.SetRecipeAction) => {
              return setRecipeAction.payload
            }),
            take(1)
          )
        }
      })
    )
  }
}
