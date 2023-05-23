import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { FormsModule } from '@angular/forms'
import { AppRouterModule } from './app-router.module'
import { AppComponent } from './app.component'
import { AuthInterceptor } from './auth/auth-interceptor.service'
import { AuthGuard } from './auth/auth.guard'
import { BrowserStorageService } from './auth/browesr-storage.service'
import { HeaderComponent } from './header/header.component'
import { RecipiesService } from './recipes/recipes.service'
import { SharedModule } from './shared/shared.module'

@NgModule({
  declarations: [
    HeaderComponent,
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    // custom modules:
    SharedModule,
    AppRouterModule,
  ],
  providers: [
    RecipiesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    BrowserStorageService,
    AuthGuard,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
