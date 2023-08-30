import { Component } from '@angular/core';
import { Task } from './task/task';
import {TaskDialogComponent, TaskDialogResult} from "./task-dialog/task-dialog.component";

import {CdkDragDrop, transferArrayItem} from "@angular/cdk/drag-drop";
import {MatDialog} from "@angular/material/dialog";
import {Observable} from "rxjs";

import {AngularFirestore} from "@angular/fire/compat/firestore";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'AngularFirebaseExample';

  // .collection('tod o'): Ця операція визначає колекцію Firestore, з якою ви бажаєте взаємодіяти. У даному випадку, це колекція з назвою "t odo"
  // .valueChanges({ idField: 'id' }): Ця операція отримує дані з колекції "t odo" та конфігурує їх для повернення як Observable.
  // Параметр idField: 'id' вказує, що поле id має бути включене в результати, і кожен документ у колекції буде мати поле id,
  // яке відповідає ідентифікатору документа Firestore.
  // as Observable<Task[]>: Ця частина конвертує результати у тип Observable<Task[]>. Це означає, що змінна t odo буде містити
  // observable, який емітує дані в масиві об'єктів типу Task.

  todo = this.store.collection('todo').valueChanges({ idField: 'id' }) as Observable<Task[]>;
  inProgress = this.store.collection('inProgress').valueChanges({ idField: 'id' }) as Observable<Task[]>;
  done = this.store.collection('done').valueChanges({ idField: 'id' }) as Observable<Task[]>;

  constructor(private dialog: MatDialog, private store: AngularFirestore) {}

  newTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task: {},
      },
    });


    dialogRef
        .afterClosed()
        .subscribe((result: TaskDialogResult) => {
          if (!result) {
            return;
          }
          /*this.t odo.push(result.task);*/
          this.store.collection('todo').add(result.task);
        });
  }


  editTask(list: 'done' | 'todo' | 'inProgress', task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '200px',
      data: {
        task,
        enableDelete: true,
      },
    });
      dialogRef.afterClosed().subscribe((result: TaskDialogResult|undefined) => {
          if (!result) {
              return;
          }
          if (result.delete) {
              this.store.collection(list).doc(task.id).delete();
          } else {
              this.store.collection(list).doc(task.id).update(task);
          }
      });
  }

    drop(event: CdkDragDrop<Task[]|null>): void {
        if (event.previousContainer === event.container) {
            return;
        }
        if (!event.previousContainer.data || !event.container.data) {
            return;
        }
        const item = event.previousContainer.data[event.previousIndex];
        this.store.firestore.runTransaction(() => {
            const promise = Promise.all([
                this.store.collection(event.previousContainer.id).doc(item.id).delete(),
                this.store.collection(event.container.id).add(item),
            ]);
            return promise;
        });
        transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex
        );
    }

}
