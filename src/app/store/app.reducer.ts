import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from "../shopping-list/store/shopping-list.reducer";
import * as fromAuth from "../auth/store/auth.reducer";

export interface IAppState {
    shoppingList: fromShoppingList.IShoppingListState
    auth: fromAuth.IAuthState
}

export const appReducers: ActionReducerMap<IAppState> = {
    shoppingList: fromShoppingList.shoppingListReducer,
    auth: fromAuth.authReducer,
}