import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal} from '@angular/core';
import {AppToggleDirective} from '../../shared/directives/toggle.directive';
import {NgClass} from '@angular/common';
import {OutsideClickDirective} from '../../shared/directives/outside-click.directive';
import {SortType} from '../../core/constants/const';
import {SelectSortTypeDirective} from './directives/select-offer-sort-type.directive';

@Component({
  selector: 'app-places-sorting-form',
  imports: [
    AppToggleDirective,
    NgClass,
    OutsideClickDirective,
    SelectSortTypeDirective
  ],
  templateUrl: './places-sorting-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlacesSortingFormComponent {
  @Input({required: true}) currentSortType!: SortType;
  @Output() sortTypeSelected = new EventEmitter<SortType>();

  protected readonly SortType = SortType;
  protected readonly Object = Object;
  public isOpen = signal<boolean>(false);

  public toggleOptions() {
    this.isOpen.set(!this.isOpen());
  }

  public closeOptions() {
    this.isOpen.set(false);
  }

  public onSortTypeSelected(sortType: SortType): void {
    this.sortTypeSelected.emit(sortType);
    this.closeOptions();
  }
}
