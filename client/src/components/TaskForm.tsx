import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


import type { Task } from '../types/index';
import { createTask, updateTask } from '../services/TaskService';

interface Props {
  mode: 'create' | 'edit';
  task?: Task;
}
export default function  TaskForm({ mode, task }: Props) {
    const navigate = useNavigate();

    const [title, setTitle] = useState(task?.title || '');
    const [description, setDescription] = useState(task?.description || '');
    const [completed, setCompleted] = useState(task?.completed || false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (mode === 'edit' && !task) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Tarea no encontrada',
            });
        }

        if (description.trim().length < 10) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La descripción debe tener al menos 10 caracteres',
            });
        }
        if (title.trim().length < 3) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El título debe tener al menos 3 caracteres',
            });
        }
        if (title.trim().length > 50) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El título debe tener menos de 50 caracteres',
            });
        }
        if (description.trim().length > 200) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La descripción debe tener menos de 200 caracteres',
            });
        }
        
        const taskData: Task = {
            title,
            description,
            completed,
            id: '',
            createdAt: ''
        };

        try {
            if (mode === 'create') {
                createTask(taskData);
            } else {
                updateTask(task!.id, taskData);
            }

            navigate('/');
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un error al guardar la tarea',
            });
        }
    };
    return (
        <form onSubmit={handleSubmit}  className="max-w-md mx-auto">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                    Description
                </label>
                <textarea
                    id="description"
                    placeholder="Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ></textarea>
            </div>
            <div className="mb-4">
                <label className="inline-flex items-center" htmlFor="completed">
                    <span className="text-gray-700 text-sm font-bold mr-2">Completed</span>
                
                    <div className="relative inline-flex items-center">            
                        <input
                            id="completed"
                            type="checkbox"
                            className="sr-only peer"
                            checked={completed}
                            onChange={(e) => {
                                setCompleted(e.target.checked);
                                console.log(`Checkbox changed: ${e.target.checked}`);
                            }}
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                    </div>
                </label>
            </div>
            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    {mode === 'create' ? 'Create Task' : 'Update Task'}
                </button>
                <button
                    type="button"
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                    onClick={() => window.location.href = '/'}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}