import ListItem from "../model/fullList";

export interface DomList {
  ul: HTMLUListElement;
  render(fullList: ListItem): void;
  clear(): void;
}

export default class RenderList implements DomList {
  ul: HTMLUListElement;
  static instance: RenderList = new RenderList();
  private constructor() {
    this.ul = document.getElementById("listItems") as HTMLUListElement;
  }
  clear(): void {
    this.ul.innerHTML = "";
  }

  render(fullList: ListItem): void {
    this.clear();
    fullList.list.forEach((item) => {
      const li: HTMLLIElement = document.createElement("li");
      li.className = "item";
      const checkbox = document.createElement("input") as HTMLInputElement;
      checkbox.type = "checkbox";
      checkbox.tabIndex = 0;
      checkbox.id = item.id;
      checkbox.checked = item.checked;

      li.append(checkbox);
      checkbox.addEventListener("change", () => {
        item.checked = !item.checked;
        fullList.save();
      });

      const label = document.createElement("label") as HTMLLabelElement;
      label.htmlFor = item.id;
      label.textContent = item.title;
      li.append(label);
      const button = document.createElement("button") as HTMLButtonElement;
      button.id = item.id;
      button.className = "button";
      button.textContent = "X";
      li.append(button);
      button.addEventListener("click", () => {
        fullList.remove(item.id);
        this.render(fullList);
      });
      this.ul.append(li);
    });
  }
}
