import { Component } from '@angular/core';
import { inject } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  setDoc,
  doc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  todos$: Observable<any>;
  firestore: Firestore = inject(Firestore);

  todos: Array<any>;
  todoText: string;

  constructor() {
    const itemCollection = collection(this.firestore, 'todos');
    this.todos$ = collectionData(itemCollection);

    this.todos$.subscribe((newTodos) => {
      this.todos = newTodos;
    });
  }

  addTodo() {
    const coll = collection(this.firestore, 'todos');
    setDoc(doc(coll), { name: this.todoText });
  }
}
