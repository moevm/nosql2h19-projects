import React, {Fragment} from 'react';
import Config from "./screens/Config/Config";
import UserList from "./screens/Users/UserList";
import UserForm from "./screens/Users/UserForm";
import ProjectList from "./screens/Projects/ProjectList";
import ProjectReview from "./screens/Projects/ProjectReview";
import ProjectReviewEmployeeList from "./screens/Projects/ProjectReviewEmployeeList";
import ProjectReviewTaskList from "./screens/Projects/ProjectReviewTaskList";
import ProjectReviewEmployeeEdit from "./screens/Projects/ProjectReviewEmployeeEdit";
import Statistic from "./screens/Statistic/Statstic";

export const reviewRoutes = [
    {path: '/project/review/:id/employee/list', exact: true, name: 'Список сотрудников проекта', title: "Сотрудники", component: ProjectReviewEmployeeList},
    {path: '/project/review/:id/task/list', exact: true, name: 'Список задач проекта', title: "Задачи", component: ProjectReviewTaskList},
];

const routes = [
    {path: '/', exact: true, name: 'Home'},
    {path: '/statistic', exact: true, name: 'Dashboard', component: Statistic},
    {path: '/config', exact: true, name: 'Конфигурация', component: Config},
    {path: '/user/list', exact: true, name: 'Список сотрудников', component: UserList},
    {path: '/user/create', exact: true, name: 'Добавление сотрудника', component: UserForm},
    {path: '/user/update/:id', exact: true, name: 'Обновление сотрудника', component: UserForm},
    {path: '/project/list', exact: true, name: 'Список проектов', component: ProjectList},
    {path: '/project/review/:id', name: 'Просмотр проекта', component: ProjectReview},
    {path: '/project/update-employee/:projectId/:participantId', exact: true, name: '', component: ProjectReviewEmployeeEdit},
    {path: '/project/add-employee/:projectId', exact: true, name: '', component: ProjectReviewEmployeeEdit},
];

export default routes;