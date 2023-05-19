import { Component, ComponentFactoryResolver, OnInit, ViewChild, EventEmitter, OnDestroy } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import {
  AuthService,
  IAuthResponseData,
  ISinginResponseData,
} from './auth.service'
import { Observable, Subscription } from 'rxjs'
import { Router } from '@angular/router'
import { ERoutes } from '../app-router.module'
import { AlertComponent } from '../shared/alert/alert.component'
import { AppPlaceHolderDirective } from '../directives/placeholder.directive'

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

  @ViewChild(AppPlaceHolderDirective) placeToPastAlertRef: AppPlaceHolderDirective;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFectoryResolver: ComponentFactoryResolver,
    ) {}

  ngOnInit(): void {
    this.authForm = new FormGroup({
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
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
    console.log(this.authForm)

    if (this.authForm.invalid) return

    this.isLoading = true;
    this.error = null;

    let authObs: Observable<ISinginResponseData | IAuthResponseData>

    const { email, password } = this.authForm.value

    if (this.mode === 'singUp') {
      authObs = this.authService.singUp({
        email,
        password,
      })
    }
    if (this.mode === 'login') {
      authObs = this.authService.login({
        email,
        password,
      })
    }

    authObs.subscribe({
      next: (result) => {
        this.router.navigate([`/${ERoutes.recipies}`])
      },
      error: (errorMessage) => {
        this.error = errorMessage
        this.isLoading = false
        this.setErrorModal(errorMessage)
      },
    })
  }

  onErrorHandle() {
    this.error = null;
  }

  setErrorModal(errorMessage: string){
    // const alertComponentFactory = this.componentFectoryResolver.resolveComponentFactory(AlertComponent); - it not required for now,. Now we can pass component directly to createComponent method
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
  }
}
