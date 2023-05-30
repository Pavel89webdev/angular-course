import { Action } from '@ngrx/store'
import { Ingredient } from 'src/app/shared/ingredient.model'

export const ADD_INGREDIENT = 'ADD_INGREDIENT'
export const ADD_INGREDIENTS = 'ADD_INGREDIENS'

export const EDITING_INGREDIENT_START = 'EDITING_INGREDIENT_START'
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT'

export const DELETE_INGREDIENT = 'DELETE_INGREDIENT'

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
