import API from '../../controllers/api_controller';

const Tasks : Record<string, API> = {};

// Tasks calls
Tasks.tasksGetRequest = new API<{}>(
  'GET',
  `${process.env.API_URL}/api/tasks/`,
  'application/json',
  10000,
);

Tasks.tasksPutRequest = new API<{}>(
  'PUT',
  `${process.env.API_URL}/api/tasks/`,
  'application/json',
  10000,
);

Tasks.taskDeleteRequest = new API<{}>(
  'DELETE',
  `${process.env.API_URL}/api/tasks/{id}`,
  'application/json',
  10000,
);

Tasks.taskPostRequest = new API<{}>(
  'POST',
  `${process.env.API_URL}/api/tasks/{id}`,
  'application/json',
  10000,
);

export default Tasks;
