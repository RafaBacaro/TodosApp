import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { TaskModel } from 'src/app/models/task-model';
import { TasksComponent } from './tasks/tasks.component';

@Component({
  selector: 'projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss']
})
export class ProjectsPageComponent implements OnInit {

  @ViewChild('appendTask', { read: ViewContainerRef, static: true })
  public target!: ViewContainerRef;
  public toDoList: Array<TaskModel> = [];
  public inProgressList: Array<TaskModel> = [];
  public doNeList: Array<TaskModel> = [];
  public movingTask: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  addToDo() {
    //const componentRef = this.target.createComponent(TasksComponent);
    let newTask: TaskModel = {
      content: '',
      name: '',
      status: 'todo'
    }
    newTask.id = newTask.id !== undefined ? newTask.id++ : 0;
    //componentRef.instance.task = newTask;
    this.toDoList.push(newTask);
  }

  changeStatusTo(taskIndex: number) {
     switch(this.movingTask) {
        case 'todo':
          this.toDoList[taskIndex].status = this.movingTask;
          break;
        case 'inprogress':
          this.inProgressList[taskIndex].status = this.movingTask;
          break;
        case 'done':
          this.doNeList[taskIndex].status = this.movingTask;
          break;
        default:
          break;
     }
  }

  movingElement(from: string) {
    this.movingTask = from;
  }   

  drop(event: CdkDragDrop<TaskModel[]>, listToMoveTo: Array<TaskModel>) {
    let listMoveFrom = this.movingTask === 'todo' ? this.toDoList : this.movingTask === 'inprogress' ? this.inProgressList : this.doNeList;
    if(event.previousContainer === event.container){
      moveItemInArray(listToMoveTo, event.previousIndex, event.currentIndex);
      this.changeStatusTo(event.currentIndex);
    } else {
      transferArrayItem(listMoveFrom, listToMoveTo, event.previousIndex, event.currentIndex);
      this.changeStatusTo(event.currentIndex);
    }
  }

}
