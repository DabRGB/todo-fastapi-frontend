const API_BASE_URL = 'https://todo-fastapi-backend-emxz.onrender.com';

export const fetchTodos = async (filter = null) => {
    const url = new URL(`${API_BASE_URL}/todos/`);
    if (filter === "completed") url.searchParams.set("completed", "true");
    if (filter === "pending") url.searchParams.set("completed", "false");
    
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch todos");
    return await response.json();
};

export const createTodo = async (title) => {
    const response = await fetch(`${API_BASE_URL}/todos/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, completed: false }),
    });
    if (!response.ok) throw new Error("Failed to create todo");
    return await response.json();
};

export const updateTodo = async (id, updates) => {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error details:", errorData);  // Log detailed error
    throw new Error(errorData.detail || "Failed to update todo");
  }
  return await response.json();
};

export const deleteTodo = async (id) => {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete todo");
    return await response.json();
};