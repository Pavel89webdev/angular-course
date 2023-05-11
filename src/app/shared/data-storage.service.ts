import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { RecipiesService } from '../recipes/recipes.service'
import { Recipe } from '../recipes/recipe.model'
import { map, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private BASE_URL = 'https://angular-course-81648-default-rtdb.firebaseio.com'
  private RECIPES_URL = `${this.BASE_URL}/recipes.json`

  constructor(
    private http: HttpClient,
    private recipesService: RecipiesService
  ) {}

  storeRecipies() {
    const recipes = this.recipesService.getRecipies()

    this.http
      .put(
        // override all data
        this.RECIPES_URL,
        recipes
      )
      .subscribe((result) => console.log(result))
  }

  getRecipes() {
    return this.http
      .get<Recipe[]>(this.RECIPES_URL)
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            const { ingredients } = recipe

            return {
              ...recipe,
              ingredients: ingredients ? ingredients : [],
            }
          })
        })
      )
      .pipe(
        tap((result) => {
          this.recipesService.updateAllRecipes(result)
        })
      )
  }
}
