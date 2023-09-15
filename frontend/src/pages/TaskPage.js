
import React, { useEffect } from 'react';
import useTaskStore from '../store/taskStore';

const TaskPage = () => {
    const {
        tasks,
        createForm,
        updateForm,
        showUpdateForm,
        fetchTasks,
        updateTaskField,
        createTask,
        updateTask,
        deleteTask,
    } = useTaskStore();


    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);
    return (
        <div className="todo-container">
            <div className="task-list">
                {!showUpdateForm ? (
                    <form className="todo-form" onSubmit={createTask}>
                        <h2>Create a New Task</h2>
                        <input
                            onChange={updateTaskField}
                            type="text"
                            name="task"
                            value={createForm.task}
                            placeholder="Task Name"
                        />
                        <textarea
                            onChange={updateTaskField}
                            value={createForm.body}
                            placeholder="Task Description"
                            name="body"
                        />
                        <button>Create</button>
                    </form>
                ) : (
                    <form className="todo-form" onSubmit={updateTask}>
                        <h2>Update Task</h2>
                        <input
                            onChange={updateTaskField}
                            type="text"
                            name="task"
                            value={updateForm.task}
                            placeholder="Task Name"
                        />
                        <textarea
                            onChange={updateTaskField}
                            value={updateForm.body}
                            placeholder="Task Description"
                            name="body"
                        />
                        <button type="submit">Update</button>
                        <button type="button" onClick={() => useTaskStore.setState({ showUpdateForm: false })}>
                            Cancel
                        </button>
                    </form>
                )}
                <h2>Task List</h2>
                {tasks.map((task) => (
                    <div key={task._id} className="task">
                        <h3>{task.task}</h3>
                        <p>{task.body}</p>
                        <button onClick={() => deleteTask(task._id)} type="button">
                            Delete
                        </button>
                        <button
                            onClick={() => {
                                useTaskStore.setState({
                                    showUpdateForm: true,
                                    updateForm: {
                                        taskId: task._id,
                                        task: task.task,
                                        body: task.body,
                                    },
                                });
                            }}
                            type="button"
                        >
                            Edit
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TaskPage