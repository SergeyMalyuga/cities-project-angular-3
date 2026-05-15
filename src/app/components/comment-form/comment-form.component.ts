import {ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommentService} from '../../core/services/comment.service';
import {Comment} from '../../core/models/comments';

@Component({
  selector: 'app-comment-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './comment-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentFormComponent {
  @Output() postedComment = new EventEmitter<void>();
  @Input({required: true}) offerId!: string | null;
  private formBuilder = inject(FormBuilder);
  private commentService = inject(CommentService);

  public commentForm: FormGroup = this.formBuilder.group({
    comment: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(350)]],
    rating: ['', [Validators.required]],
  });

  public onSubmit() {
    if (this.commentForm.valid) {
      const {comment, rating} = this.commentForm.value;
      if (this.offerId) {
        this.commentService.postComment(this.offerId, comment, +rating).subscribe({
          next: comment => {
            this.postedComment.emit();
            this.commentForm.reset();
          },
          error: (err) => {
            console.error('Submit failed', err);
          }
        });
      }
    }
  }
}
