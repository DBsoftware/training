import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() side = new EventEmitter<void>();

  authState: boolean;
  subscription: Subscription = new Subscription();
  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this.subscription = this._authService.authChange.subscribe(authState => this.authState = authState);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClose() {
    this.side.emit();
  }

  onLogout() {
    this.onClose();
    this._authService.logout();
  }

}
