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
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient module to the entire class
  // making it available via this.http
  constructor(private http: HttpClient) {}

  /**
   * @service POST to the API to register new user
   * @param {any} userDetails
   * @returns a new user object in JSON format
   * @function userRegistration
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * @service POST logs in the user
   * @param {any} userDetails - Username and Password
   * @returns a user data in JSON format
   * @function userLogin
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * @service GET to an API endpoint to get data about the user
   * @return a user in json format
   * @function getUser
   */
  public getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .get(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * @service GET to an API endpoint to retrieve all movies
   * @returns array of movies in JSON foormat
   * @function getAllMovies
   */
  getAllMovies(): Observable<any> {
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @service GET to an API endpoint to get one favorite movie
   * @returns a movie object
   * @function getFavoriteMovies
   */
  getFavoriteMovies(): Observable<any> {
    return this.http
      .get(`${apiUrl}users/${username}/movies`, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @service GET to an API endpoint to get a movie director
   * @param {any} name
   * @returns director object in json format
   * @function getDirector
   */
  getDirector(name: any): Observable<any> {
    return this.http
      .get(apiUrl + `movies/director/${name}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @service GET to an API endpoint to get a genre of the movie
   * @param {any} title
   * @returns genre of the movie in JSON format
   * @function getGenre
   */
  getGenre(title: any): Observable<any> {
    return this.http
      .get(apiUrl + `movies/genre/${title}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @service POST to an API endpoint to add movie to favorite Movies List
   * @param {string} movieID
   * @returns array of favorite movies in JSON format
   * @function addFavoriteMovies
   */
  addFavoriteMovies(movieID: string): Observable<any> {
    return this.http
      .post(
        `${apiUrl}users/${username}/movies/${movieID}`,
        null,

        {
          headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @service DELETE to an API endpoint to remove a movie from favorite Movies List
   * @param {string} movieID
   * @returns removed movie's ID
   * @function deleteMovie
   */
  deleteMovie(movieID: string): Observable<any> {
    return this.http
      .delete(`${apiUrl}users/${username}/movies/${movieID}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @service PUT to an API endpoint to edit registered user
   * @param {any} updateDetails
   * @returns user data updated
   * @function editUser
   */
  editUser(updateDetails: any): Observable<any> {
    return this.http
      .put(apiUrl + `users/${username}`, updateDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @service DELETE to an API endpoint to delete a user
   * @returns a removed user in JSON format
   * @function deleteUser
   */
  deleteUser(): Observable<any> {
    return this.http
      .delete(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Error handle function
   * @param {HttpErrorResponse} error
   * @function handleError
   */
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

  /**
   * Manages non-types response extractions
   * @function extractResponseData
   * @returns {any} body || {}
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }
}
