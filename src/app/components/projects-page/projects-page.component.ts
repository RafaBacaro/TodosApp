import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { TasksComponent } from './tasks/tasks.component';

@Component({
  selector: 'projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss']
})
export class ProjectsPageComponent implements OnInit {

  @ViewChild('appendTask', {read: ViewContainerRef, static: true}) 
  public target!: ViewContainerRef;

  public doNotShow: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  addToDo() {
    const componentRef = this.target.createComponent(TasksComponent);
    componentRef.instance.content = 'Test';
    componentRef.instance.name = 'TEst';
  }

}
