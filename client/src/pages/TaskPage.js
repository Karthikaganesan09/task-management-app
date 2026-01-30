import React, { useEffect, useState } from "react";
import {
  getTasks,
  updateTaskStatus,
  addTask,
  deleteTask,
} from "../services/taskService";


function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "Pending",
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("NEW");

  const loadTasks = async () => {
    try {
      setLoading(true);
      const res = await getTasks();
      setTasks(res.data);
    } catch {
      alert("Unauthorized or server error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // ➕ ADD TASK
  const handleAddTask = async () => {
    if (!newTask.title.trim()) {
      alert("Title is required");
      return;
    }

    try {
      await addTask(newTask);
      setNewTask({ title: "", description: "", status: "Pending" });
      loadTasks();
    } catch {
      alert("Failed to add task");
    }
  };

  // 🔄 UPDATE STATUS
  const handleStatusChange = async (id, status) => {
    try {
      await updateTaskStatus(id, status);
      loadTasks();
    } catch {
      alert("Failed to update status");
    }
  };

  // 🗑 DELETE TASK
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    try {
      await deleteTask(id);
      loadTasks();
    } catch {
      alert("Failed to delete task");
    }
  };

  // 🔍 SEARCH
  let filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  // 🎯 FILTER
  if (statusFilter !== "ALL") {
    filteredTasks = filteredTasks.filter(
      (task) => task.status === statusFilter
    );
  }

  // 🔃 SORT
  filteredTasks.sort((a, b) => {
    if (sortOrder === "NEW") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return new Date(a.createdAt) - new Date(b.createdAt);
  });

  return (
    <div className="container mt-4">
      <h3>Your Tasks</h3>

      {/* ADD TASK */}
      <div className="card p-3 mb-4">
        <input
          className="form-control mb-2"
          placeholder="Task title"
          value={newTask.title}
          onChange={(e) =>
            setNewTask({ ...newTask, title: e.target.value })
          }
        />

        <input
          className="form-control mb-2"
          placeholder="Task description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />

        <select
          className="form-select mb-3"
          value={newTask.status}
          onChange={(e) =>
            setNewTask({ ...newTask, status: e.target.value })
          }
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <button className="btn btn-primary w-100" onClick={handleAddTask}>
          Add Task
        </button>
      </div>

      {/* SEARCH */}
      <input
        className="form-control mb-3"
        placeholder="Search task..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* FILTER + SORT */}
      <div className="d-flex gap-2 mb-3">
        <select
          className="form-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="ALL">All</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <select
          className="form-select"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="NEW">Newest First</option>
          <option value="OLD">Oldest First</option>
        </select>
      </div>

      {/* TASK LIST */}
      {loading ? (
        <p>Loading tasks...</p>
      ) : filteredTasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        filteredTasks.map((task) => (
          <div key={task._id} className="card p-3 mb-3">
            <h5>{task.title}</h5>
            <p>{task.description}</p>

            <select
              className="form-select mb-2"
              value={task.status}
              onChange={(e) =>
                handleStatusChange(task._id, e.target.value)
              }
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>

            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(task._id)}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default TaskPage;
