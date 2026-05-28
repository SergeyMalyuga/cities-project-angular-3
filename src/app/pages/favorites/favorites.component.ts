import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {HeaderComponent} from '../../shared/components/header/header.component';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {SortedFavoriteOffers} from '../../core/models/sorted-favorite-offers';
import {selectFavoriteOffers} from '../../store/favorite-offer/selectors/favorite-offer.selectors';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {NgClass, TitleCasePipe} from '@angular/common';
import {OfferCardComponent} from '../../shared/components/offer-card/offer-card.component';
import {RouterLink} from '@angular/router';
import {AppRoute} from '../../core/constants/const';

@Component({
  selector: 'app-favorites',
  imports: [
    HeaderComponent,
    TitleCasePipe,
    OfferCardComponent,
    NgClass,
    RouterLink
  ],
  templateUrl: './favorites.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesComponent implements OnInit {
  private store = inject(Store<AppState>);
  private destroyRef = inject(DestroyRef);

  protected readonly Object = Object;

  public offers = signal<SortedFavoriteOffers>(this.getSortedFavoriteOffers());
  public offersTotal = signal<number>(0);

  private getSortedFavoriteOffers(): SortedFavoriteOffers {
    return {
      paris: [],
      cologne: [],
      brussels: [],
      amsterdam: [],
      hamburg: [],
      dusseldorf: []
    }
  }

  public isKeyOfSortedFavoriteOffers(value: string): value is keyof SortedFavoriteOffers {
    return value in this.offers();
  }

  public ngOnInit(): void {
    this.store.select(selectFavoriteOffers).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(offers => {
        this.offersTotal.set(offers.length);
          const sortedOffers = this.getSortedFavoriteOffers();
          offers.forEach(offer => {
            const key = offer.city.name.toLowerCase();
            if (this.isKeyOfSortedFavoriteOffers(key)) {
              sortedOffers[key].push(offer);
            }
          })
          this.offers.set(sortedOffers);
          console.log(sortedOffers);
        }
      )
  }

  protected readonly AppRoute = AppRoute;
}
