// Substract CSRF token from cookie for AJAX POST request
const cookie = document.cookie;
const csrfToken = cookie.substring(cookie.indexOf('=') + 1);

// Define task uls 
const tasksC = document.getElementById('tasksC');
const tasksNC = document.getElementById('tasksNC');

const getUrl = 'read/';
const stateUrl = 'state/';
const updateUrl = 'update/';
let tasks = {};

async function getTasks(url = '') {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
}

// Example POST method implementation:
async function postTask(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRFToken': csrfToken,
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

function populate() {
    getTasks(getUrl)
        .then(data => {
            tasks = data.tasks;
            console.log(tasks);
            for (let i = 0; i < tasks.length; i++) {
                let task = document.createElement('li');
                task.id = tasks[i].id;
                // Div for reading tasks
                let read = document.createElement('div');
                read.id = 'read' + tasks[i].id;
                    // Inner text
                    let p = document.createElement('p');
                    p.id = 'p' + tasks[i].id;
                    p.innerHTML = tasks[i].desc;
                    read.appendChild(p);
                    // State button
                    let stateB = document.createElement('button');
                    stateB.type = 'button';
                    stateB.innerHTML = 'State';
                    stateB.addEventListener("click", function() {
                        state(tasks[i].id)
                    });
                    read.appendChild(stateB);
                    // Update button
                    let updateB = document.createElement('button');
                    updateB.id = 'ub' + tasks[i].id
                    updateB.type = 'button';
                    updateB.innerHTML = 'Update';
                    updateB.addEventListener("click", function() {
                        ru(tasks[i].id, false);
                    });
                    read.appendChild(updateB);
                    // Add read div to task li
                    task.appendChild(read);
                // Div for updating task
                let change = document.createElement('div');
                change.id = 'change' + tasks[i].id;
                change.classList.add('hide');
                    // Input for updating desc
                    let inputD = document.createElement('input');
                    inputD.id = 'input' + tasks[i].id;
                    inputD.type = 'text';
                    inputD.defaultValue = tasks[i].desc;
                    change.appendChild(inputD);
                    // Button for confirming update
                    let confirmU = document.createElement('button');
                    confirmU.type = 'button';
                    confirmU.innerHTML = 'Confirm';
                    confirmU.addEventListener("click", function() {
                        update(tasks[i].id);
                    });
                    change.appendChild(confirmU);
                    // Button for canceling update
                    let cancelU = document.createElement('button');
                    cancelU.type = 'button';
                    cancelU.innerHTML = 'Cancel';
                    cancelU.addEventListener("click", function() {
                        ru(tasks[i].id, true);
                    });
                    change.appendChild(cancelU);
                    // Add update div to task li
                    task.appendChild(change);
                if (tasks[i].state == false) {
                    tasksNC.appendChild(task);
                }
                else {
                    task.classList.add('state');
                    tasksC.appendChild(task);
                    hideUB(tasks[i].id);
                }
            } 
        })
}

function ru(id, cancel) {
    let changeDiv = document.getElementById('change' + id);
    let readDiv = document.getElementById('read' + id);

    readDiv.classList.toggle('hide');
    changeDiv.classList.toggle('hide');
    
    // If canceling update, return previous value to input
    if (cancel == true) {
        let objectId = id;
        const task = tasks.find( ({ id }) => id == objectId);
        document.getElementById('input'+id).value = task.desc;
    }
}

function hideUB(id) {
    let ub = document.getElementById('ub'+id);
    ub.classList.toggle('hide');
}

function update(id) {
    let postUrl = id + '/' + updateUrl;
    let input = document.getElementById('input'+id);
    let desc = document.getElementById('p'+id);

    postTask(postUrl, {data: input.value})
        .then(data => {
            if (data.task.id == id) {
                desc.innerHTML = data.task.desc;
                ru(id, false);
            }
            else {
                console.log('Task id from ajax request and server response doesnt match');
            }
        });
}

function state(id) {
    let postUrl = id + '/' + stateUrl;
    let task = document.getElementById(id);

    postTask(postUrl, {})
        .then(data => {
            if (data.task.id == id) {
                task.classList.toggle('state');
                hideUB(id);
                if (data.task.state == true) {
                    tasksC.insertBefore(task, tasksC.children[0]);
                }
                else if (data.task.state == false) {
                    tasksNC.insertBefore(task, tasksNC.children[0]);
                }
            }
            else {
                console.log('Task id from ajax request and server response doesnt match');
            }
        });
}

window.addEventListener('load', function () {
    populate();
})
