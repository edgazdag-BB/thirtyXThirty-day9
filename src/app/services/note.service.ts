import { Injectable } from '@angular/core';
import { Note } from '../models/note';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  
  API_URL: string = environment.apiUrl;
  noteCategories: string[] = ['Work', 'School', 'Personal', ];
  currentNote?: Note;
  noteList!: Note[];

  constructor(private http: HttpClient) {}

  getNotes() {
    this.http.get<Note[]>(`${this.API_URL}notes/`, this.httpOptions)
      .pipe(
        tap(noteList => this.noteList = noteList),
        catchError(this.handleError<Note[]>('getNotes', []))
      )
      .subscribe();
  }

  getNote(id: number) {
    return this.http.get<Note>(`${this.API_URL}notes/${id}`, this.httpOptions)
      .pipe(
        tap(note => this.currentNote = note),
        catchError(this.handleError<Note>('getNote'))
      );
  }

  updateNote(note: Note) {
    this.http.put<Note>(`${this.API_URL}notes/${note.id}`, note, this.httpOptions)
      .pipe(
        tap(n => this.noteList = this.noteList.map(curNote => curNote.id === note.id ? n : curNote)),
        tap(n => this.currentNote = n),
        catchError(this.handleError<Note>('updateNote'))
      )
      .subscribe();
  }

  createNote(note: Note) {
    return this.http.post<Note>(`${this.API_URL}notes/`, note, this.httpOptions)
      .pipe(
        tap(n => this.noteList = [...this.noteList, n]),
        tap(n => this.currentNote = n),
        catchError(this.handleError<Note>('createNote'))
      )
      .subscribe();
  }

  deleteNote(id: number) {
    return this.http.delete<Note>(`${this.API_URL}notes/${id}`, this.httpOptions)
      .pipe(
        tap(() => this.noteList = this.noteList.filter(curNote => curNote.id !== id)),
        tap(() => this.currentNote?.id === id ? this.setCurrentNote(undefined) : void 0),
        catchError(this.handleError<Note>('deleteNote'))
    )
    .subscribe();
  }

  setCurrentNote(note?: Note) {
    this.currentNote = note ? {...note} : note;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      return of(result as T);
    };
  }
}