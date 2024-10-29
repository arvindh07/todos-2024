import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store"
import { todoActions, TodoInterface } from "../store/slices/todoSlice";
import TodoCard from "./TodoCard";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { GET_TODOS } from "../api/paths";

const TodoList = () => {
    const todos = useSelector((state: RootState) => state.todos);
    const dispatch = useDispatch();
    const [filterVal, setFilterVal] = useState("all");
    const [filtered, setFiltered] = useState([...todos]);

    useEffect(() => {
        // fetch todos
        if (todos?.length === 0) {
            fetchTodos();
        }
    }, [])

    useEffect(() => {
        let newFil:any = [];
        if(filterVal === "completed") {
            newFil = todos?.filter((todo: TodoInterface) => todo.completed);
        } else if(filterVal === "notCompleted") {
            newFil = todos?.filter((todo: TodoInterface) => !todo.completed);
        } else {
            newFil = [...todos];
        }
        setFiltered(newFil);
    }, [filterVal, todos])

    const fetchTodos = async () => {
        const response = await axiosInstance.get(GET_TODOS);
        dispatch(todoActions.addTodo(response?.data));
        setFiltered([...response.data]);
    }

    return (
        <>
            <div style={{ display: "flex", gap: "10px", marginBottom: "1rem "}}>
                <p>Filter: </p>
                <select name="filter" id="" value={filterVal} onChange={(e) => setFilterVal(e.target.value)}>
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="notCompleted">Not completed</option>
                </select>
            </div>
            <div className="todo__container">
                {todos?.length ? <>
                    {(filtered || todos)?.map((todo: TodoInterface) => {
                        return (
                            <TodoCard key={todo?.id} todo={todo} />
                        )
                    })}
                </> : <>No todos. Please add a todo</>}
            </div>
        </>
    )
}

export default TodoList