import { Component, OnInit, Input, OnChanges } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { ShoppingListService } from 'src/app/shopping-list/shoppingList.service'
import { Recipe } from '../recipe.model'
import { RecipiesService } from '../recipes.service'

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipeToView: Recipe

  constructor(
    private shoppingListService: ShoppingListService,
    private route: ActivatedRoute,
    private router: Router,
    private recipiesService: RecipiesService
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
    this.shoppingListService.addIngridients(this.recipeToView.ingredients)
  }

  onDeleteRecipe() {
    this.recipiesService.deleteRecipe(this.recipeToView.id)
    this.router.navigate(['/'])
  }
}
