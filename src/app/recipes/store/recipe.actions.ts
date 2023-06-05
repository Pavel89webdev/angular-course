import { Action } from '@ngrx/store'
import { Recipe } from '../recipe.model'

export const SET_RECIPES = '[recipe] set recipes'
export const ADD_RECIPE = '[recipe] add recipe'
export const UPDATE_RECIPE = '[recipe] update recipe'
export const DELETE_RECIPE = '[recipe] delete recipe'

export const FETCH_ALL_RECIPES_START = '[recipe] fetch all recipes start'
export const FETCH_RECIPES_FAIL = '[recipe] fetch recipes fail'

export const STORE_RECIPES = '[recipe] store recipes'

export class SetRecipeAction implements Action {
  readonly type = SET_RECIPES

  constructor(public payload: Recipe[]) {}
}

export class AddRecipeAction implements Action {
  readonly type = ADD_RECIPE

  constructor(public payload: Recipe) {}
}

export class UpdateRecipeAction implements Action {
  readonly type = UPDATE_RECIPE

  constructor(public payload: { recipe: Recipe; id: string }) {}
}

export class DeleteRecipeAction implements Action {
  readonly type = DELETE_RECIPE

  constructor(public payload: string) {}
}

export class FetchAllRecipesStartAction implements Action {
  readonly type = FETCH_ALL_RECIPES_START
}

export class FetchRecipeFailAction implements Action {
  readonly type = FETCH_RECIPES_FAIL

  constructor(public payload: string) {}
}

export class StoreRecipeAction implements Action {
  readonly type = STORE_RECIPES
}

export type RecipeActions =
  | SetRecipeAction
  | AddRecipeAction
  | UpdateRecipeAction
  | DeleteRecipeAction
  | FetchAllRecipesStartAction
  | FetchRecipeFailAction
  | StoreRecipeAction
