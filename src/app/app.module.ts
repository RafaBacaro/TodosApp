import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from './shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card'
import { DragDropModule } from '@angular/cdk/drag-drop';

import { MenuModule } from 'primeng/menu';
import { ProjectsPageComponent } from './components/projects-page/projects-page.component';
import { TasksComponent } from './components/projects-page/tasks/tasks.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectsPageComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    MenuModule,
    ButtonModule,
    CardModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
