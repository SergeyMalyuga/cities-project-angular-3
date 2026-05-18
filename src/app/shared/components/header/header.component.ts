import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../core/models/app.state';
import {selectAuthStatus} from '../../../store/user/selectors/user.selectors';
import {RouterLink} from '@angular/router';
import {AppRoute, AuthorizationStatus} from '../../../core/constants/const';
import {AccessibilityClickDirective} from '../../directives/accessibility-click.directive';
import {logout} from '../../../store/user/actions/user.actions';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    AccessibilityClickDirective
  ],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  private store = inject(Store<AppState>);
  public authStatus = this.store.selectSignal(selectAuthStatus);
  protected readonly AppRoute = AppRoute;
  protected readonly AuthorizationStatus = AuthorizationStatus;

  public signOut(): void {
    if (this.authStatus() === AuthorizationStatus.AUTH) {
      this.store.dispatch(logout());
    }
  }
}
