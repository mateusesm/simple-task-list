const clearInput = (inputTask) => {
    inputTask.value = ''
    inputTask.focus()
}

const addTaskInList = (task) => {
    const ul = document.querySelector('.list')
    const li = document.createElement('li')
    const clearButton = document.createElement('button')

    clearButton.setAttribute('id', 'clearButton')
    clearButton.innerText = 'Apagar'
    li.innerText = task
    li.appendChild(clearButton)
    ul.appendChild(li)
}

const saveTasks = () => {
    const ul = document.querySelector('.list')
    const arrayTasks = []
    const liItems = ul.querySelectorAll('li')

    for (let li of liItems) {
        arrayTasks.push(li.textContent.split('Apagar', 1))
    }

    localStorage.setItem('tasks',JSON.stringify(arrayTasks))
}

const getInputValue = () => {
    const inputTask = document.querySelector('#idTask')

    if (inputTask.value !== '') {
        addTaskInList(inputTask.value)
        clearInput(inputTask)
        saveTasks()
    } else {
        alert('Preencha todos os campos!')
    }
   
}

const getInputValueToKey = (event) => {
    if (event.key === 'Enter') {
        const inputTask = document.querySelector('#idTask')
        
        if (inputTask.value !== '') {
            addTaskInList(inputTask.value)
            clearInput(inputTask)
            saveTasks()
        } else {
            alert('Preencha todos os campos!')
        }
    }
}

const loadTasks = () => {
    if (localStorage.length > 0) {
        const arrayTasks = JSON.parse(localStorage.getItem('tasks'))

        for (let task of arrayTasks) {
            addTaskInList(task)
        }
    }
}

const verifyDeleteTasks = () => {
    document.addEventListener('click', (e) => {
        if (e.target.id === 'clearButton') {
            e.target.parentElement.remove()
            saveTasks()
        }
    })

}

const start = () => {
    const button = document.querySelector('#idButton')
    button.addEventListener('click', getInputValue)

    document.addEventListener('keypress', getInputValueToKey)

    verifyDeleteTasks()
    loadTasks()
}

start()






