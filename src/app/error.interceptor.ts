import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Customize error handling based on the error response
        if (error.status === 401) {
          // Handle unauthorized access
          // Redirect to login or show an error message
        } else if (error.status === 404) {
          // Handle not found error
          // Show an error message or redirect to a 404 page
        } else {
          // Handle other errors
          // Show a generic error message or redirect to an error page
        }

        // Re-throw the error to propagate it to the subscriber
        return throwError(error);
      })
    );
  }
}
