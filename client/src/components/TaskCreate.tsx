import TaskForm from "./TaskForm";

export default function TaskCreate() {

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl text-center font-bold mb-4">Create Task</h1>
            
                <TaskForm mode="create"/>
            
        </div>
    );
}