import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Credentials} from '../../core/models/credentials';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {login} from '../../store/user/actions/user.actions';
import {AppRoute, AuthorizationStatus, CITY_LOCATIONS} from '../../core/constants/const';
import {selectAuthStatus} from '../../store/user/selectors/user.selectors';
import {filter, take} from 'rxjs';
import {loadOffers} from '../../store/offer/actions/offer.actions';
import {Router, RouterLink} from '@angular/router';
import {City} from '../../core/models/city';
import {changeCity} from '../../store/city/actions/city.actions';
import {AccessibilityClickDirective} from '../../shared/directives/accessibility-click.directive';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    AccessibilityClickDirective
  ],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private store = inject(Store<AppState>);
  private router = inject(Router);

  protected readonly AppRoute = AppRoute;

  public randomCity = this.getRandomCity();
  public loginGroup: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]+$')]]
  });

  ngOnInit(): void {
    this.store.select(selectAuthStatus).pipe(filter(status => status === AuthorizationStatus.AUTH),
      take(1)).subscribe(() => {
      this.loginGroup.reset();
      this.store.dispatch(loadOffers());
      this.router.navigate([AppRoute.MAIN]);
    });
  }

  public onSubmit() {
    if (this.loginGroup.valid) {
      const {email, password} = this.loginGroup.value;
      const credentials: Credentials = {email, password};
      this.store.dispatch(login({credentials}));
    }
  }

  public changeCity(): void {
    this.store.dispatch(changeCity({city: this.randomCity}));
    this.router.navigate([AppRoute.MAIN]);
  }

  private getRandomCity() {
    const index = Math.floor(Math.random() * CITY_LOCATIONS.length);
    return CITY_LOCATIONS[index];
  }
}
