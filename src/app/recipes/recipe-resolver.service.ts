import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router'
import { Recipe } from './recipe.model'
import { Observable } from 'rxjs'
import { DataStorageService } from '../shared/data-storage.service'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { RecipiesService } from './recipes.service'

@Injectable({
  providedIn: 'root',
})
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipesSevice: RecipiesService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    const recipes = this.recipesSevice.getRecipies()

    if (recipes.length) {
      return recipes
    }

    return this.dataStorageService.getRecipes()
  }
}
