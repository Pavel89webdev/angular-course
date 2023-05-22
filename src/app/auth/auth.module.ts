import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from "../shared/shared.module";
import { ERoutes } from "../app-router.module";

const routes: Routes = [
    {
    path: ERoutes.auth,
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