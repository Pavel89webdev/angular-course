import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from "../shopping-list/store/shopping-list.reducer";
import * as fromAuth from "../auth/store/auth.reducer";
import * as fromRecipe from '../recipes/store/recipe.reducer'

export interface IAppState {
    shoppingList: fromShoppingList.IShoppingListState;
    auth: fromAuth.IAuthState;
    recipes: fromRecipe.IRecipeState
}

export const appReducers: ActionReducerMap<IAppState> = {
    shoppingList: fromShoppingList.shoppingListReducer,
    auth: fromAuth.authReducer,
    recipes: fromRecipe.recipeReducer
}