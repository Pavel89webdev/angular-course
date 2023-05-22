import { NgModule } from '@angular/core'
import { Router, RouterModule, Routes } from '@angular/router'
import { ERoutes } from '../app-router.module'
import { AuthGuard } from '../auth/auth.guard'
import { ShoppingListComponent } from './shopping-list.component'

const routes: Routes = [
  {
    path: ERoutes.shoppingList,
    component: ShoppingListComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingListRouterModule {}
