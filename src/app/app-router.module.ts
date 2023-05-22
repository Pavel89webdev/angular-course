import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthComponent } from './auth/auth.component'

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
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRouterModule {}
