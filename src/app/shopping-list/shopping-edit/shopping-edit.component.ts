import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shoppingList.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {

  @Output() submitItem = new EventEmitter<Ingredient>();
  @ViewChild('formRef') formRef: NgForm;

  mode: 'new' | 'edit' = 'new';

  constructor(
    private shoppingListService: ShoppingListService,
  ) {}

  ngOnInit(): void {
    this.shoppingListService.editingIngredient$
    .subscribe(
      (ingredient: Ingredient) => {
        // сетить значение в форму
        this.formRef.setValue({ name: ingredient.name, amount: ingredient.amount });
        this.mode = 'edit';
      }
    )
  }

  onSubmit(form: NgForm) {
    const newIngredient = new Ingredient(form.value.name, form.value.amount);

    if(this.mode === 'edit') {
      this.shoppingListService.updateIngredient(this.shoppingListService.editingIngredientIndex, newIngredient);
    } else {
      this.shoppingListService.addIngridient(newIngredient);
    }

    this.formRef.resetForm();
    this.mode = 'new';

  }

  onDelete() {
    this.shoppingListService.deleteIngredient();
    this.formRef.resetForm();
    this.mode = 'new';
  }
}
