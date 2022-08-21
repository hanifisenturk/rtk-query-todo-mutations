import { nanoid } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:1923/";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "todos",
      providesTags: ["Todos"],
    }),
    addTodos: builder.mutation({
      query: ({ title }) => ({
        url: `todos`,
        method: "POST",
        body: {
          id: nanoid(),
          title,
          completed: false,
        },
      }),
      invalidatesTags: ["Todos"],
    }),
    deleteTodo: builder.mutation({
      query: ({ id }) => ({
        url: `todos/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Todos"],
    }),
    completeTodo: builder.mutation({
      query: ({ id, completed }) => ({
        url: `todos/${id}`,
        method: "PATCH",
        body: { completed },
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodosMutation,
  useDeleteTodoMutation,
  useCompleteTodoMutation,
} = apiSlice;
