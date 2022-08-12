import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

// Declaring the api url that will provide data for the client app
const apiUrl = 'https://movie-api-1112.herokuapp.com/';

// init token
const token = localStorage.getItem('token');
// init user
const username = localStorage.getItem('user');

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  constructor(private http: HttpClient) {}

  // Making the api call for the user registration endpoint (method:POST)
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  // Login user (method: POST)
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  // API call to get a user (method:GET)
  public getUser(userCredentials: any): Observable<any> {
    console.log(userCredentials);
    return this.http
      .get(apiUrl + 'user', userCredentials)
      .pipe(catchError(this.handleError));
  }

  // API call to get all moives from myFlix API (method:GET)
  getAllMovies(): Observable<any> {
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // API call to get one movie (method:GET)
  getOneMovie(title: any): Observable<any> {
    return this.http
      .get(apiUrl + `movies/${title}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // API call to get a Director (method: GET)
  getDirector(name: any): Observable<any> {
    return this.http
      .get(apiUrl + `movies/director/${name}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // API call to get a genre of the movie (method: GET)
  getGenre(title: any): Observable<any> {
    return this.http
      .get(apiUrl + `movies/genre/${title}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // API call to get favorite movies for a user

  // API call to add a movie to favorite Movies list (method: POST)
  addFavoriteMovies(movieId: number): Observable<any> {
    return this.http
      .post(apiUrl + `users/${username}` + `movies/${movieId}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // API call to delete a movie from the favorite movies (method:DELETE)
  deleteMovie(movieId: number): Observable<any> {
    return this.http
      .delete(apiUrl + `users/${username}` + `movies/${movieId}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // API call to edit registered user (method: PUT)
  editUser(updateDetails: any): Observable<any> {
    return this.http
      .put(apiUrl + `users/${username}`, updateDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // API call to delete a User (method: DELETE)
  deleteUser(): Observable<any> {
    return this.http
      .delete(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // error handler
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }
}
