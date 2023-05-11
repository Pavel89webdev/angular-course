import { Ingredient } from '../shared/ingredient.model'

export class Recipe {
  public name: string
  public description: string
  public imagePath: string
  public ingredients: Ingredient[]
  public id: string

  constructor(
    name: string,
    descr: string,
    imagePath: string,
    ingredients: Ingredient[],
    id: string
  ) {
    this.name = name
    this.description = descr
    this.imagePath = imagePath
    this.ingredients = ingredients
    this.id = id
  }
}
