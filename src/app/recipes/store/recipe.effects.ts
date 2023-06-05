import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators'
import { of } from 'rxjs'
import * as recipeActions from './recipe.actions'
import { Recipe } from '../recipe.model'
import { Store } from '@ngrx/store'
import { IAppState } from 'src/app/store/app.reducer'
import { HttpClient } from '@angular/common/http'

@Injectable()
export class RecipeEffect {
  RECIPES_URL =
    'https://angular-course-81648-default-rtdb.firebaseio.com/recipes.json'

  fetchRecipes = createEffect(() => {
    return this.actions$.pipe(
      ofType(recipeActions.FETCH_ALL_RECIPES_START),
      switchMap(() => {
        return this.http.get<Recipe[]>(this.RECIPES_URL)
      }),
      map((recipes) => {
        const recipesToStore = recipes.map((recipe) => {
          const { ingredients } = recipe

          return {
            ...recipe,
            ingredients: ingredients ? ingredients : [],
          }
        })

        return new recipeActions.SetRecipeAction(recipesToStore)
      }),
      catchError(() => {
        return of(new recipeActions.FetchRecipeFailAction('some goes wrong'))
      })
    )
  })

  storeRecipes = createEffect(() => {
    return this.actions$.pipe(
      ofType(recipeActions.STORE_RECIPES),
      withLatestFrom(this.store.select('recipes')),
      switchMap(([_, { recipes }]) => {
        return this.http
          .put(
            // override all data
            this.RECIPES_URL,
            recipes
          )
      })
    )
  }, { dispatch: false })

  constructor(
    private actions$: Actions,
    private store: Store<IAppState>,
    private http: HttpClient
  ) {}
}
