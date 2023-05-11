import { Subject } from 'rxjs'

import { Ingredient } from '../shared/ingredient.model'

export class ShoppingListService {
  public ingredientsListChange$ = new Subject<Ingredient[]>()
  public editingIngredient$ = new Subject<Ingredient>()
  public editingIngredientIndex: number

  private ingredientsList: Ingredient[] = [
    new Ingredient('apples', 10),
    new Ingredient('bananas', 5),
  ]

  getIngredients() {
    return [...this.ingredientsList]
  }

  addIngridient(ingredient: Ingredient) {
    this.ingredientsList.push(ingredient)
    this.ingredientsListChange$.next([...this.ingredientsList])
  }

  addIngridients(ingredients: Ingredient[]) {
    this.ingredientsList.push(...ingredients)
    this.ingredientsListChange$.next([...this.ingredientsList])
  }

  startEditing(index: number) {
    this.editingIngredientIndex = index
    this.editingIngredient$.next(this.ingredientsList[index])
    // удалять этот item из списка продуктовтмь
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredientsList[index] = newIngredient
    this.ingredientsListChange$.next([...this.ingredientsList])
    this.editingIngredientIndex = null
  }

  deleteIngredient() {
    this.ingredientsList.splice(this.editingIngredientIndex, 1)
    this.editingIngredientIndex = null
    this.ingredientsListChange$.next([...this.ingredientsList])
  }
}
