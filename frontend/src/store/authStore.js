// src/store/taskStore.js
import { create } from 'zustand';
import axios from 'axios';

const authStore = create((set) => ({

    loggedIn: null,

    loginForm: {
        email: "",
        password: "",
    },
    signupForm: {
        email: "",
        password: "",
    },

    updateLoginForm: (e) => {
        const { name, value } = e.target

        set((state) => {
            return {
                loginForm: {
                    ...state.loginForm,
                    [name]: value,
                }
            }
        })
    },

    updateSignupForm: (e) => {
        const { name, value } = e.target

        set((state) => {
            return {
                signupForm: {
                    ...state.signupForm,
                    [name]: value,
                }
            }
        })
    },



    login: async () => {

        const { loginForm } = authStore.getState();

        try {
            const res = await axios.post("http://localhost:5000/login", loginForm);

            set(({
                loggedIn: true,
                loginForm: {
                    email: '',
                    password: ''
                },
            }));

            console.log(res);
        } catch (error) {
            console.log(error);
        }
    },

    checkAuth: async () => {
        try {
            await axios.get("http://localhost:5000/checkAuth");
            set({ loggedIn: true });
        } catch (error) {
            set({ loggedIn: false }); // Set loggedIn to false on error
        }
    },

    signup: async () => {
        const { signupForm } = authStore.getState();
        const res = await axios.post('http://localhost:5000/signup', signupForm);
        set({
            signupForm: {
                email: '',
                password: ''
            }
        })
        console.log(res);
    },

    logout: async () => {
        try {
            await axios.get("http://localhost:5000/logout");
            set({ loggedIn: false });
        } catch (error) {
            console.log(error);
        }
    }

}));

export default authStore;
