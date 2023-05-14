import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { RecipiesService } from '../recipes/recipes.service'
import { Recipe } from '../recipes/recipe.model'
import { exhaustMap, map, take, tap } from 'rxjs/operators'
import { AuthService } from '../auth/auth.service'

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private BASE_URL = 'https://angular-course-81648-default-rtdb.firebaseio.com'
  private RECIPES_URL = `${this.BASE_URL}/recipes.json`

  constructor(
    private http: HttpClient,
    private recipesService: RecipiesService,
    private authService: AuthService
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

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://angular-course-81648-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            const { ingredients } = recipe

            return {
              ...recipe,
              ingredients: ingredients ? ingredients : [],
            }
          })
        }),
        tap((result) => {
          this.recipesService.updateAllRecipes(result)
        })
      )
  }
}
