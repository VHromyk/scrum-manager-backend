### Команды
============

- `npm start` &mdash; старт сервера в режиме production
- `npm run start:dev` &mdash; старт сервера в режиме разработки (development)

### Эндпоинты:
==============

- /api/users/signup &mdash; User registration (method POST)
- /api/users/login &mdash; User authentication (method POST)
- /api/users/current &mdash; Get information about the current user (method GET)
- /api/users/logout &mdash; Logout (method POST)
---------------------------------------------------------------
- /api/projects/ &mdash; Create project (method POST)
- /api/projects/sprint/:projectId &mdash; Create sprint (method POST)
- /api/projects/task/:sprintId &mdash; Create task (method POST)
- /api/projects/:projectId &mdash; Delete project (method DELETE)
- /api/projects/:projectId/name &mdash; Rename project (method PUTCH)
- /api/projects/:projectId/invite &mdash; Invite a user to the project (method
  PUTCH)
- /api/projects/ &mdash; Get all projects of user (method GET)
- /api/projects/sprints/:projectId &mdash; Get all sprints of project (method GET)
- /api/projects/tasks/:sprintId &mdash; Get all tasks of sprint (method GET)
