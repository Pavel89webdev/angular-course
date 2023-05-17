import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component'
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component'
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component'
import { RecipesComponent } from './recipes/recipes.component'
import { ShoppingListComponent } from './shopping-list/shopping-list.component'
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component'
import { RecipeResolverService } from './recipes/recipe-resolver.service'
import { AuthComponent } from './auth/auth.component'
import { AuthGuard } from './auth/auth.guard'

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
    component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: RecipeStartComponent,
      },
      {
        path: 'new',
        component: RecipeEditComponent,
      },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipeResolverService],
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [RecipeResolverService],
      },
    ],
  },
  {
    path: ERoutes.shoppingList,
    component: ShoppingListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ERoutes.auth,
    component: AuthComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRouterModule {}
