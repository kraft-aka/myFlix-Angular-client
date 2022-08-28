import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favoriteMovies: any[] = [];

  constructor(
    public fetchApiDataService: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getMovies(),
    this.getFavoriteMovie('625984c3eeb21d42100dd52d')
  }
  /**
   * Gets all movies using API service
   * @function getMovies
   * @returns array of all movie objects
   */
  getMovies(): void {
    this.fetchApiDataService.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Gets a favorite movie from a given array of movie objects
   * @param id 
   * @function getUser
   * @returns {string|number} id
   */
  getFavoriteMovie(id: string):void {
    this.fetchApiDataService.getUser().subscribe((resp:any)=> {
      const favMovieId = resp.FavoriteMovies.map((movie:any)=> movie._id);
      return favMovieId.includes(id)
    })
  }

  /**
   * Allows user to add a movie to favorite Movies List
   * @param id 
   * @function addFavoriteMovies
   */
  addToFavoriteMovies(id: string): void {
    this.fetchApiDataService.addFavoriteMovies(id).subscribe((resp: any) => {
      console.log(resp, id);
      this.snackBar.open('Movie added to Favorite Movies', 'OK', {
        duration: 2000,
        panelClass: 'snackbar',
      });
    });
  }

  /**
   * Allows user to remove a movie from favorite Movies List
   * @param id 
   * @function deleteMovie
   */
  deleteFromFavoriteMovies(id: string): void {
    this.fetchApiDataService.deleteMovie(id).subscribe((resp: any)=> {
      console.log(id);
      this.ngOnInit();
    })
  }

  /**
   * Opens the genre dialog from GenreComponent
   * @param name 
   * @param description 
   * @function openGenreDialog
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description
      },
      width: '500px'
    })
  }

  /**
   * Opens the director dialog from DirectorComponent
   * @param name 
   * @param bio 
   * @param birthday 
   * @param death 
   * @function openDirectorDialog
   */
  openDirectorDialog(name:string, bio: string, birthday: string, death: string): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birthday,
        Death: death
      },
      width: '500px'
    })
  }

  /**
   * Opens the synopsis dialog from SynopsisComponent
   * @param title 
   * @param description 
   * @function openSynopsisDialog
   */

  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        Title: title,
        Description: description
      },
      width: '500px'
    })
  }
}
