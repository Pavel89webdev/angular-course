import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'

import { NgForm } from '@angular/forms'
import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs'
import { Ingredient } from 'src/app/shared/ingredient.model'
import { IAppState } from 'src/app/store/app-store'
import * as shoppingListActions from 'src/app/store/shopping-list/shopping-list.actions'
import { NO_INDEX } from 'src/app/store/shopping-list/shopping-list.reducer'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @Output() submitItem = new EventEmitter<Ingredient>()
  @ViewChild('formRef') formRef: NgForm

  mode: 'new' | 'edit' = 'new'
  editingIndex = NO_INDEX;
  shoppingListSub: Subscription

  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.shoppingListSub = this.store.select('shoppingList').subscribe((shoppingList) => {
      const { edinitngIngredientIndex, ingredients } = shoppingList;

      this.editingIndex = edinitngIngredientIndex;

      if (this.editingIndex !== NO_INDEX) {
        const editingIngridient = ingredients[this.editingIndex]

        this.formRef.setValue({
          name: editingIngridient?.name,
          amount: editingIngridient?.amount,
        })

        this.mode = 'edit'
      }
    })
  }

  onSubmit(form: NgForm) {
    const newIngredient = new Ingredient(form.value.name, form.value.amount)

    if (this.mode === 'edit') {
      this.store.dispatch(
        new shoppingListActions.UpdateIngridientAction(newIngredient)
      )
    } else {
      this.store.dispatch(
        new shoppingListActions.AddIngridientAction(newIngredient)
      )
    }

    this.formRef.resetForm()
    this.mode = 'new'
  }

  onDelete() {
    this.store.dispatch(
      new shoppingListActions.DeleteIngridientAction(this.editingIndex)
    )
    this.formRef.resetForm()
    this.mode = 'new'
  }

  ngOnDestroy(): void {
    this.shoppingListSub.unsubscribe()    
  }
}
