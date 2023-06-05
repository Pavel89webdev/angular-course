import { Recipe } from '../recipe.model'
import * as recipeActions from './recipe.actions'

export interface IRecipeState {
  recipes: Recipe[]
}

const initialState: IRecipeState = {
  recipes: [],
}

export const recipeReducer = (
  state = initialState,
  action: recipeActions.RecipeActions
): IRecipeState => {
  switch (action.type) {
    case recipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
      }
    case recipeActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      }
    case recipeActions.UPDATE_RECIPE:
      const { id, recipe: recipeFromAction } = action.payload
      const newRecipes = state.recipes.map((recipe) => {
        if (recipe.id === id) {
          return recipeFromAction
        }
        return recipe
      })

      return {
        ...state,
        recipes: newRecipes,
      }
    case recipeActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter(({ id }) => id !== action.payload),
      }
    default:
      return state
  }
}
