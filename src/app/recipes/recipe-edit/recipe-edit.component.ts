import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { Recipe } from '../recipe.model'
import { RecipiesService } from '../recipes.service'

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
  private recipeIndex: number

  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipiesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id
      this.mode = Boolean(params.id) ? 'edit' : 'new'

      if (this.mode === 'edit') {
        const [recipe, index] = this.recipesService.getRecipieById(this.id)

        this.recipe = recipe
        this.recipeIndex = index
      } else {
        this.recipe = null
      }

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
      ingredients: new FormArray(ingredients),
    })
  }

  get ingredients() {
    return this.recipeFormGroup.get('ingredients') as FormArray
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
    const ingredients = <FormArray>this.recipeFormGroup.get('ingredients')
    const newIngredientFormGroup = this.getNewIngredientFormGroup(null, null)

    ingredients.push(newIngredientFormGroup)
  }

  navigateBack() {
    this.router.navigate([this.id], { relativeTo: this.route.parent })
  }

  onCancel() {
    this.navigateBack()
  }

  onSubmit() {
    if (this.mode === 'edit') {
      this.recipesService.updateRecipe(this.recipeIndex, {
        ...this.recipeFormGroup.value,
        id: this.id,
      })
    } else {
      const newId = this.recipesService.getNextId()
      this.recipesService.addRecipe({
        ...this.recipeFormGroup.value,
        id: newId,
      })
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
