import { Component, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { AppPlaceHolderDirective } from '../directives/placeholder.directive'
import { AlertComponent } from '../shared/alert/alert.component'
import { IAppState } from '../store/app.reducer'
import * as authActoins from './store/auth.action'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  public mode: 'login' | 'singUp' = 'login'
  public isLoading = false
  public error: string
  public onSwitchGenerator: Generator
  public authForm: FormGroup
  private errorAlertCloseSub: EventEmitter<void>

  private storeSub: Subscription

  @ViewChild(AppPlaceHolderDirective) placeToPastAlertRef: AppPlaceHolderDirective;

  constructor(
    private store: Store<IAppState>
    ) {}

  ngOnInit(): void {
    this.authForm = new FormGroup({
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
    })

    this.storeSub = this.store.select('auth').subscribe((authState) => {

      const { errorMessage, logginInProcess, user } = authState;

      this.isLoading = logginInProcess;
      this.error = errorMessage;
      if(this.error){
        this.setErrorModal(this.error);
      }

    })
  }

  private *onSwitchMode() {
    while (true) {
      yield (this.mode = 'singUp')
      yield (this.mode = 'login')
    }
  }

  onSwitch() {
    if (this.onSwitchGenerator) {
      this.onSwitchGenerator.next()
      return
    }

    this.onSwitchGenerator = this.onSwitchMode()
    this.onSwitchGenerator.next()
  }

  onSubmit() {
    if (this.authForm.invalid) return

    this.isLoading = true;

    const { email, password } = this.authForm.value

    if (this.mode === 'singUp') {
      this.store.dispatch(new authActoins.SingupStartAction({
        email,
        password
      }))
    }
    if (this.mode === 'login') {
      this.store.dispatch(new authActoins.LoginStartAction({
        email,
        password
      }))
    }
  }

  setErrorModal(errorMessage: string){
    const viewContainerRef = this.placeToPastAlertRef.viewContainerRef;

    viewContainerRef.clear();
    const alertCmponentRef = viewContainerRef.createComponent(AlertComponent);

    alertCmponentRef.instance.message = errorMessage; 
    this.errorAlertCloseSub = alertCmponentRef.instance.close;

    this.errorAlertCloseSub.subscribe(() => {
      viewContainerRef.clear();
      this.errorAlertCloseSub.unsubscribe()
    })
  }

  ngOnDestroy(): void {
    if(this.errorAlertCloseSub){
      this.errorAlertCloseSub.unsubscribe()
    }

    this.storeSub.unsubscribe()
  }
}
