import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../core/models/app.state';
import {selectAuthStatus, selectUserEmail} from '../../../store/user/selectors/user.selectors';
import {RouterLink} from '@angular/router';
import {AppRoute, AuthorizationStatus} from '../../../core/constants/const';
import {AccessibilityClickDirective} from '../../directives/accessibility-click.directive';
import {logout} from '../../../store/user/actions/user.actions';
import {
  selectFavoriteOffersTotal,
  selectIsFavoriteOffersLoading
} from '../../../store/favorite-offer/selectors/favorite-offer.selectors';

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
  protected readonly AppRoute = AppRoute;
  protected readonly AuthorizationStatus = AuthorizationStatus;

  private store = inject(Store<AppState>);

  public authStatus = this.store.selectSignal(selectAuthStatus);
  public email = this.store.selectSignal(selectUserEmail);
  public totalFavoriteOffers = this.store.selectSignal(selectFavoriteOffersTotal);

  public signOut(): void {
    if (this.authStatus() === AuthorizationStatus.AUTH) {
      this.store.dispatch(logout());
    }
  }
}
