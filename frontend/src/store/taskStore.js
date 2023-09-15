// src/store/taskStore.js
import { create } from 'zustand';
import axios from 'axios';

const taskStore = create((set) => ({
  tasks: [],
  createForm: {
    task: '',
    body: '',
  },
  updateForm: {
    taskId: '',
    task: '',
    body: '',
  },
  showUpdateForm: false,

  fetchTasks: async () => {
    try {
      const res = await axios.get('http://localhost:5000/getTasks');
      set({ tasks: res.data.tasks });
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  },

  updateTaskField: (e) => {
    const { name, value } = e.target;
    if (!taskStore.getState().showUpdateForm) {
      set((state) => ({
        createForm: {
          ...state.createForm,
          [name]: value,
        },
      }));
    } else {
      set((state) => ({
        updateForm: {
          ...state.updateForm,
          [name]: value,
        },
      }));
    }
  },

  createTask: async (e) => {
    e.preventDefault();
    const { createForm, tasks } = taskStore.getState();
    try {
      const res = await axios.post('http://localhost:5000/createTasks', createForm);
      set({
        tasks: [...tasks, res.data.task],
        createForm: {
          task: '',
          body: '',
        },
      });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  },

  updateTask: async (e) => {
    e.preventDefault();
    const { updateForm, tasks, showUpdateForm } = taskStore.getState();
    const { taskId, task, body } = updateForm;

    try {
      await axios.put(`http://localhost:5000/updateTask/${taskId}`, {
        task,
        body,
      });

      // Fetch tasks and update the state
      const res = await axios.get('http://localhost:5000/getTasks');
      set((state) => ({
        tasks: res.data.tasks,
        showUpdateForm: !state.showUpdateForm,
      }));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  },

  deleteTask: async (_id) => {
    try {
      await axios.delete(`http://localhost:5000/deleteTask/${_id}`);
      const { tasks } = taskStore.getState();
      const newTasks = tasks.filter((task) => task._id !== _id);
      set({ tasks: newTasks });
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  },
}));

export default taskStore;
