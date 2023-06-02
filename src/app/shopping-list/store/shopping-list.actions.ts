import { Action } from '@ngrx/store'
import { Ingredient } from 'src/app/shared/ingredient.model'

export const ADD_INGREDIENT = '[shoppingList] add ingredient'
export const ADD_INGREDIENTS = '[shoppingList] add ingredients'

export const EDITING_INGREDIENT_START = '[shoppingList] editing ingredient start'
export const UPDATE_INGREDIENT = '[shoppingList] update ingredient'

export const DELETE_INGREDIENT = '[shoppingList] delete ingredient'

export class AddIngridientAction implements Action {
  readonly type = ADD_INGREDIENT

  constructor(public payload: Ingredient) {}
}

export class AddIngridientsAction implements Action {
  readonly type = ADD_INGREDIENTS

  constructor(public payload: Ingredient[]) {}
}

export class EditIngridientStartAction implements Action {
  readonly type = EDITING_INGREDIENT_START

  constructor(public payload: number) {} // index of editing ingredient
}

export class UpdateIngridientAction implements Action {
  readonly type = UPDATE_INGREDIENT

  constructor(public payload: Ingredient) {}
}

export class DeleteIngridientAction implements Action {
  readonly type = DELETE_INGREDIENT

  constructor(public payload: number) {}
}

export type ShoppingListActions =
  | AddIngridientAction
  | AddIngridientsAction
  | EditIngridientStartAction
  | UpdateIngridientAction
  | DeleteIngridientAction
