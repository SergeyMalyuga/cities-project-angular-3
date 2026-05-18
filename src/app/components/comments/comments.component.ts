import {ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Comment} from '../../core/models/comments';
import {DatePipe} from '@angular/common';
import {CommentFormComponent} from '../comment-form/comment-form.component';
import {SortCommentsByDatePipe} from '../../shared/directives/sort-comments-by-date.pipe';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {selectAuthStatus} from '../../store/user/selectors/user.selectors';
import {AuthorizationStatus} from '../../core/constants/const';

@Component({
  selector: 'app-comments',
  imports: [
    DatePipe,
    CommentFormComponent,
    SortCommentsByDatePipe
  ],
  templateUrl: './comments.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentsComponent {
  @Output() postedComment = new EventEmitter<void>();
  @Input({required: true}) offerId!: string | null;
  @Input({required: true}) comments!: Comment[];

  private store = inject(Store<AppState>);
  protected readonly Math = Math;

  public authStatus = this.store.selectSignal(selectAuthStatus);


  public onPostedComment() {
    this.postedComment.emit();
  }

  protected readonly AuthorizationStatus = AuthorizationStatus;
}
