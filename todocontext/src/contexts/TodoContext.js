import React, { useContext } from "react";

const TodoContext = React.createContext({
    todos: [
        {
            id: 1,
            todo: "message",
            completed:false
        }
    ],
    addTodo: (todo)=>{},
    updateTodo: (id,todo)=>{},
    deleteTodo: (id)=>{},
    toggleComplete: (id)=>{}
});

export default TodoContext;

export const useTodo = ()=>{
    return useContext(TodoContext);
}

export const TodoContextProvider = TodoContext.Provider