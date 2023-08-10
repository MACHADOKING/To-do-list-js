// const allList = document.getElementById("task-list");
const addTaskButton = document.getElementById("add-task-button");
const inputTask = document.getElementById("input-task");
const listOfTasks = document.querySelector(".list-of-tasks");

const validateInput = () => inputTask.value.trim().length > 0;

const handleAddTask = () => {
  const inputIsValid = validateInput();

  if (!inputIsValid) {
    return inputTask.classList.add("input-task-error");
  }

  const taskItemContainer = document.createElement("div");
  taskItemContainer.classList.add("list-tasks");

  const taskContent = document.createElement("p");
  taskContent.innerText = inputTask.value;

  taskContent.addEventListener("click", () => handleClick(taskContent));

  const deleteTaskItem = document.createElement("i");
  deleteTaskItem.classList.add("fa-solid");
  deleteTaskItem.classList.add("fa-trash-can");

  deleteTaskItem.addEventListener("click", () =>
    handleDeleteClick(taskItemContainer, taskContent)
  );

  taskItemContainer.appendChild(taskContent);
  taskItemContainer.appendChild(deleteTaskItem);
  listOfTasks.appendChild(taskItemContainer);

  inputTask.value = "";
  inputTask.focus();

  updateLocalStorage();
};

const handleClick = (taskContent) => {
  const tasks = listOfTasks.childNodes;

  for (const task of tasks) {
    const currentTaskHasBeenClicked = task.firstChild.isSameNode(taskContent);

    if (currentTaskHasBeenClicked) {
      task.firstChild.classList.toggle("list-task-completed");
    }
  }
  updateLocalStorage();
};

const handleDeleteClick = (taskItemContainer, taskContent) => {
  const tasks = listOfTasks.childNodes;

  for (const task of tasks) {
    const currentTaskHasBeenClicked = task.firstChild.isSameNode(taskContent);

    if (currentTaskHasBeenClicked) {
      taskItemContainer.remove();
    }
  }
  updateLocalStorage();
};

const handleInputChange = () => {
  const inputIsValid = validateInput();

  if (inputIsValid) {
    return inputTask.classList.remove("input-task-error");
  }
};

const updateLocalStorage = () => {
  const tasks = listOfTasks.childNodes;

  const localStorageTasks = [...tasks].map((task) => {
    const content = task.firstChild;
    const isCompleted = content.classList.contains("list-task-completed");

    return { description: content.innerText, isCompleted };
  });

  localStorage.setItem("tasks", JSON.stringify(localStorageTasks));
};

const refreshTasksUsingLocalStorage = () => {
  const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"));

  if (!tasksFromLocalStorage) return;

  for (const task of tasksFromLocalStorage) {
    const taskItemContainer = document.createElement("div");
    taskItemContainer.classList.add("list-tasks");

    const taskContent = document.createElement("p");
    taskContent.innerText = task.description;

    if (task.isCompleted) {
      taskContent.classList.add("list-task-completed");
    }

    taskContent.addEventListener("click", () => handleClick(taskContent));

    const deleteTaskItem = document.createElement("i");
    deleteTaskItem.classList.add("fa-solid");
    deleteTaskItem.classList.add("fa-trash-can");

    deleteTaskItem.addEventListener("click", () =>
      handleDeleteClick(taskItemContainer, taskContent)
    );

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteTaskItem);

    listOfTasks.appendChild(taskItemContainer);
  }
};

refreshTasksUsingLocalStorage();

addTaskButton.addEventListener("click", () => handleAddTask());

inputTask.addEventListener("change", () => handleInputChange());
