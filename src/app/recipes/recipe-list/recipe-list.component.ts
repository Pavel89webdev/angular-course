import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipiesService } from '../recipes.service';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  recipiesServiceSub: Subscription;

  constructor(
    private recipiesService: RecipiesService,
  ) { }

  ngOnInit(): void {
    this.recipes = this.recipiesService.getRecipies();

    this.recipiesServiceSub = this.recipiesService.recipiesSubject.subscribe((newRecipies) => {
      this.recipes = newRecipies;
    })
  }

  ngOnDestroy(): void {
    this.recipiesServiceSub.unsubscribe()
  }
}
