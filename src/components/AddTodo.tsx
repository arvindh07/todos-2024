import { SyntheticEvent, useState } from "react"
import axiosInstance from "../api/axios";
import { ADD_TODO } from "../api/paths";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { todoActions } from "../store/slices/todoSlice";
import { useNavigate } from "react-router-dom";

interface StateInterface {
    title: string;
    completed: boolean;
}

const AddTodo = () => {
    const [formDetails, setFormDetails] = useState<StateInterface>({
        title: "",
        completed: false
    });
    const dispatch = useDispatch();
    const todos = useSelector((state: RootState) => state.todos);
    const navigate = useNavigate();

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, checked} = e.target;
        setFormDetails((prev) => ({
            ...prev,
            [name]: name === "title" ? value : checked
        }))
    }

    const addATodo = async (e: SyntheticEvent) => {
        e.preventDefault();
        const {title, completed} = formDetails;
        const payload = {
            id: todos.length + 1,
            title,
            completed
        };

        const response = await axiosInstance.post(ADD_TODO, payload);
        
        dispatch(todoActions.addTodo([response?.data]));
        navigate("/");
    }

    return (
        <div>
            <h1 className="heading">Add a todo</h1>
            <form method="post" className="form_todo">
                <div className="form_input">
                    <label htmlFor="title">Title: </label>
                    <input 
                        type="text" 
                        name="title" 
                        value={formDetails?.title} 
                        onChange={changeHandler}
                        placeholder="Enter a title" />
                </div>
                <div className="form_input">
                    <label htmlFor="completed">Completed: </label>
                    <input type="checkbox" name="completed" id="completed" checked={formDetails?.completed} onChange={changeHandler} />
                </div>
                <button className="add__btn" onClick={addATodo}>Add</button>
            </form>
        </div>
    )
}

export default AddTodo