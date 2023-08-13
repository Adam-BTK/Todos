// Модуль renderTasks.js
import { deleteTodo, postTodo } from "./api.js";
import { format } from "date-fns";

// const listElement = document.getElementById("list");

export const renderTasks = ({ tasks, fetchAndRenderTasks }) => {
  const appElement = document.getElementById('app');

  // const formatDate = (date) => {
  //   return `${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}/${date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()}/${date.getFullYear()} ${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`;
  // }
  
  // const country = "ru";
  const tasksHtml = tasks
  .map((task) => {
		// Вызываем функцию format из date-fns, первый параметр — это дата, которую
		// хотим отформатировать, второй параметр — это строка: к какому формату
		// желаем привести дату. Обратите внимание MM — это номер месяца,
		// mm — это минуты
    const createDate = format(new Date(task.created_at), 'dd/MM/yyyy hh:mm');
    return `
        <li class="task">
          <p class="task-text">
            ${task.text} (Создал: ${task.user?.name ?? "Неизвестно"})
            <button data-id="${
              task.id
            }" class="button delete-button">Удалить</button>
          </p>
          <p><i>Задача создана: ${createDate}</i></p>
        </li>`;
  })
  .join("");

  const appHtml = `<h1>Список задач</h1>
<ul class="tasks" id="list">${tasksHtml}</ul>
<br />
<div class="form">
  <h3 class="form-title">Форма добавления</h3>
  <div class="form-row">
    Что нужно сделать:
    <input
      type="text"
      id="text-input"
      class="input"
      placeholder="Выпить кофе"
    />
  </div>
  <br />
  <button class="button" id="add-button">Добавить</button>
</div>
<div id="app">
  
</div>`;


  appElement.innerHTML = appHtml;
  const deleteButtons = document.querySelectorAll(".delete-button");

  for (const deleteButton of deleteButtons) {
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();

      const id = deleteButton.dataset.id;

      deleteTodo({ id }).then(() => {
        fetchAndRenderTasks();
      });
    });
  }
  const buttonElement = document.getElementById("add-button");
  const textInputElement = document.getElementById("text-input");

  buttonElement.addEventListener("click", () => {
    if (textInputElement.value === "") {
      return;
    }

    buttonElement.disabled = true;
    buttonElement.textContent = "Элемент добавляется...";

    postTodo({
      text: textInputElement.value,
    })
      .then(() => {
        return fetchAndRenderTasks();
      })
      .then(() => {
        buttonElement.disabled = false;
        buttonElement.textContent = "Добавить";
        textInputElement.value = "";
      });

    renderTasks({ tasks, fetchAndRenderTasks });
  });
};