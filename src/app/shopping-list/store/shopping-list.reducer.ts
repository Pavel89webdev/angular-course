import * as shoppingListActions from './shopping-list.actions'
import { Ingredient } from 'src/app/shared/ingredient.model'

export const NO_INDEX = -1

export interface IShoppingListState {
  ingredients: Ingredient[]
  edinitngIngredientIndex: number
}

const initialState: IShoppingListState = {
  ingredients: [
    new Ingredient('apples', 10),
    new Ingredient('bananas', 5),
  ],
  edinitngIngredientIndex: NO_INDEX,
}

export function shoppingListReducer(
  state: IShoppingListState = initialState,
  action: shoppingListActions.ShoppingListActions
): IShoppingListState {
  switch (action.type) {
    case shoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      }
    case shoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      }
    case shoppingListActions.EDITING_INGREDIENT_START:
      return {
        ...state,
        edinitngIngredientIndex: action.payload,
      }
    case shoppingListActions.UPDATE_INGREDIENT: {
      const editedIndex = state.edinitngIngredientIndex;
      const newIngredient = action.payload

      const newIngredients = [...state.ingredients]
      newIngredients[editedIndex] = newIngredient


      return {
        ...state,
        ingredients: newIngredients,
        edinitngIngredientIndex: NO_INDEX,
      }
    }
    case shoppingListActions.DELETE_INGREDIENT: 
      return {
        ...state,
        ingredients: state.ingredients.filter((_, index) => index !== action.payload)
      } 
    default:
      return state
  }
}
