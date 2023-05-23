import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AuthComponent } from "./auth.component";

const routes: Routes = [
    {
    path: '',
    component: AuthComponent
  }
]

@NgModule({
    declarations: [AuthComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(routes),
        HttpClientModule,
        SharedModule
    ],
    exports: [
        AuthComponent,
        RouterModule,
    ]
})
export class AuthModule {}