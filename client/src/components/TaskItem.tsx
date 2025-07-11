import { getTaskById } from "../services/TaskService";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import type { Task } from '../../../server/src/models/task.interface';

export default function TaskItem() {

    const ID = useParams().id;
    console.log(`Viewing task with ID: ${ID}`);
    if (!ID) {
        throw new Error('Task ID is required');
    }

    const [task, setTask] = useState<Task | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchTask = async () => {
            try {
                setLoading(true);
                const data = await getTaskById(ID);
                setTask(data);
            } catch (error) {
                console.error("Error fetching task:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTask();
    }, [ID]);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (!task) {
        return <div className="text-center">Task not found</div>;
    }

    // Format the createdAt date
    const createdAt = new Date(task.createdAt);
    const formattedDate = createdAt.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <div className="container max-h-11/12 max-w-7xl p-4 text-center">
            <h1 className="text-2xl text-center font-bold mb-4">Task Detail</h1>

            <div className={`relative ${task.completed ? 'bg-green-300' : 'bg-red-300'} shadow-md rounded-lg p-4`}>
                
                <p className="absolute top-2 right-3 text-gray-500 text-sm">
                    {formattedDate}
                </p>

                <h2 className="text-3xl font-semibold mb-4 text-center">
                    {task.title}
                </h2>

                <div className="text-gray-700 max-w-md mx-auto ">
                    <p className="text-gray-700 text-left mb-4 whitespace-pre-line">{task.description}</p>
                

                    <p className={`mt-2 ${task.completed ? 'text-green-700' : 'text-red-800'} text-left`}>
                        Status: {task.completed ? 'Completed' : 'Pending'}
                    </p>
                </div>
            </div>
        </div>
    );
}