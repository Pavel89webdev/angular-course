import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { UntypedFormArray, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { Recipe } from '../recipe.model'
import { Store } from '@ngrx/store'
import { IAppState } from 'src/app/store/app.reducer'
import * as recipeActions from '../store/recipe.actions'
import { map, switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit, OnChanges {
  private id: string
  public recipeFormGroup: FormGroup
  private mode: 'new' | 'edit' = 'new'
  private recipe: Recipe
  private allRecipes: Recipe[]

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<IAppState>
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params: Params) => {
          return params.id
        }),
        switchMap((id) => {
          this.id = id
          this.mode = this.id ? 'edit' : 'new';
          return this.store.select('recipes')
        })
      )
      .subscribe((recipesState) => {
        this.allRecipes = recipesState.recipes
        this.recipe = recipesState.recipes.find(({ id }) => id === this.id)
        this.initForm()
      })

    this.initForm()
  }

  initForm(): void {
    const ingredients = (this.recipe?.ingredients || []).map(
      ({ name, amount }) => this.getNewIngredientFormGroup(name, amount)
    )

    this.recipeFormGroup = new FormGroup({
      name: new FormControl(this.recipe?.name || null, Validators.required),
      imagePath: new FormControl(
        this.recipe?.imagePath || null,
        Validators.required
      ),
      description: new FormControl(
        this.recipe?.description || null,
        Validators.required
      ),
      ingredients: new UntypedFormArray(ingredients),
    })
  }

  get ingredients() {
    return this.recipeFormGroup.get('ingredients') as UntypedFormArray
  }

  private getNewIngredientFormGroup(
    name: string | null,
    amount: number | null
  ) {
    return new FormGroup({
      name: new FormControl(name, Validators.required),
      amount: new FormControl(amount, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
      ]),
    })
  }

  addIngredient() {
    const ingredients = <UntypedFormArray>this.recipeFormGroup.get('ingredients')
    const newIngredientFormGroup = this.getNewIngredientFormGroup(null, null)

    ingredients.push(newIngredientFormGroup)
  }

  navigateBack() {
    this.router.navigate([this.id || ''], { relativeTo: this.route.parent })
  }

  onCancel() {
    this.navigateBack()
  }

  onSubmit() {
    if (this.mode === 'edit') {
      const editedRecipe = new Recipe(
        this.recipeFormGroup.value.name,
        this.recipeFormGroup.value.description,
        this.recipeFormGroup.value.imagePath,
        this.recipeFormGroup.value.ingredients,
        this.id
      )

      this.store.dispatch(
        new recipeActions.UpdateRecipeAction({
          id: this.id,
          recipe: editedRecipe,
        })
      )
    } else {
      const newId = String(Number(this.allRecipes[this.allRecipes.length - 1].id) + 1)

      const newRecipe = new Recipe(
        this.recipeFormGroup.value.name,
        this.recipeFormGroup.value.description,
        this.recipeFormGroup.value.imagePath,
        this.recipeFormGroup.value.ingredients,
        newId
      )

      this.store.dispatch(new recipeActions.AddRecipeAction(newRecipe))
      this.id = newId
    }

    this.navigateBack()

    console.log(this.ingredients)
  }

  onDeleteIngredient(index: number) {
    this.ingredients.removeAt(index)
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.ingredients)
  }
}
