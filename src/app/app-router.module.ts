import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'

export enum ERoutes {
  recipies = 'recipies',
  shoppingList = 'shopping-list',
  auth='auth',
}

const routes: Routes = [
  {
    path: '',
    redirectTo: `/${ERoutes.recipies}`,
    pathMatch: 'full',
  },
  {
    path: ERoutes.recipies,
    loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)
  },
  {
    path: ERoutes.shoppingList,
    loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)
  },
  {
    path: ERoutes.auth,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }

]

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule],
})
export class AppRouterModule {}
