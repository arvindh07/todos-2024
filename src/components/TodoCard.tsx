import { useDispatch } from "react-redux";
import axiosInstance from "../api/axios";
import { todoActions, TodoInterface } from "../store/slices/todoSlice"
import { useState } from "react";

interface CardProps {
    todo: TodoInterface;
}
const TodoCard = ({ todo }: CardProps) => {
    const dispatch = useDispatch();
    const [completed, setCompleted] = useState(todo?.completed);

    const deleteTodo = async (id: number) => {
        await axiosInstance.delete(`/todos/${id}`);
        dispatch(todoActions.removeTodo({ id }));
        alert("Deleted Successfully");
    }

    const editATodo = async (value: boolean) => {
        const payload = {
            ...todo,
            completed: value
        };

        const response = await axiosInstance.put(`todos/${todo?.id}`, payload);        
        dispatch(todoActions.editTodo([response?.data]));
    }


    return (
        <div className="todo__card">
            <h1>{todo?.title} - <span>{todo?.completed ? "Completed" : "Not completed"}</span></h1>
            <div className="form_input">
                <label htmlFor="completed">Completed: </label>
                <input type="checkbox" name="completed" id="completed" checked={completed} onChange={(e) => {
                    setCompleted((prev) => !prev);
                    editATodo(e.target.checked);
                }} />
            </div>
            <button
                className="add__btn"
                style={{ marginRight: "auto", marginLeft: "0" }}
                onClick={() => deleteTodo(todo?.id)}
            >Delete</button>
        </div>
    )
}

export default TodoCard