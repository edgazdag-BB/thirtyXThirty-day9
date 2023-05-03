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

  constructor(private http: HttpClient) {
    this.getNotes();
  }

  addNote(): Note {
    this.currentNote = {  id: 0,
      name: '',
      note: '',
      category: '',
    };

    return this.currentNote;
  }

  getNotes() {
    this.http.get<Note[]>(this.API_URL + "notes", this.httpOptions)
      .pipe(
        catchError(this.handleError<Note[]>('getNotes', []))
      )
      .subscribe(noteList => this.noteList = noteList);
  }

  getNote(id: number) {
    this.http.get<Note>(this.API_URL + "notes/" + id, this.httpOptions)
      .pipe(
        catchError(this.handleError<Note>('getNote'))
      )  
      .subscribe(note => this.currentNote = note);
  }

  updateNoteDetails(note: Note) {
    this.http.put<Note>(this.API_URL + "notes/" + note.id, note, this.httpOptions)
      .pipe(
        tap(n => this.noteList = this.noteList.map(curNote => curNote.id === note.id ? n : curNote)),
        tap(n => this.currentNote = n),
        catchError(this.handleError<Note>('updateNoteDetails'))
      )
      .subscribe();
  }

  saveNewNote(note: Note) {
    return this.http.post<Note>(this.API_URL + "notes", note, this.httpOptions)
      .pipe(
        tap(n => this.noteList = [...this.noteList, n]),
        tap(n => this.currentNote = n),
        catchError(this.handleError<Note>('saveNewNote'))
      )
      .subscribe();
  }

  deleteNote(id: number) {
    return this.http.delete<Note>(this.API_URL + "notes/" + id, this.httpOptions)
      .pipe(
        tap(() => this.noteList = this.noteList.filter(curNote => curNote.id !== id)),
        tap(() => this.currentNote?.id === id ? this.setCurrentNote(undefined) : void 0),
        catchError(this.handleError<Note>('deleteNote'))
    )
    .subscribe();
  }

  getNoteCategories(): string[] {
    return this.noteCategories;
  }

  setCurrentNote(note?: Note) {
    this.currentNote = note ? {...note} : note;
  }

  getCurrentNote() {
    return this.currentNote;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      return of(result as T);
    };
  }
}