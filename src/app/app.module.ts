import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatDialogModule} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyDialogComponent } from './my-dialog/my-dialog.component';

@NgModule({
  declarations: [
    MyDialogComponent,
    AppComponent,
    TodoComponent,
    MyDialogComponent
    
  ],
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    DragDropModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [MyDialogComponent],

  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]


})
export class AppModule { }
