import {Pipe, PipeTransform} from '@angular/core';
import {Comment} from '../../core/models/comments';

@Pipe({
  name: 'sortCommentsByDate'
})
export class SortCommentsByDatePipe implements PipeTransform {
  transform(comments: Comment[]): Comment[] {
    return [...comments].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
}
