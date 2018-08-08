import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() side = new EventEmitter<void>();
  authState: boolean;
  subscription: Subscription = new Subscription();
  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this.subscription = this._authService.authChange.subscribe(authState => this.authState = authState);
  }

  onToggle() {
    this.side.emit();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onLogout() {
    this._authService.logout();
  }

}
