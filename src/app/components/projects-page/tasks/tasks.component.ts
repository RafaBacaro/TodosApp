import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewContainerRef } from '@angular/core';
import { Severities, Types } from 'src/app/models/enums';
import { TaskModel } from 'src/app/models/task-model';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnChanges {

  @Input() tasks: Array<TaskModel> = [];
  @Input() openTask!: TaskModel;
  @Input() openTaskCaller: string = '';
  @Output() editTaskNameEvent = new EventEmitter<Array<TaskModel>>();
  @Output() cancelEditTask = new EventEmitter<boolean>();
  @Output() saveEditTask = new EventEmitter<boolean>();

  public taskName: string = '';
  public taskContent: string = '';
  public taskTags: string[] = [];
  public taskSeverity = Severities.None;
  public taskType = Types.Task;
  public invalidName: string = '';
  public invalidContent: string = '';
  public invalidTags: string = '';
  public disableAll: boolean = false;

  public separatorExp: string = '/,| /';
  public severityIcons: string = '';
  public severityOptions: any = [];
  public typeOptions: any = [];

  constructor(public viewContainerRef: ViewContainerRef) { }

  ngOnChanges(): void {
    this.severityOptions = Object.values(Severities).filter(severity => typeof severity === 'string');
    this.typeOptions = Object.values(Types);
    if (this.openTask) {
      this.taskContent = this.openTask.content;
      this.taskName = this.openTask.name;
      this.taskTags = this.openTask.tags;
    }
    if (this.openTaskCaller === 'view') {
      this.disableAll = true;
    } else {
      this.disableAll = false;
      if (this.openTaskCaller === 'add') {
        this.taskTags = [];
      }
    }
  }

  ngOnInit(): void {
    this.disableAll = false;
  }

  checkName() {
    if (!this.taskName || this.taskName === '') {
      return false;
    }
    return true;
  }

  checkContent() {
    if (!this.taskContent || this.taskContent === '') {
      return false;
    }
    return true;
  }

  checkTags() {
    return false;
  }

  createTask() {
    let newTask: TaskModel = {
      content: this.taskContent,
      name: this.taskName,
      status: 'todo',
      id: this.tasks.length <= 0 ? 0 : this.tasks.length,
      tags: this.taskTags,
      severity: this.taskSeverity,
      type: this.taskType
    }

    if (this.checkContent() && this.checkName()) {
      this.tasks.push(newTask);
      this.editTaskNameEvent.emit(this.tasks);
      newTask = new TaskModel();
      this.taskContent = '';
      this.taskName = '';
      this.taskTags = [];
      this.invalidContent = '';
      this.invalidName = '';
      this.invalidTags = '';
    }
  }

  cancel() {
    this.cancelEditTask.emit(true);
  }

  editTask() {
    let task = this.tasks.find(task => task.id === this.openTask.id && task.name === this.openTask.name);
    if (task) {
      task.content = this.taskContent;
      task.name = this.taskName;
      task.tags = this.taskTags;
    } else {
      if(this.tasks.length <= 0) {
        this.openTask.content = this.taskContent;
        this.openTask.name = this.taskName;
        this.openTask.tags = this.taskTags;
        this.tasks.push(this.openTask);
      }
    }
    this.saveEditTask.emit(true);
  }

  getSeverityIcons(severity: Severities) {
    switch (severity) {
      case Severities['Very High']:
        return 'pi pi-angle-double-up';
      case Severities.High:
        return 'pi pi-angle-up';
      case Severities.Medium:
        return 'pi pi-chevron-down';
      case Severities.Low:
        return 'pi pi-angle-double-down';
      default:
        return ''; 
    }
  }

  getTypeIcons(severity: Types) {
    switch (severity) {
      case Types.Bug:
        return '';
      case Types.Epic:
        return '';
      case Types.SubTask:
        return '';
      case Types.Task:
        return '';
      default:
        return ''; 
    }
  }

}
