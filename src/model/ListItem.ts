export interface Item {
  id: string;
  title: string;
  checked: boolean;
}

export default class TodoItem implements Item {
  constructor(
    private _id: string = "",
    private _title: string = "",
    private _checked: boolean = false
  ) {}
  get id() {
    return this._id;
  }
  get title() {
    return this._title;
  }
  get checked() {
    return this._checked;
  }
  set id(id: string) {
    this._id = id;
  }
  set title(title: string) {
    this._title = title;
  }
  set checked(checked: boolean) {
    this._checked = checked;
  }
}
//our firt data model
