import React from "react";

function TaskPage() {
  return (
    <div className="container mt-4">
      <h3>Your Tasks</h3>

      <div className="card mt-3">
        <div className="card-body">
          <h5 className="card-title">Sample Task</h5>
          <p className="card-text">Demo task description</p>
          <span className="badge bg-warning text-dark">Pending</span>
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
