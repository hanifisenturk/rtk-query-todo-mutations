import { useId, useState } from "react";
import {
  useGetTodosQuery,
  useAddTodosMutation,
  useDeleteTodoMutation,
  useCompleteTodoMutation,
} from "./features/api/apiSlice";

function App() {
  const id = useId();
  const [todo, setTodo] = useState("");
  const [addTodos] = useAddTodosMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [completeTodo] = useCompleteTodoMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodos({ title: todo });
    console.log(todo);
    setTodo("");
  };

  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery();

  return (
    <div className="h-screen bg-gray-800 text-gray-300 ">
      <div className="my-0 mx-auto max-w-[400px] text-center ">
        <form onSubmit={handleSubmit}>
          <label className="block mb-2" htmlFor={id}>
            Add new todo
          </label>
          <input
            onChange={(e) => setTodo(e.target.value)}
            className="text-black"
            id={id}
            type="text"
            value={todo}
          />
        </form>
        {isLoading && <p>Loading...</p>}
        {isSuccess &&
          todos.map((todo) => {
            return (
              <div
                key={todo.id}
                className="flex items-center justify-between mb-3"
              >
                <p>{todo.title}</p>
                <div>
                  <button
                    onClick={() => deleteTodo({ id: todo.id })}
                    className="mr-2 py-1 px-2 bg-red-400"
                  >
                    DELETE
                  </button>
                  <input
                    onChange={() =>
                      completeTodo({ id: todo.id, completed: !todo.completed })
                    }
                    checked={todo.completed}
                    type="checkbox"
                  />
                </div>
              </div>
            );
          })}
        {isError && <p>{error.status}</p>}
        {todos?.length === 0 && <p>There is no todo to display</p>}
      </div>
    </div>
  );
}

export default App;
