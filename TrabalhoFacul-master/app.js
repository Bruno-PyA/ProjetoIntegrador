// Selecionando os elementos necessários
const addGoalBtn = document.getElementById("add-goal-btn");
const newGoalInput = document.getElementById("new-goal");
const goalsList = document.getElementById("goals");

// Função para adicionar uma nova meta
addGoalBtn.addEventListener("click", function () {
  const goalText = newGoalInput.value;

  // Verifica se o campo de meta não está vazio
  if (goalText.trim() !== "") {
    // Cria um novo elemento <li>
    const newGoal = document.createElement("li");
    newGoal.textContent = goalText;

    // Adiciona o botão "Editar" à nova meta
    const editButton = document.createElement("button");
    editButton.classList.add("edit-goal");
    editButton.innerHTML = `
      <div class="card">
        <ul class="list">
          <li class="element">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#7e8590" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil">
              <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
              <path d="m15 5 4 4"></path>
            </svg>
            <p class="label">Rename</p>
          </li>
        </ul>
      </div>
    `;

    // Adiciona o botão de edição ao <li>
    newGoal.appendChild(editButton);

    // Adiciona a nova meta à lista de metas
    goalsList.appendChild(newGoal);

    // Limpa o campo de entrada
    newGoalInput.value = "";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("progress-chart").getContext("2d");

  // Dados iniciais
  let progressChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Concluído", "Em Análise", "Pendente"],
      datasets: [
        {
          label: "Progresso",
          data: [50, 30, 20],
          backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
          borderColor: "#fff",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return tooltipItem.label + ": " + tooltipItem.raw + "%";
            },
          },
        },
      },
    },
  });

  // Atualizar gráfico ao enviar o formulário
  document
    .getElementById("chart-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      // Obter os novos valores dos inputs
      const completed = parseFloat(document.getElementById("completed").value);
      const underreview = parseFloat(
        document.getElementById("underreview").value
      );
      const pending = parseFloat(document.getElementById("pending").value);

      // Atualizar os dados do gráfico
      progressChart.data.datasets[0].data = [completed, underreview, pending];
      progressChart.update();
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("progress-chart").getContext("2d");
  const progressChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Concluído", "Em Análise", "Pendente"],
      datasets: [
        {
          label: "Progresso",
          data: [50, 30, 20], // Exemplo de dados, substitua com dados reais
          backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
          borderColor: "#fff",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return tooltipItem.label + ": " + tooltipItem.raw + "%";
            },
          },
        },
      },
    },
  });
});

// Simulação de arquivos anteriores
function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
  event.target.classList.add("dragging");
}

function drop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text");
  const draggedElement = document.getElementById(data);
  event.target.classList.remove("dragging");
  if (event.target.classList.contains("task-list")) {
    event.target.appendChild(draggedElement);
  }
}

document.querySelectorAll(".task-list li").forEach((item) => {
  item.addEventListener("dragstart", drag);
  item.addEventListener("dragend", () => item.classList.remove("dragging"));
});

document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    card.addEventListener("click", function (event) {
      const target = event.target.closest(".element");
      if (target) {
        const action = target.querySelector("p.label").textContent;
        switch (action) {
          case "Rename":
            alert("Renomear meta");
            break;
          case "Add Member":
            alert("Adicionar membro");
            break;
          case "Settings":
            alert("Configurações");
            break;
          case "Delete":
            alert("Excluir meta");
            break;
          case "Team Access":
            alert("Acesso à equipe");
            break;
          default:
            break;
        }
      }
    });
  });
});

const inputElement = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-button");

const tasksContainer = document.querySelector(".tasks-container");

const validateInput = () => inputElement.value.trim().length > 0;

const handleAddTask = () => {
  const inputIsValid = validateInput();

  console.log(inputIsValid);

  if (!inputIsValid) {
    return inputElement.classList.add("error");
  }

  const taskItemContainer = document.createElement("div");
  taskItemContainer.classList.add("task-item");

  const taskContent = document.createElement("p");
  taskContent.innerText = inputElement.value;

  taskContent.addEventListener("click", () => handleClick(taskContent));

  const deleteItem = document.createElement("i");
  deleteItem.classList.add("far");
  deleteItem.classList.add("fa-trash-alt");

  deleteItem.addEventListener("click", () =>
    handleDeleteClick(taskItemContainer, taskContent)
  );

  taskItemContainer.appendChild(taskContent);
  taskItemContainer.appendChild(deleteItem);

  tasksContainer.appendChild(taskItemContainer);

  inputElement.value = "";

  updateLocalStorage();
};

const handleClick = (taskContent) => {
  const tasks = tasksContainer.childNodes;

  for (const task of tasks) {
    const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);

    if (currentTaskIsBeingClicked) {
      task.firstChild.classList.toggle("completed");
    }
  }

  updateLocalStorage();
};

const handleDeleteClick = (taskItemContainer, taskContent) => {
  const tasks = tasksContainer.childNodes;

  for (const task of tasks) {
    const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);

    if (currentTaskIsBeingClicked) {
      taskItemContainer.remove();
    }
  }

  updateLocalStorage();
};

const handleInputChange = () => {
  const inputIsValid = validateInput();

  if (inputIsValid) {
    return inputElement.classList.remove("error");
  }
};

const updateLocalStorage = () => {
  const tasks = tasksContainer.childNodes;

  const localStorageTasks = [...tasks].map((task) => {
    const content = task.firstChild;
    const isCompleted = content.classList.contains("completed");

    return { description: content.innerText, isCompleted };
  });

  localStorage.setItem("tasks", JSON.stringify(localStorageTasks));
};

const refreshTasksUsingLocalStorage = () => {
  const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"));

  if (!tasksFromLocalStorage) return;

  for (const task of tasksFromLocalStorage) {
    const taskItemContainer = document.createElement("div");
    taskItemContainer.classList.add("task-item");

    const taskContent = document.createElement("p");
    taskContent.innerText = task.description;

    if (task.isCompleted) {
      taskContent.classList.add("completed");
    }

    taskContent.addEventListener("click", () => handleClick(taskContent));

    const deleteItem = document.createElement("i");
    deleteItem.classList.add("far");
    deleteItem.classList.add("fa-trash-alt");

    deleteItem.addEventListener("click", () =>
      handleDeleteClick(taskItemContainer, taskContent)
    );

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);

    tasksContainer.appendChild(taskItemContainer);
  }
};

refreshTasksUsingLocalStorage();

addTaskButton.addEventListener("click", () => handleAddTask());

inputElement.addEventListener("change", () => handleInputChange());

const previousFiles = [
  { type: "image", url: "https://via.placeholder.com/80", name: "imagem1.jpg" },
  { type: "image", url: "https://via.placeholder.com/80", name: "imagem2.jpg" },
  { type: "file", name: "documento1.pdf" },
  { type: "file", name: "relatorio.docx" },
];

// Exibir arquivos anteriores
const fileList = document.getElementById("file-list");
previousFiles.forEach((file) => {
  const li = document.createElement("li");

  if (file.type === "image") {
    const img = document.createElement("img");
    img.src = file.url;
    li.appendChild(img);
  }

  const fileName = document.createElement("span");
  fileName.classList.add("file-name");
  fileName.textContent = file.name;
  li.appendChild(fileName);

  fileList.appendChild(li);
});

// Simulação de envio de arquivo
document.getElementById("upload-btn").addEventListener("click", function () {
  const fileInput = document.getElementById("file-input");
  const file = fileInput.files[0];
  if (file) {
    const li = document.createElement("li");

    if (file.type.startsWith("image/")) {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      li.appendChild(img);
    }

    const fileName = document.createElement("span");
    fileName.classList.add("file-name");
    fileName.textContent = file.name;
    li.appendChild(fileName);

    fileList.appendChild(li);
  }
});

const newsList = document.getElementById("news-list");
const newsInput = document.getElementById("news-input");
const addNewsBtn = document.getElementById("add-news-btn");

// Function to add news
function addNews(newsText) {
  const li = document.createElement("li");

  li.innerHTML = `
      <span class="news-text">${newsText}</span>
      <div class="news-actions">
        <button class="reaction-btn">👍 <span class="reaction-icon">0</span></button>
        <button class="edit-btn">✏️ Editar</button>
      </div>
    `;

  // Reaction handler
  const reactionBtn = li.querySelector(".reaction-btn");
  let reactionCount = 0;
  reactionBtn.addEventListener("click", () => {
    reactionCount++;
    reactionBtn.querySelector(".reaction-icon").textContent = reactionCount;
  });

  // Edit handler
  const editBtn = li.querySelector(".edit-btn");
  editBtn.addEventListener("click", () => {
    const newNewsText = prompt("Edite a notícia:", newsText);
    if (newNewsText) {
      li.querySelector(".news-text").textContent = newNewsText;
    }
  });

  newsList.appendChild(li);
}

// Add news button event listener
addNewsBtn.addEventListener("click", () => {
  const newsText = newsInput.value.trim();
  if (newsText) {
    addNews(newsText);
    newsInput.value = "";
  }
});

// Lista de tarefas
let tasks = [
  { id: 1, name: "Tarefa 1", status: "progress" },
  { id: 2, name: "Tarefa 2", status: "completed" },
];

function renderTasks() {
  const progressTasks = document.getElementById("progress-tasks");
  const completedTasks = document.getElementById("completed-tasks");
  progressTasks.innerHTML = "";
  completedTasks.innerHTML = "";

  tasks.forEach((task) => {
    const taskElement = document.createElement("li");
    taskElement.textContent = task.name;
    taskElement.draggable = true;

    if (task.status === "progress") {
      progressTasks.appendChild(taskElement);
    } else {
      completedTasks.appendChild(taskElement);
    }

    // Função de arrastar e soltar
    taskElement.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("taskId", task.id);
    });
  });
}

document.getElementById("progress-tasks").addEventListener("dragover", (e) => {
  e.preventDefault();
});

document.getElementById("progress-tasks").addEventListener("drop", (e) => {
  const taskId = e.dataTransfer.getData("taskId");
  const task = tasks.find((t) => t.id == taskId);
  task.status = "progress";
  renderTasks();
});

document.getElementById("completed-tasks").addEventListener("dragover", (e) => {
  e.preventDefault();
});

document.getElementById("completed-tasks").addEventListener("drop", (e) => {
  const taskId = e.dataTransfer.getData("taskId");
  const task = tasks.find((t) => t.id == taskId);
  task.status = "completed";
  renderTasks();
});

// Função para adicionar tarefas
function addTask() {
  const taskName = prompt("Digite o nome da nova tarefa:");
  if (taskName) {
    tasks.push({ id: tasks.length + 1, name: taskName, status: "progress" });
    renderTasks();
  }
}

// Inicializa as tarefas
renderTasks();

// Gráfico 1
var ctx1 = document.getElementById("chart1").getContext("2d");
var chart1 = new Chart(ctx1, {
  type: "pie", // Tipo de gráfico: pode ser 'line', 'pie', etc.
  data: {
    labels: ["Janeiro", "Fevereiro", "Março"],
    datasets: [
      {
        label: "Projetos Concluídos",
        data: [3, 7, 4],
        backgroundColor: ["rgba(75, 192, 192, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)"],
        borderWidth: 5,
      },
    ],
  },
  options: {
    responsive: true,
    onClick: (event, activeElements) => {
      // Lógica de edição pelo usuário ao clicar nos gráficos
      if (activeElements.length > 0) {
        var datasetIndex = activeElements[0].datasetIndex;
        var dataIndex = activeElements[0].index;
        var value = chart1.data.datasets[datasetIndex].data[dataIndex];
        var newValue = prompt("Digite o novo valor:", value);
        if (newValue !== null) {
          chart1.data.datasets[datasetIndex].data[dataIndex] = newValue;
          chart1.update();
        }
      }
    },
  },
});

// Gráfico 2
var ctx2 = document.getElementById("chart2").getContext("2d");
var chart2 = new Chart(ctx2, {
  type: "line",
  data: {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: "Progresso do Projeto",
        data: [10, 30, 50, 90],
        backgroundColor: ["rgba(153, 102, 255, 0.2)"],
        borderColor: ["rgba(153, 102, 255, 1)"],
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    onClick: (event, activeElements) => {},
  },
});

// Gráfico 3 (Gráfico Atual)

document
  .getElementById("add-comment-btn")
  .addEventListener("click", function () {
    // Obtenha o nome e o comentário
    const name = document.getElementById("name-input").value.trim();
    const comment = document.getElementById("comment-input").value.trim();

    // Verifique se os campos não estão vazios
    if (name !== "" && comment !== "") {
      // Crie um novo item de lista para o comentário
      const newComment = document.createElement("li");
      newComment.innerHTML = `<strong>${name}:</strong> ${comment}`;

      // Adicione o novo comentário à lista
      document.getElementById("comment-list").appendChild(newComment);

      // Limpe os campos de entrada
      document.getElementById("name-input").value = "";
      document.getElementById("comment-input").value = "";
    } else {
      alert("Por favor, preencha ambos os campos de nome e comentário.");
    }
  });

// Gráfico Dinâmico usando Chart.js
const ctx = document.getElementById("performanceChart").getContext("2d");
const performanceChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: [
      "Equipe Marketing",
      "Equipe Financeiro",
      "Almoxerifado",
      "Empresa",
    ],
    datasets: [
      {
        label: "Status do Projeto (100%)",
        data: [60, 70, 80, 90],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

// Alterna o tema entre claro e escuro
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
}

// Inicializa a funcionalidade de arrastar e soltar
const sortable = Sortable.create(document.querySelectorAll(".task-column ul"), {
  group: "tasks",
  animation: 150,
});

// Adiciona uma tarefa
function adicionarTarefa(secao, tarefa) {
  const ul = document.getElementById(secao).querySelector("ul");
  const li = document.createElement("li");
  li.className = "task-item";
  li.textContent = tarefa;
  ul.append;
}

function updateFeed(message) {
  const feed = document.getElementById("feed");
  const newMessage = document.createElement("div");
  newMessage.textContent = message;
  feed.appendChild(newMessage);
}

function updateFeed(message) {
  const feed = document.getElementById("feed");
  const newMessage = document.createElement("div");
  newMessage.textContent = message;
  feed.appendChild(newMessage);
}

// Funções para arrastar e soltar
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
  updateChart();
}

// Adicionar novas metas
document.getElementById("add-goal-btn").addEventListener("click", function () {
  var newGoal = document.getElementById("new-goal").value;
  if (newGoal) {
    var li = document.createElement("li");
    li.textContent = newGoal;
    var editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.classList.add("edit-goal");
    li.appendChild(editButton);
    document.getElementById("goals").appendChild(li);
    document.getElementById("new-goal").value = "";
  }
});

// Gráfico dinâmico de progresso
function updateChart() {
  var inProgress = document.getElementById("progress-tasks").children.length;
  var underReview = document.getElementById("review-tasks").children.length;
  var completed = document.getElementById("completed-tasks").children.length;
  var total = inProgress + underReview + completed;

  var ctx = document.getElementById("progress-chart").getContext("2d");
  var chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Em Progresso", "Em Análise", "Concluído"],
      datasets: [
        {
          data: [inProgress, underReview, completed],
          backgroundColor: ["#ffcc00", "#ff9900", "#33cc33"],
        },
      ],
    },
  });
}

// Inicializa o gráfico
updateChart();
