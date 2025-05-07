import React, { useState } from 'react';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'Pending' });

  // Create a new project
  const addProject = () => {
    const newProject = {
      id: Date.now(),
      title: newProjectTitle,
      tasks: []
    };
    setProjects([...projects, newProject]);
    setNewProjectTitle('');
  };

  // Create a task in the selected project
  const addTask = () => {
    if (!selectedProjectId) return alert("Select a project first");

    const newTaskData = {
      id: Date.now(),
      title: newTask.title,
      description: newTask.description,
      status: newTask.status,
      createdAt: new Date().toISOString(),
      completedAt: newTask.status === 'Completed' ? new Date().toISOString() : null
    };

    const updatedProjects = projects.map(project =>
      project.id === selectedProjectId
        ? { ...project, tasks: [...project.tasks, newTaskData] }
        : project
    );

    setProjects(updatedProjects);
    setNewTask({ title: '', description: '', status: 'Pending' });
  };

  // Update a task in a project
  const updateTask = (projectId, taskId, field, value) => {
    const updatedProjects = projects.map(project =>
      project.id === projectId
        ? {
            ...project,
            tasks: project.tasks.map(task =>
              task.id === taskId
                ? {
                    ...task,
                    [field]: value,
                    completedAt: field === 'status' && value === 'Completed' ? new Date().toISOString() : task.completedAt
                  }
                : task
            )
          }
        : project
    );
    setProjects(updatedProjects);
  };

  // Delete a task
  const deleteTask = (projectId, taskId) => {
    const updatedProjects = projects.map(project =>
      project.id === projectId
        ? { ...project, tasks: project.tasks.filter(task => task.id !== taskId) }
        : project
    );
    setProjects(updatedProjects);
  };

  const selectedProject = projects.find(p => p.id === selectedProjectId);

  return (
    <div className="container my-4">
      <h2 className="mb-4">Project Task Manager</h2>

      {/* Project Creation */}
      <div className="card p-3 mb-4">
        <h4>Create Project</h4>
        <div className="input-group">
          <input
            className="form-control"
            placeholder="Project Title"
            value={newProjectTitle}
            onChange={(e) => setNewProjectTitle(e.target.value)}
          />
          <button className="btn btn-success" onClick={addProject}>Add Project</button>
        </div>
      </div>

      {/* Project Selector */}
      <div className="mb-4">
        <label className="form-label">Select Project</label>
        <select
          className="form-select"
          value={selectedProjectId || ''}
          onChange={(e) => setSelectedProjectId(Number(e.target.value))}
        >
          <option value="">-- Choose Project --</option>
          {projects.map(project => (
            <option key={project.id} value={project.id}>{project.title}</option>
          ))}
        </select>
      </div>

      {/* Task Form */}
      {selectedProject && (
        <>
          <div className="card p-4 mb-4">
            <h4>Add Task to "{selectedProject.title}"</h4>
            <input
              name="title"
              className="form-control mb-2"
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <input
              name="description"
              className="form-control mb-2"
              placeholder="Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <select
              name="status"
              className="form-select mb-2"
              value={newTask.status}
              onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <button className="btn btn-primary" onClick={addTask}>Add Task</button>
          </div>

          {/* Task List */}
          <ul className="list-group">
            {selectedProject.tasks.map(task => (
              <li key={task.id} className="list-group-item">
                <h5>{task.title}</h5>
                <p>{task.description}</p>
                <div className="mb-2">
                  <label className="form-label me-2">Status:</label>
                  <select
                    className="form-select d-inline-block w-auto"
                    value={task.status}
                    onChange={(e) => updateTask(selectedProject.id, task.id, 'status', e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <small className="text-muted">Created: {new Date(task.createdAt).toLocaleString()}</small><br />
                {task.completedAt && (
                  <small className="text-success">Completed: {new Date(task.completedAt).toLocaleString()}</small>
                )}
                <div className="mt-2">
                  <button className="btn btn-danger btn-sm" onClick={() => deleteTask(selectedProject.id, task.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Home;
