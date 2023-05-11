import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {

  public mode: 'login' | 'singUp' = 'singUp';

  public onSwitchGenerator: Generator;

  public authForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.authForm = new FormGroup({
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      email: new FormControl(null, [Validators.required, Validators.email])
    })
  }

  private *onSwitchMode() {
    while(true){
     yield this.mode = 'login';  
     yield this.mode = 'singUp';  
    }
  }

  onSwitch() {
    if(this.onSwitchGenerator) {
      this.onSwitchGenerator.next();
      return;
    }

    this.onSwitchGenerator = this.onSwitchMode();
    this.onSwitchGenerator.next();
  }

  onSubmit(){
    console.log(this.authForm);
  }

  
}
