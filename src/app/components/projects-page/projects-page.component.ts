import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';
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
  public task!: TaskModel;
  public openTaskCaller = '';

  constructor() { }

  ngOnInit(): void {
  }

  showOverlay(event: Event, overlayEditTask: OverlayPanel) {
    this.openTaskCaller = 'add';
    this.task = new TaskModel;
    overlayEditTask.show(event)
  }

  addToDo(newTask: Array<TaskModel>, overlayEditTask: OverlayPanel) {
    if (newTask) {
      overlayEditTask.hide();
    }
  }

  closeOverlay(shouldClose: boolean, overlayEditTask: OverlayPanel) {
    if (shouldClose) overlayEditTask.hide();
  }

  changeStatusTo(taskIndex: number) {
    switch (this.movingTask) {
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
    if (event.previousContainer === event.container) {
      moveItemInArray(listToMoveTo, event.previousIndex, event.currentIndex);
      this.changeStatusTo(event.currentIndex);
    } else {
      transferArrayItem(listMoveFrom, listToMoveTo, event.previousIndex, event.currentIndex);
      this.changeStatusTo(event.currentIndex);
    }
  }

  deleteTask(task: TaskModel, column: string) {
    switch(column) {
      case 'todo':
        this.toDoList = this.toDoList.filter(t => t.id !== task.id && t.name !== task.name);
        break;
      case 'inprogress':
        this.inProgressList = this.inProgressList.filter(t => t.id !== task.id && t.name !== task.name);
        break;
      case 'done':
        this.doNeList = this.doNeList.filter(t => t.id !== task.id && t.name !== task.name);
        break;
      default:
        break;
    }
  }

  openEdit(task: TaskModel, column: string, event: Event, overlayEditTask: OverlayPanel) {
    this.task = task;
    this.openTaskCaller = 'edit';
    overlayEditTask.show(event);

  }
  viewTask(task: TaskModel, column: string, event: Event, overlayEditTask: OverlayPanel) {
    this.task = task;
    this.openTaskCaller = 'view';
    overlayEditTask.show(event);
  }

}
