const Client = require('./Client');

const createClient = (userId, clientObject) =>
  Client.create({
    name: clientObject.name,
    contactName: clientObject.contactName,
    contactEmail: clientObject.contactEmail,
    projects: [],
    userId,
  });

const getUserClients = userId => Client.find({userId});

const createProject = async (clientId, projectObject) => {
  const client = await Client.findById(clientId);

  client.projects.push({
    name: projectObject.name,
    dueDate: projectObject.dueDate,
    description: projectObject.description,
    tasks: [],
  });

  return client.save();
};

const createTask = async (clientId, projectId, taskObject) => {
  const client = await Client.findById(clientId);

  const task = {
    name: taskObject.name,
    dueDate: taskObject.dueDate,
    description: taskObject.description,
    completed: false,
  };

  client.projects.map(project => {
    if (project.id === projectId) {
      project.tasks.push(task);
    }
  });

  await client.save();

  return task;
};

module.exports = {createClient, createProject, createTask, getUserClients};
