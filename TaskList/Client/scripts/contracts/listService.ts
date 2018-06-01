import ListOfTask from "../model/ListOfTask";

export default interface IListService {
    getLists(name?: string): ListOfTask[];
    add(list: ListOfTask): void;
    edit(list: ListOfTask): void;
    delete(id: number): void;
};