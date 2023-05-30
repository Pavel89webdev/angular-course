// rewrite to module

import { IShoppingListState, shoppingListReducer } from "./shopping-list/shopping-list.reducer";

export interface IAppState {
    shoppingList: IShoppingListState
}

export const appStoreConfig = {
    shoppingList: shoppingListReducer
}