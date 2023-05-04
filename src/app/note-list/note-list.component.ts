import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Note } from '../models/note';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent {
  @Input() noteList!: Note[];
  @Input() displayedColumns!: string[];
  @Output() addNote = new EventEmitter();
  @Output() editNote: EventEmitter<Note> = new EventEmitter<Note>();
  @Output() deleteNote: EventEmitter<number> = new EventEmitter<number>();

  deleteClicked(event: any, id: number) {
    event.stopPropagation();
    this.deleteNote.emit(id);
  }
}
