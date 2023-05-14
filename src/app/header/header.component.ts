import { Component, OnDestroy, OnInit } from '@angular/core'
import { DataStorageService } from '../shared/data-storage.service'
import { AuthService } from '../auth/auth.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  authSub: Subscription
  isAuthenticated = false

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    ) {}

  ngOnInit(): void {
    this.authSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = Boolean(user);
    })
  }

  onSaveData() {
    this.dataStorageService.storeRecipies()
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe()
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
}
