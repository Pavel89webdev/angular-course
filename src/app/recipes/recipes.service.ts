import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';
import { Subject } from 'rxjs';

export class RecipiesService {

  public recipiesSubject = new Subject<Recipe[]>();

  // private recipies: Recipe[] = [
  //   new Recipe(
  //     'Simplest burger',
  //     'Very simple to cook',
  //     'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1153&q=80',
  //     [
  //       new Ingredient('Meat', 1),
  //       new Ingredient('Bread', 2),
  //     ],
  //     '1'
  //   ),
  //   new Recipe(
  //     'Fruit salad local',
  //     'Summer fruit salad',
  //     'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1153&q=80',
  //     [
  //       new Ingredient('Apple', 2),
  //       new Ingredient('Carrot', 2),
  //       new Ingredient('Orange', 1),
  //     ],
  //     '2'
  //   ),
  // ];
  private recipies: Recipe[] = [];

  getRecipies(){
    return [...this.recipies];
  }

  getRecipieById(recipeId: string): [Recipe, number] {
    return [
      this.recipies.find(({id}) => id === recipeId), 
      this.recipies.findIndex(({id}) => id === recipeId)
    ];
  }

  addRecipe(recipe: Recipe){
    this.recipies.push(recipe);
    this.recipiesSubject.next([...this.recipies])
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipies[index] = recipe;
    this.recipiesSubject.next([...this.recipies])
  }

  updateAllRecipes(newRecipes: Recipe[]){
    this.recipies = newRecipes;
    this.recipiesSubject.next(this.getRecipies())
  }

  getNextId() {
   return String(this.recipies.length + 1);
  }

  deleteRecipe(id: string) {
    const [ _ ,recipeIndex] = this.getRecipieById(id);
    this.recipies.splice(recipeIndex, 1);
    this.recipiesSubject.next(this.recipies);
  }
}
