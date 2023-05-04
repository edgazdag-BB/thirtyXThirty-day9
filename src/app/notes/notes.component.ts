import { Component, OnInit } from '@angular/core';
import { NoteService } from '../services/note.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Note } from '../models/note';
import { tap } from 'rxjs';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'note', 'category', 'delete'];
  
  noteForm = new FormGroup({
    name: new FormControl('', Validators.required),
    note: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required)
  });
  
  constructor(public noteService: NoteService) {}

  ngOnInit() {
    this.noteService.getNotes();
    this.noteService.currentNote && this.noteForm.patchValue(this.noteService.currentNote); 
  }

  setCurrentNote(note: Note) {
    this.noteService.getNote(note.id!).pipe(
      tap(n => this.noteForm.patchValue(n))
    )
    .subscribe();
  }

  addNote() {
    this.noteService.currentNote = {id: 0, name: '', note: '', category: ''}
    this.noteForm.reset();
  }

  saveNote() {
    const note = this.noteForm.value as Omit<Note, 'id'>;

    this.noteService.currentNote?.id  === 0 ? 
      this.noteService.createNote({...note, id: 0})
      : this.noteService.updateNote({...note, id: this.noteService.currentNote!.id})
  }

  deleteNote(id: number) {
    this.noteService.deleteNote(id);
    this.noteService.currentNote && this.noteForm.patchValue(this.noteService.currentNote); 
  }

}
