import "./css/style.css";
import TodoItem from "./model/ListItem";
import ListItem from "./model/fullList";
import RenderList from "./templates/template";

const App = (): void => {
  const fullList = ListItem.instance;
  const template = RenderList.instance;

  const formEntry = document.getElementById("itemEntryForm") as HTMLFormElement;
  formEntry?.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();
    const Input = document.getElementById("newItem") as HTMLInputElement;
    const newEntryText: string = Input.value.trim();
    if (!newEntryText.length) return;
    const itemId: number = fullList.list.length
      ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
      : 1;
    const newItem = new TodoItem(itemId.toString(), newEntryText);
    fullList.addItem(newItem);
    template.render(fullList);
  });
  const clear = document.getElementById(
    "clearItemsButton"
  ) as HTMLButtonElement;
  clear.addEventListener("click", (): void => {
    fullList.clear();
    template.clear();
  });
  fullList.load();
  template.render(fullList);
};

document.addEventListener("DOMContentLoaded", App);
