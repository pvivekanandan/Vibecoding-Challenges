
import React, { useState, useRef, useEffect } from 'react';
import type { Todo } from '../types';
import { TrashIcon } from './icons/TrashIcon';
import { EditIcon } from './icons/EditIcon';
import { SaveIcon } from './icons/SaveIcon';

interface TodoItemProps {
  todo: Todo;
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
  onEditTodo: (id: number, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleTodo, onDeleteTodo, onEditTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);
  
  const handleSave = () => {
    if (editText.trim()) {
      onEditTodo(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <li className="flex items-center bg-slate-700 p-3 rounded-md transition-all duration-300 hover:bg-slate-600/50 group">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggleTodo(todo.id)}
        className="w-5 h-5 rounded text-cyan-500 bg-slate-600 border-slate-500 focus:ring-cyan-500 mr-4"
      />
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="flex-grow bg-slate-600 text-slate-100 rounded px-2 py-1 focus:ring-1 focus:ring-cyan-500 focus:outline-none"
        />
      ) : (
        <span
          className={`flex-grow cursor-pointer ${
            todo.completed ? 'line-through text-slate-400' : 'text-slate-100'
          }`}
          onClick={() => !todo.completed && setIsEditing(true)}
        >
          {todo.text}
        </span>
      )}
      <div className="flex items-center ml-4 space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {isEditing ? (
            <button onClick={handleSave} className="text-green-400 hover:text-green-300">
                <SaveIcon />
            </button>
        ) : (
            <button onClick={() => setIsEditing(true)} className="text-slate-400 hover:text-cyan-400">
                <EditIcon />
            </button>
        )}
        <button onClick={() => onDeleteTodo(todo.id)} className="text-slate-400 hover:text-red-400">
          <TrashIcon />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
