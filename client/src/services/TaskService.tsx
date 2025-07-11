
// If you are using Vite:
const API_URL = import.meta.env.VITE_API_URL as string;

export async function getTasks() {
    if (!API_URL) {
        throw new Error('API_URL is not defined in the environment variables');
    }
    
    const response = await fetch(`${API_URL}tasks`);
    if (!response.ok) {
        throw new Error('Failed to fetch tasks');
    }

    return response.json();
}

export async function createTask(task: { title: string; description: string, completed?: boolean }) {
    console.log(`Creating task: ${JSON.stringify(task)}`);
    if (!API_URL) {
        throw new Error('API_URL is not defined in the environment variables');
    }

    const response = await fetch(`${API_URL}tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });

    if (!response.ok) {
        throw new Error('Failed to create task');
    }

    return response.json();
}

export async function updateTask(id: string, task: { title: string; description: string, completed?: boolean }) {
    if (!API_URL) {
        throw new Error('API_URL is not defined in the environment variables');
    }

    const response = await fetch(`${API_URL}tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });

    if (!response.ok) {
        throw new Error('Failed to update task');
    }

    return response.json();
}

export async function deleteTask(id: string) {
    if (!API_URL) {
        throw new Error('API_URL is not defined in the environment variables');
    }

    const response = await fetch(`${API_URL}tasks/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete task');
    }

    return response.json();
}

export async function getTaskById(id: string) {
    console.log(`Fetching task with ID: ${id}`);
    
    if (!API_URL) {
        throw new Error('API_URL is not defined in the environment variables');
    }

    const response = await fetch(`${API_URL}tasks/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch task');
    }

    return response.json();
}