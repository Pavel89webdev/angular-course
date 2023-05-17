import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { CommonModule } from '@angular/common'

import { AppComponent } from './app.component'
import { HeaderComponent } from './header/header.component'
import { RecipesComponent } from './recipes/recipes.component'
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component'
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component'
import { ShoppingListComponent } from './shopping-list/shopping-list.component'
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { DropdownDirective } from './directives/dropdown.directive'
import { ShoppingListService } from './shopping-list/shoppingList.service'
import { AppRouterModule } from './app-router.module'
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component'
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component'
import { RecipiesService } from './recipes/recipes.service'
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component'
import { AuthComponent } from './auth/auth.component'
import { SpinnerComponent } from './shared/spinner/spinner.component'
import { AuthInterceptor } from './auth/auth-interceptor.service'
import { BrowserStorageService } from './auth/browesr-storage.service'
import { AuthGuard } from './auth/auth.guard'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
    RecipeStartComponent,
    RecipeEditComponent,
    RecipeDetailComponent,
    AuthComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    // CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    // custom modules:
    AppRouterModule,
  ],
  providers: [
    ShoppingListService,
    RecipiesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    BrowserStorageService,
    AuthGuard,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
