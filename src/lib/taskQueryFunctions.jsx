import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

// Fetch Tasks
const fetchTasks = async () => {
  const token = localStorage.getItem("clrtyToken");
  const response = await fetch(`${baseURL}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
};

export function fetchTaskOptions() {
  return queryOptions({
    queryKey: ["fetchTasks"],
    queryFn: fetchTasks,
  });
}
//Add Task
const addTask = async (formData) => {
  const token = localStorage.getItem("clrtyToken");
  response = await fetch(`${baseURL}/tasks/create/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });
  return await response.json();
};

export function addTaskOptions() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTask,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchTasks"] });

      console.log("Task added successfully");
    },
  });
}

//update Status
const updateStatus = async ({ taskId, status }) => {
  const token = localStorage.getItem("clrtyToken");
  response = await fetch(`${baseURL}/tasks/update/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });
  return await response.json();
};

export function updateStatusOptions() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStatus,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchTasks"] });
      console.log("Task status updated successfully");
    },
  });
}

//Delete Task
const deleteTask = async (taskId) => {
  const token = localStorage.getItem("clrtyToken");
  response = await fetch(`${baseURL}/tasks/delete/${taskId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
};

export function deleteTaskOptions() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchTasks"] });
      console.log("Task deleted successfully");
    },
  });
}
