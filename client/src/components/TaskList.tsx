import Swal from "sweetalert2";
import type { Task } from "../types";
import {useState} from "react";

import { getTasks } from "../services/TaskService";

export default function TaskList() {
    
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Fetch tasks from the server
    const fetchTasks = async () => {
        try {
            setLoading(true);
            const data = await getTasks();
            setTasks(data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        } finally {
            setLoading(false);
        }
    }

    // Call fetchTasks when the component mounts
    useState(() => {
        fetchTasks();
    });
    
    // Handle delete task
    const handleDeleteTask = (id: string) => async () => {
        Swal.fire({
            title: '¿Estas seguro de eliminar esta tarea?',
            text: "Esta acción no se puede deshacer.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarla!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`${import.meta.env.VITE_API_URL}tasks/${id}`, {
                        method: 'DELETE',
                    });

                    if (!response.ok) {
                        throw new Error('Hubo un error al eliminar la tarea');
                    }

                    Swal.fire(
                        'Eliminado!',
                        'La tarea ha sido eliminada.',
                        'success'
                    );

                    // Refresh the task list
                    fetchTasks();
                } catch (error) {
                    console.error("Error deleting task:", error);
                    Swal.fire(
                        'Error!',
                        'There was an error deleting the task.',
                        'error'
                    );
                }
            }
        });
    }

    if (!tasks || tasks.length === 0) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-2xl text-center font-bold mb-4">No Tasks Available</h1>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-2xl text-center font-bold mb-4">Loading...</h1>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl text-center font-bold mb-4">Task List</h1>
            
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b">Title</th>
                        <th className="px-4 py-2 border-b">Description</th>
                        <th className="px-4 py-2 border-b">Status</th>
                        <th className="px-4 py-2 border-b">Date</th>
                        <th className="px-4 py-2 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((item: Task) => (
                        <tr key={item.id} className="hover:bg-gray-100">
                            <td className="px-4 py-2 text-center border-b">{item.title}</td>
                            <td className="px-4 py-2 text-center border-b">{item.description}</td>
                            <td className="px-4 py-2 text-center border-b">{item.completed ? "Completed" : "Pending"}</td>
                            <td className="px-4 py-2 text-center border-b">{new Date(item.createdAt).toLocaleDateString()}</td>
                            <td className="px-4 py-2 text-center border-b">
                                <button 
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                                    onClick={() => window.location.href = `/task/${item.id}`}
                                >
                                    View
                                </button>
                                <button 
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                                    onClick={() => window.location.href = `/editTask/${item.id}`}
                                >
                                    Edit
                                </button>
                                <button 
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                    onClick={handleDeleteTask(item.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}