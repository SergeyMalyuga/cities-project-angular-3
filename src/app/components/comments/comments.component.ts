import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Comment} from '../../core/models/comments';
import {DatePipe} from '@angular/common';
import {CommentFormComponent} from '../comment-form/comment-form.component';

@Component({
  selector: 'app-comments',
  imports: [
    DatePipe,
    CommentFormComponent
  ],
  templateUrl: './comments.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentsComponent {
  @Output() postedComment = new EventEmitter<void>();
  @Input({required: true}) offerId!: string | null;
  @Input({required: true}) comments!: Comment[];
  protected readonly Math = Math;

  public onPostedComment() {
    this.postedComment.emit();
  }
}
