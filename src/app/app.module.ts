import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { TaskComponent } from './task/task.component';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';



import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    TaskDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,

    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    DragDropModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
