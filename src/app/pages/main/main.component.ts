import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {HeaderComponent} from '../../shared/components/header/header.component';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {selectCity, selectOffersByCity} from '../../store/app/selectors/app.selectors';
import {OfferCardComponent} from '../../shared/components/offer-card/offer-card.component';
import {CITY_LOCATIONS, SortType} from '../../core/constants/const';
import {NgClass} from '@angular/common';
import {City} from '../../core/models/city';
import {changeCity} from '../../store/city/actions/city.actions';
import {PlacesSortingFormComponent} from '../../components/places-sorting-form/places-sorting-form.component';
import {SortByPipe} from './pipes/sort-by.pipe';
import {MapComponent} from '../../shared/components/map/map.component';
import {OfferPreview} from '../../core/models/offers';

@Component({
  selector: 'app-main',
  imports: [
    HeaderComponent,
    OfferCardComponent,
    NgClass,
    PlacesSortingFormComponent,
    SortByPipe,
    MapComponent
  ],
  templateUrl: './main.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {
  protected readonly CITY_LOCATIONS = CITY_LOCATIONS;
  private store = inject(Store<AppState>);

  public offers = this.store.selectSignal(selectOffersByCity);
  public currentCity = this.store.selectSignal(selectCity);
  public sortType = signal<SortType>(SortType.POPULAR);
  public activeOffer = signal<OfferPreview | null>(null);

  public changeCity(city: City): void {
    this.store.dispatch(changeCity({city}));
  }

  public changeSortType(sortType: SortType): void {
    this.sortType.set(sortType);
  }

  public changeActiveOffer(offer: OfferPreview): void {
    this.activeOffer.set(offer);
  }
}
