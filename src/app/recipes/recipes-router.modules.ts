import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes.component";
import { RecipeResolver } from "./recipes-resolver.service";

const recipesRoutes: Routes = [
    {
        path: '',
        component: RecipesComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: RecipeStartComponent,
            resolve: [RecipeResolver]
          },
          {
            path: 'new',
            component: RecipeEditComponent,
            resolve: [RecipeResolver]
          },
          {
            path: ':id',
            component: RecipeDetailComponent,
            resolve: [RecipeResolver]
          },
          {
            path: ':id/edit',
            component: RecipeEditComponent,
            resolve: [RecipeResolver]
          },
        ],
      },
];

@NgModule({
    imports: [RouterModule.forChild(recipesRoutes)],
    exports: [RouterModule]
})
export class RecipesRouterModule {}