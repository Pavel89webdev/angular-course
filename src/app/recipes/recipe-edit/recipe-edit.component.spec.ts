import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RecipeEditComponent } from './recipe-edit.component'
import { StoreModule } from '@ngrx/store'
import { appReducers } from 'src/app/store/app.reducer'
import { AppRouterModule } from 'src/app/app-router.module'

describe('RecipeEditComponent', () => {
  let component: RecipeEditComponent
  let fixture: ComponentFixture<RecipeEditComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(appReducers),
        AppRouterModule
      ],
      declarations: [RecipeEditComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
