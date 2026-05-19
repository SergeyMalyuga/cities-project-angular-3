import {ChangeDetectionStrategy, Component, computed, inject, OnInit, signal} from '@angular/core';
import {HeaderComponent} from '../../shared/components/header/header.component';
import {OfferService} from '../../core/services/offer.service';
import {CommentService} from '../../core/services/comment.service';
import {Offer, OfferPreview} from '../../core/models/offers';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, combineLatest, distinctUntilChanged, EMPTY, filter, map, merge, of, Subject, switchMap} from 'rxjs';
import {Comment} from '../../core/models/comments';
import {SlicePipe, TitleCasePipe} from '@angular/common';
import {CommentsComponent} from '../../components/comments/comments.component';
import {MapComponent} from '../../shared/components/map/map.component';
import {OfferCardComponent} from '../../shared/components/offer-card/offer-card.component';

@Component({
  selector: 'app-offer',
  imports: [
    HeaderComponent,
    TitleCasePipe,
    CommentsComponent,
    MapComponent,
    SlicePipe,
    OfferCardComponent
  ],
  templateUrl: './offer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferComponent implements OnInit {
  private offerService = inject(OfferService);
  private commentService = inject(CommentService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private refreshComments$ = new Subject<void>();

  public offer = signal<Offer | null>(null);
  public offerId = computed(() => this.offer()?.id ?? null);
  public comments = signal<Comment[]>([]);
  public nearbyOffers = signal<OfferPreview[]>([]);

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(map(params => params.get('id')),
      filter((id): id is string => id !== null),
      switchMap(id => {
        const offer$ = this.offerService.getOfferById(id).pipe(catchError(() => {
          this.router.navigate(['/', '**']);
          return EMPTY;
        }));

        const comments$ = merge(
          this.commentService.getComments(id),
          this.refreshComments$.pipe(switchMap(() => this.commentService.getComments(id))).pipe(
            distinctUntilChanged(
              (prev, curr) =>
                prev.length === curr.length &&
                prev.every(
                  (comment, index) => comment.id === curr[index].id,
                ),
            ),
            catchError(() => of([])),
          )
        );

        const nearbyOffers$ = this.offerService.getNearbyOffers(id).pipe(catchError(() => of([])));

        return combineLatest({
          offer: offer$,
          comments: comments$,
          nearbyOffers: nearbyOffers$
        })
      })).pipe().subscribe(result => {
        this.offer.set(result.offer);
        this.comments.set(result.comments);
        this.nearbyOffers.set(result.nearbyOffers);
      }
    );
  }

  public refreshComments() {
    this.refreshComments$.next();
  }

  protected readonly Math = Math;
}
