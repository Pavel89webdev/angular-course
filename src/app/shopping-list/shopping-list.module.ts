import { NgModule } from '@angular/core'
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component'
import { ShoppingListComponent } from './shopping-list.component'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ShoppingListService } from './shoppingList.service'
import { ShoppingListRouterModule } from './shopping-list-router.module'

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  providers: [ShoppingListService],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ShoppingListRouterModule,
  ],
})
export class ShoppingListModule {}
