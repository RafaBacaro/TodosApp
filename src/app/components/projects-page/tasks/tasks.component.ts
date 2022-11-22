import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  @Input() name: string = '';
  @Input() content: string = '';

  constructor(public viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void {
  }

}
