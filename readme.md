### Команды

============

- `npm start` &mdash; старт сервера в режиме production
- `npm run start:dev` &mdash; старт сервера в режиме разработки (development)

### Эндпоинты:

==============

- /api/users/signup &mdash; Регистрация пользователя (POST)
- /api/users/login &mdash; Аутентификация пользователя (POST)
- /api/users/logout &mdash; Логаут (POST)
- /api/users/current &mdash; Получить информацию о текущем юзере (GET)
- /api/users/:projectId/invite &mdash; Добавить юзера в проект (PUTCH)

---

- /api/projects/ &mdash; Создать проект (POST)
- /api/projects/sprints/:projectId &mdash; Создать спринт (POST)
- /api/projects/tasks/:sprintId &mdash; Создать задачу (POST)
- /api/projects/:projectId &mdash; Удалить проект (DELETE)
- /api/projects/:projectId/name &mdash; Переименовать проект (PUTCH)
- /api/projects/ &mdash; Получить все проекты текущего юзера (GET)
- /api/projects/sprints/:projectId &mdash; Получить все спринты текущего проекта (GET)
- /api/projects/tasks/:sprintId &mdash; Получить все задачи текущего спринта (GET)
- /api/projects/sprints/:sprintId/name &mdash; Переименовать спринт (PUTCH)
