import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { SharedModule } from '../shared/shared.module'
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component'
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component'
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component'
import { RecipeListComponent } from './recipe-list/recipe-list.component'
import { RecipeStartComponent } from './recipe-start/recipe-start.component'
import { RecipesRouterModule } from './recipes-router.modules'
import { RecipesComponent } from './recipes.component'
import { RecipeResolver } from './recipes-resolver.service'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    RecipesRouterModule,
    SharedModule,
    // RecipeResolver
  ],
  providers: [
    RecipeResolver
  ],
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,
    RecipeDetailComponent,
  ],
})
export class RecipesModule {}
