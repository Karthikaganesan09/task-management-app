import React, { useEffect, useState } from "react";
import { getTasks } from "../services/taskService";

function TaskPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks()
      .then((res) => setTasks(res.data))
      .catch(() => alert("Unauthorized"));
  }, []);

  return (
    <div className="container mt-4">
      <h3>Your Tasks</h3>

      {tasks.map((task) => (
        <div key={task._id} className="card p-3 mb-2">
          <h5>{task.title}</h5>
          <p>{task.description}</p>
          <span className="badge bg-warning">{task.status}</span>
        </div>
      ))}
    </div>
  );
}

export default TaskPage;
