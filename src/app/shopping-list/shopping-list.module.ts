import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component'
import { ShoppingListRouterModule } from './shopping-list-router.module'
import { ShoppingListComponent } from './shopping-list.component'

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ShoppingListRouterModule,
  ],
})
export class ShoppingListModule {}
