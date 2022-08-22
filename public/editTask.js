const taskIDDOM = document.querySelector(".task-edit-id");
const taskNAMEDOM = document.querySelector(".task-edit-name");
const editFORMDOM = document.querySelector(".single-task-form");
const formAlertDOM = document.querySelector(".form-alert");
const taskCompletedDOM = document.querySelector(".task-edit-completed");

const params = window.location.search;
const id = new URLSearchParams(params).get("id");

console.log(id);

// 1つの特定のタスクを取得する
const ShowTask = async () => {
    try{
        const {data: task} = await axios.get(`/api/v1/tasks/${id}`);
        const {_id, completed, name} = task;
        taskIDDOM.textContent = _id;
        taskNAMEDOM.value = name;
        if(completed){
            taskCompletedDOM.checked = true;
        }
    }
    catch(err)
    {
        console.log(err);
    }
}

ShowTask();

// タスクの編集
editFORMDOM.addEventListener("submit", async (e) => {
    e.preventDefault();
    try{
        const taskname = taskNAMEDOM.value;
        const taskCompleted = taskCompletedDOM.checked;
        const {data: task} = await axios.patch(`/api/v1/tasks/${id}`,{
            name : taskname,
            completed: taskCompleted
        });
        formAlertDOM.style.display = "block";
        formAlertDOM.textContent = "編集に成功しました";
        formAlertDOM.classList.add("text-success");
    }
    catch(err)
    {
        console.log(err);
    }
    setTimeout(() => {
        formAlertDOM.style.display = "none";
        formAlertDOM.remove("text-success");
    },3000);
})