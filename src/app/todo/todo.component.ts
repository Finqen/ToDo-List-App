import { Component, OnInit, Inject } from '@angular/core';
import { TodoService } from './shared/todo.service';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Observable } from 'rxjs';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyDialogComponent } from '../my-dialog/my-dialog.component';




@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styles: [],
  providers : [TodoService]
})

export class TodoComponent implements OnInit {



  
  toDoListArray: any[];
  keys: Observable<any>;
  cat: string;
  constructor(private toDoService: TodoService, public dialog: MatDialog) {}


  openDialog(itemTitle){



    const dialogRef = this.dialog.open(MyDialogComponent, {
      width: '200px',
      
    });

      dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      console.log(result);
      console.log(itemTitle.value);

      this.onAdd(result+' '+itemTitle.value)
      itemTitle.value = null;

    });
    
    

    

  }

  

   ngOnInit() {


    
    this.toDoService.getToDoList().snapshotChanges()
        .subscribe(item => {
        this.toDoListArray = [];
        item.forEach(element => {
            var x = element.payload.toJSON();
            x["$key"] = element.key;
            this.toDoListArray.push(x);
        });



        /*this.toDoListArray.sort((a, b) => {
          return a.Position - b.Position; 
      }); */
        //sort array isChecked false  -> true
        this.toDoListArray.sort((a, b) => {
            return a.isChecked - b.isChecked;
        });
        
    });
  }
  
  onAdd(itemTitle) {
      var x = this.toDoListArray.length;
      this.toDoService.addTitle(itemTitle, x);
      
  }

  alterCheck($key, isChecked) {
      this.toDoService.checkOrUnCheckTitle($key, !isChecked);
  }
  onDelete($key) {
      this.toDoService.removeTitle($key);
  }


  onDrop(event: CdkDragDrop<any>) {

    
      moveItemInArray(this.toDoListArray, event.previousIndex, event.currentIndex);
  
    this.toDoService.rearangeItem(this.toDoListArray,event.previousIndex,event.currentIndex);

  }
 
  
}
