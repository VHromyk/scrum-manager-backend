### Команды

============

- `npm start` &mdash; старт сервера в режиме production
- `npm run start:dev` &mdash; старт сервера в режиме разработки (development)

### Эндпоинты:

==============

- /api/users/signup &mdash; Регистрация пользователя (POST)
- /api/users/login &mdash; Аутентификация пользователя (POST)
- /api/users/logout &mdash; Логаут (POST)
- /api/users/current &mdash; Получить информацию о текущем пользователе (GET)

- /api/projects/:projectId/invite &mdash; Добавить пользователя в проект (PATCH)
- /api/projects &mdash; Создать проект (POST)
- /api/projects/:projectId/sprints &mdash; Создать спринт (POST)
- /api/projects/:projectId/sprints/:sprintId/tasks &mdash; Создать задачу (POST)
- /api/projects/:projectId &mdash; Удалить проект (DELETE)
- /api/projects/:projectId/name &mdash; Переименовать проект (PATCH)
- /api/projects/ &mdash; Получить все проекты текущего пользователя (GET)
- /api/projects/:projectId/sprints &mdash; Получить все спринты текущего
  проекта(GET)
- /api/projects/:projectId/sprints/:sprintId/tasks &mdash; Получить все задачи
  текущего спринта(GET)
- /api/projects/:projectId/sprints/:sprintId/name &mdash; Переименовать спринт
  (PATCH)
- /api/projects/:projectId/sprints/:sprintId/tasks/search &mdash; Найти задачу
  по названию (POST)
- /api/projects/:projectId/sprints/:sprintId &mdash; Удалить спринт (DELETE)
- /api/projects/:projectId/sprints/:sprintId/tasks/:taskId &mdash; Удалить
  задачу (DELETE)
- /api/projects/:projectId/sprints/:sprintId/tasks/:taskId/time &mdash;
  Изменение выполненых часов в задаче (PATCH)
