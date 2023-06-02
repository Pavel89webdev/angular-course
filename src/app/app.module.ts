import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { StoreModule } from '@ngrx/store';

import { FormsModule } from '@angular/forms'
import { AppRouterModule } from './app-router.module'
import { AppComponent } from './app.component'
import { AuthInterceptor } from './auth/auth-interceptor.service'
import { AuthGuard } from './auth/auth.guard'
import { BrowserStorageService } from './auth/browesr-storage.service'
import { HeaderComponent } from './header/header.component'
import { RecipiesService } from './recipes/recipes.service'
import { SharedModule } from './shared/shared.module'
import { appReducers } from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffect } from './auth/store/auth.effect';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    HeaderComponent,
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    EffectsModule.forRoot([AuthEffect]),
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({logOnly: environment.production}),
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
