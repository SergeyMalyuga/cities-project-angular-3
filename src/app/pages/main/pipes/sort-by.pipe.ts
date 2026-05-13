import {Pipe, PipeTransform} from '@angular/core';
import {SortType} from '../../../core/constants/const';
import {OfferPreview} from '../../../core/models/offers';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {
  transform(offers: OfferPreview[], sortType: SortType) {
    switch (sortType) {
      case SortType.PRICE_HIGH_TO_LOW: {
        return [...offers].sort((a, b) => b.price - a.price);
      }
      case SortType.PRICE_LOW_TO_HIGH: {
        return [...offers].sort((a, b) => a.price - b.price);
      }
      case SortType.TOP_RATED_FIRST: {
        return [...offers].sort((a, b) => b.rating - a.rating);
      }
      default: {
        return [...offers];
      }
    }
  }
}
