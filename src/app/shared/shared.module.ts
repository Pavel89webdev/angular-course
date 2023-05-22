import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { AlertComponent } from './alert/alert.component'
import { SpinnerComponent } from './spinner/spinner.component'
import { DropdownDirective } from '../directives/dropdown.directive'
import { AppPlaceHolderDirective } from '../directives/placeholder.directive'

@NgModule({
  imports: [CommonModule],
  declarations: [
    AlertComponent,
    SpinnerComponent,
    // directives
    DropdownDirective,
    AppPlaceHolderDirective,
  ],
  exports: [
    CommonModule,
    AlertComponent,
    SpinnerComponent,
    // directives
    DropdownDirective,
    AppPlaceHolderDirective,
  ],
})
export class SharedModule {}
