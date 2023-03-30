import TodoItem from "./ListItem";
export interface FullList {
  list: TodoItem[];
  load(): void;
  save(): void;
  clear(): void;
  remove(id: string): void;
  addItem(itemObj: TodoItem): void;
}

export default class ListItem implements FullList {
  static instance: ListItem = new ListItem();
  private constructor(private _list: TodoItem[] = []) {}
  get list(): TodoItem[] {
    return this._list;
  }

  save(): void {
    localStorage.setItem("myList", JSON.stringify(this._list));
  }
  addItem(itemObj: TodoItem): void {
    this._list.push(itemObj);
    this.save();
  }
  clear(): void {
    this._list = [];
    this.save();
  }
  remove(id: string): void {
    this._list = this._list.filter((item) => item.id !== id);
    this.save;
  }
  load(): void {
    const storedList: string | null = localStorage.getItem("myList");
    if (typeof storedList !== "string") return;
    const parsedData: { _id: string; _title: string; checked: boolean }[] =
      JSON.parse(storedList);
    parsedData.forEach((item) => {
      const newListItem = new TodoItem(item._id, item._title, item.checked);
      ListItem.instance.addItem(newListItem);
    });
  }
}
