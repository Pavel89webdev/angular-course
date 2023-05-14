import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import {
  AuthService,
  IAuthResponseData,
  ISinginResponseData,
} from './auth.service'
import { Observable } from 'rxjs'
import { Router } from '@angular/router'
import { ERoutes } from '../app-router.module'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  public mode: 'login' | 'singUp' = 'login'
  public isLoading = false
  public error: string

  public onSwitchGenerator: Generator

  public authForm: FormGroup

  constructor(
    private authService: AuthService,
    private router: Router
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
      yield (this.mode = 'login')
      yield (this.mode = 'singUp')
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
      },
    })
  }
}
