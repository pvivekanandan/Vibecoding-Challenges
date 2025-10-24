
import React, { useState, useEffect } from 'react';
import type { Todo } from './types';
import Header from './components/Header';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const savedTodos = localStorage.getItem('todos');
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (error) {
      console.error("Could not parse todos from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos(prevTodos => [newTodo, ...prevTodos]);
  };

  const toggleTodo = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };
  
  const editTodo = (id: number, newText: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans flex flex-col items-center pt-8 sm:pt-16 px-4">
      <div className="w-full max-w-2xl mx-auto">
        <Header />
        <main className="mt-8 bg-slate-800 rounded-lg shadow-2xl p-6">
          <AddTodoForm onAddTodo={addTodo} />
          <TodoList 
            todos={todos} 
            onToggleTodo={toggleTodo} 
            onDeleteTodo={deleteTodo}
            onEditTodo={editTodo}
          />
        </main>
        <footer className="text-center mt-8 text-slate-500 text-sm">
          <p>A simple and elegant way to manage your tasks.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
