import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database'
import { Observable } from 'rxjs';




@Injectable()
export class TodoService {
  toDoList: AngularFireList<any>;
  keys: Observable<any[]>;
  
  constructor(public firebasedb: AngularFireDatabase) { 
    
        

  }

  getToDoList() {
    this.toDoList = this.firebasedb.list('titles');
    
    

    return this.toDoList
  }



  addTitle(title: string, pos: number) {

    this.toDoList.push(
      
      
      {
      title: title,
      isChecked: false,
      Position: pos
      
    }
    
    

    );

    console.log("ADD");
  }

  checkOrUnCheckTitle($key: string, flag: boolean) {
    this.toDoList.update($key, { isChecked: flag });
  }


  updateList(previous: any, current: any,$key: string){
    
    
    this.toDoList.update($key, {Position: null})

  }

  removeTitle($key: string) {
    this.toDoList.remove($key);
  }

  remove(){

    this.toDoList.remove();

  }



  rearangeItem(array: any[],prevIndex: any, currIndex: any){



  
    
    if(prevIndex<currIndex){
      for(let item = prevIndex; item < currIndex; item++){

        var key = array[item].$key;
        var title1 = array[item+1].title;
        this.toDoList.update(key, {title: title1});

      }
        var key = array[currIndex].$key;
        var title1 = array[prevIndex].title;
        this.toDoList.update(key, {title: title1});
      }

    if(prevIndex>currIndex){

      var key = array[currIndex].$key;
      var title1 = array[prevIndex].title;
      this.toDoList.update(key, {title: title1});

      for(let item = currIndex+1; item < prevIndex+1; item++){

        var key = array[item].$key;
        var title1 = array[item-1].title;
        this.toDoList.update(key, {title: title1});

      }




    }

  }
}
