import { Severities, Types } from "./enums";

export class TaskModel {
    public id: number = 0;
    public name: string = '';
    public content: string = '';
    public status: string = 'todo';
    public tags: string[] = []; 
    public severity =  Severities.None;
    public type = Types.Task;
}
