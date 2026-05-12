import {Observable, throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

export function handleError(error: HttpErrorResponse): Observable<never> {
  console.error('Auth service error:', error);
  return throwError(() => new Error(error.message));
}
