document.addEventListener('DOMContentLoaded', function () {
    const taskListContainer = document.querySelector('.taskLists');
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskData');
    const dateInput = document.getElementById('date');
    let taskIdCounter = 1;


    // Charger les tâches depuis le localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        taskListContainer.innerHTML = '';
        tasks.forEach(task => {
            addTaskToDOM(task);
        });
    }

    // Ajouter une tâche au DOM
    function addTaskToDOM(task) {
        const taskItem = document.createElement('div');
        taskItem.className = 'item';
        taskItem.dataset.id = taskIdCounter; // Attribuer un identifiant à la tâche
        taskItem.innerHTML = `
            <div class="left">
                <p class="task">${task.text}</p>
                <p class="date">${task.date}</p>
            </div>
            <div class="right">
                ${task.checked ? `<a href="#" class="check" onclick="toggleTaskCheck(${taskIdCounter})"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="currentColor" d="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z"/>
            </svg></a>` : `<a href="#" class="uncheck" onclick="toggleTaskCheck(${taskIdCounter})"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 20a8 8 0 0 0 8-8a8 8 0 0 0-8-8a8 8 0 0 0-8 8a8 8 0 0 0 8 8m0-18a10 10 0 0 1 10 10a10 10 0 0 1-10 10C6.47 22 2 17.5 2 12A10 10 0 0 1 12 2m.5 5v5.25l4.5 2.67l-.75 1.23L11 13V7z"/></svg></a>`}
            </div>
        `;
        taskListContainer.appendChild(taskItem);
        taskIdCounter++;
    }

    // Sauvegarder une tâche dans le localStorage
    function saveTask(task) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Gérer la soumission du formulaire
    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        const taskDate = dateInput.value;

        if (taskText && taskDate) {
            const newTask = { id: taskIdCounter, text: taskText, date: taskDate, checked: false };
            saveTask(newTask);
            addTaskToDOM(newTask);

            // Réinitialiser le formulaire
            taskInput.value = '';
            dateInput.value = '';
        }
    });
    window.toggleTaskCheck = function(taskId) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        console.log(tasks);
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        console.log(taskIndex);
        if (taskIndex !== -1) {
            tasks[taskIndex].checked = !tasks[taskIndex].checked;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            console.log(taskIndex);
            loadTasks();
        }
    };

    loadTasks();
});
