import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from '../models/note';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss']
})
export class NoteDetailComponent {
  @Input() noteCategories!: string[];
  @Input() noteForm!: FormGroup;
  @Output() noteSaved = new EventEmitter();
}
