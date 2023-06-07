import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AuthComponent } from './auth.component'
import { StoreModule } from '@ngrx/store'
import { appReducers } from '../store/app.reducer'

describe('AuthComponent', () => {
  let component: AuthComponent
  let fixture: ComponentFixture<AuthComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(appReducers),
      ],
      declarations: [AuthComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
