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
    this.getFavoriteMovie()
  }

  getMovies(): void {
    this.fetchApiDataService.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  getFavoriteMovie(): void {
    this.fetchApiDataService.getFavoriteMovies().subscribe((resp: any)=> {
      this.favoriteMovies = resp;
      console.log(this.favoriteMovies);
      return this.favoriteMovies;
    })
  }

  isFav(id: string): boolean {
    return this.favoriteMovies.includes(id)
  }

  addToFavoriteMovies(id: string): void {
    this.fetchApiDataService.addFavoriteMovies(id).subscribe((resp: any)=> {
      console.log(id);
      this.ngOnInit();
    })
  }

  deleteFromFavoriteMovies(id: string): void {
    this.fetchApiDataService.deleteMovie(id).subscribe((resp: any)=> {
      console.log(id);
      this.ngOnInit();
    })
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description
      },
      width: '500px'
    })
  }

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
