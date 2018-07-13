const router = require('../router');
const ClientController = require('./ClientController');
const {requireKeys} = require('../middleware');

router.post(
  '/',
  requireKeys(['name', 'contactName', 'contactEmail']),
  async (req, res) => {
    const {id} = req.user;
    const {name, contactName, contactEmail} = req.body;

    const client = await ClientController.createClient(id, {
      name,
      contactName,
      contactEmail,
    }).catch(res._sendError);

    res.status(200).send({message: 'Client created', client});
  },
);

router.get('/', async (req, res) => {
  const clients = await ClientController.getUserClients(req.user.id);
  res.status(200).send({clients});
});

router.post(
  '/:clientId/project',
  requireKeys(['name', 'dueDate', 'description']),
  async (req, res) => {
    const {clientId} = req.params;
    const {name, dueDate, description} = req.body;

    const project = await ClientController.createProject(clientId, {
      name,
      dueDate,
      description,
    }).catch(res._sendError);

    res.status(200).send({message: 'Project created', project});
  },
);

router.post(
  '/:clientId/project/:projectId/task',
  requireKeys(['name', 'dueDate', 'description']),
  async (req, res) => {
    const {clientId, projectId} = req.params;
    const {name, dueDate, description} = req.body;

    const task = await ClientController.createTask(clientId, projectId, {
      name,
      dueDate,
      description,
    }).catch(res._sendError);

    res.status(200).send({message: 'Task created', task});
  },
);

module.exports = router;
