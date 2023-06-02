import { Component, OnInit, Input, OnChanges } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { Recipe } from '../recipe.model'
import { RecipiesService } from '../recipes.service'
import { Store } from '@ngrx/store'
import * as fromApp from 'src/app/store/app.reducer'
import * as fromShoppingListActions from '../../shopping-list/store/shopping-list.actions'


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipeToView: Recipe

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipiesService: RecipiesService,
    private store: Store<fromApp.IAppState>
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id']

    this.route.params.subscribe(({ id }: Params) => {
      this.setRecipeFromService(id)
    })
  }

  setRecipeFromService(id?: string) {
    if (id) {
      const [recipe] = this.recipiesService.getRecipieById(id)
      this.recipeToView = recipe
    }
  }

  toShoppingList() {
    this.store.dispatch(new fromShoppingListActions.AddIngridientsAction(this.recipeToView.ingredients))
  }

  onDeleteRecipe() {
    this.recipiesService.deleteRecipe(this.recipeToView.id)
    this.router.navigate(['/'])
  }
}
