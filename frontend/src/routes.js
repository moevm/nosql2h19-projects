import React, {Fragment} from 'react';
import UserList from "./screens/Users/UserList";
import UserForm from "./screens/Users/UserForm";
import ProjectList from "./screens/Projects/ProjectList";
import ProjectReview from "./screens/Projects/ProjectReview";
import ProjectReviewEmployeeList from "./screens/Projects/ProjectReviewEmployeeList";
import ProjectReviewTaskList from "./screens/Projects/ProjectReviewTaskList";

function Test() {
    return <div>AAAAAAAAAAAAA</div>
}

export const reviewRoutes = [
    {path: '/project/review/:id/employee/list', exact: true, name: 'Список сотрудников проекта', title: "Сотрудники", component: ProjectReviewEmployeeList},
    {path: '/project/review/:id/task/list', exact: true, name: 'Список задач проекта', title: "Задачи", component: ProjectReviewTaskList},
];

const routes = [
    {path: '/', exact: true, name: 'Home'},
    {path: '/statistic', exact: true, name: 'Dashboard', component: Test},
    {path: '/user/list', exact: true, name: 'Список сотрудников', component: UserList},
    {path: '/user/create', exact: true, name: 'Добавление сотрудника', component: UserForm},
    {path: '/user/update/:id', exact: true, name: 'Обновление сотрудника', component: UserForm},
    {path: '/project/list', exact: true, name: 'Список проектов', component: ProjectList},
    {path: '/project/review/:id', name: 'Просмотр проекта', component: ProjectReview},
];

export default routes;