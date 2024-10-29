import { createSlice } from "@reduxjs/toolkit";

export interface TodoInterface {
    id: number;
    title: string;
    completed: boolean;
}

const initialState: TodoInterface[] = []

const todoSlice = createSlice({
    name: "todos",
    initialState: initialState,
    reducers: {
        addTodo: (state: Array<TodoInterface>, action) => {
            state = [...state, ...action.payload]
            return state;
        },
        removeTodo: (state: Array<TodoInterface>, action) => {
            const { id } = action.payload;
            const newTodos = state.filter((todo: TodoInterface) => todo.id !== id);
            state = newTodos;
            return state;
        },
        editTodo: (state: Array<TodoInterface>, action) => {
            const {id} = action?.payload?.[0];
            let newTodos = [...state];
            newTodos = newTodos?.map((todo: TodoInterface) => {
                if(todo.id === id) {
                    return {...action.payload?.[0]};
                }
                return todo;
            });
            state = newTodos;
            return state;
        }
    }
})

export const todoActions = todoSlice.actions;

export default todoSlice.reducer;