import TaskForm from "./TaskForm";
import { getTaskById } from "../services/TaskService";
import type { Task } from './../../../server/src/models/task.interface';
import { useParams } from "react-router";
import { useState, useEffect } from "react";

export default function TaskEdit() {
    const ID = useParams().id;
    console.log(`Editing task with ID: ${ID}`);
    

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

    
    
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl text-center font-bold mb-4">Edit Task</h1>
            <TaskForm
                mode="edit"
                task={task ? { ...task, createdAt: task.createdAt instanceof Date ? task.createdAt.toISOString() : task.createdAt } : undefined}
            />
        </div>
    )
}