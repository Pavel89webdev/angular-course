import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AppRouterModule } from './app-router.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth/auth-interceptor.service';
import { AuthGuard } from './auth/auth.guard';
import { BrowserStorageService } from './auth/browesr-storage.service';
import { AuthEffect } from './auth/store/auth.effect';
import { HeaderComponent } from './header/header.component';
import { RecipeEffect } from './recipes/store/recipe.effects';
import { SharedModule } from './shared/shared.module';
import { appReducers } from './store/app.reducer';

@NgModule({
  declarations: [
    HeaderComponent,
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    EffectsModule.forRoot([AuthEffect, RecipeEffect]),
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({logOnly: environment.production}),
    // custom modules:
    SharedModule,
    AppRouterModule,
  ],
  providers: [
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
