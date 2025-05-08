// document.addEventListener('DOMContentLoaded', function() {
//     const form = document.getElementById('task-form');
//     const taskInput = document.getElementById('task-input');
//     const taskList = document.getElementById('task-list');

//     // Function to create a new task item
//     function createTaskItem(taskContent) {
//         // Create li element
//         const li = document.createElement('li');
//         li.textContent = taskContent;

//         // Add event listener to mark task as completed
//         li.addEventListener('click', function() {
//             li.classList.toggle('completed');
//         });

//         // Add delete button
//         const deleteBtn = document.createElement('button');
//         deleteBtn.textContent = 'Delete';
//         deleteBtn.className = 'delete-btn';
//         deleteBtn.addEventListener('click', function() {
//             li.remove();
//         });

//         // Append delete button to li
//         li.appendChild(deleteBtn);

//         // Append li to task list
//         taskList.appendChild(li);
//     }

//     // Event listener for form submission
//     form.addEventListener('submit', function(event) {
//         event.preventDefault(); // Prevent form submission

//         const taskContent = taskInput.value.trim();
//         if (taskContent !== '') {
//             createTaskItem(taskContent); // Create new task item
//             taskInput.value = ''; // Clear input field
//         }
//     });
// });
document.addEventListener('DOMContentLoaded', function() {
    const formInterface = document.getElementById('form-interface');
    const calendarInterface = document.getElementById('calendar-interface');
    const formRadioButton = document.querySelector('input[value="form"]');
    const calendarRadioButton = document.querySelector('input[value="calendar"]');

    // Show form interface by default
    formInterface.style.display = 'block';
    calendarInterface.style.display = 'none';

    // Event listener for interface options
    formRadioButton.addEventListener('change', function() {
        formInterface.style.display = 'block';
        calendarInterface.style.display = 'none';
    });

    calendarRadioButton.addEventListener('change', function() {
        formInterface.style.display = 'none';
        calendarInterface.style.display = 'block';
        initializeCalendar();
    });

    // Event listener for form submission
    const taskForm = document.getElementById('task-form');
    taskForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        // Get form values
        const taskTitle = document.getElementById('task-title').value.trim();
        const startDate = document.getElementById('start-date').value;
        const dueDate = document.getElementById('due-date').value;
        const timeRequired = document.getElementById('time-required').value.trim();
        const category = document.getElementById('category').value.trim();
        const priority = document.getElementById('priority').value;

        // Add task to list
        addTaskToList(taskTitle, startDate, dueDate, timeRequired, category, priority);

        // Reset form
        taskForm.reset();
    });
});
