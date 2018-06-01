import Task from "../model/task";

export default interface ITaskService {
    add(taskListId, task: Task): void;
    edit(task: Task): void;
    delete(id: number): void;
    getByList(listId: number): Task[];
    getById(id: number): Task;
};