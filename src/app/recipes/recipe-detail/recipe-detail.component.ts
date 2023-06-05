import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { Recipe } from '../recipe.model'
import { Store } from '@ngrx/store'
import * as fromApp from 'src/app/store/app.reducer'
import * as fromShoppingListActions from '../../shopping-list/store/shopping-list.actions'
import { Subscription } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import * as recipeActions from '../store/recipe.actions';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit, OnDestroy  {
  recipeToView: Recipe
  private id: string

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.IAppState>
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(
      map(({ id }: Params) => {
        this.id = id;
      }),
      switchMap(() => {
        return this.store.select('recipes')
      })
    ).subscribe(({ recipes }) => {
      this.setRecipeFromStore(this.id, recipes)
    })
  }

  setRecipeFromStore(idToView: string, recipes: Recipe[]) {
    if (idToView && recipes.length) {
      this.recipeToView = recipes.find(({id}) => id === idToView)
    }
  }

  toShoppingList() {
    this.store.dispatch(new fromShoppingListActions.AddIngridientsAction(this.recipeToView.ingredients))
  }

  onDeleteRecipe() {
    this.router.navigate(['/']).finally(() => {
      this.store.dispatch(new recipeActions.DeleteRecipeAction(this.recipeToView.id))
    })
  }

  ngOnDestroy(): void {
  }
  
}
