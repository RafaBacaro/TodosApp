import { Component, EventEmitter, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import { TaskModel } from 'src/app/models/task-model';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  @Input() task!: TaskModel;
  @Output() editTaskNameEvent = new EventEmitter<string>;
  @Output() editTaskContentEvent = new EventEmitter<string>;

  constructor(public viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void {
  }

}
