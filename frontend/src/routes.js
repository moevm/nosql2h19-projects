import React, {Fragment} from 'react';
import UserList from "./screens/Users/UserList";
import UserForm from "./screens/Users/UserForm";

function Test() {
    return <div>AAAAAAAAAAAAA</div>
}


export default [
    {path: '/', exact: true, name: 'Home'},
    {path: '/statistic', exact: true, name: 'Dashboard', component: Test},
    {path: '/user/list', exact: true, name: 'Список сотрудников', component: UserList},
    {path: '/user/create', exact: true, name: 'Добавление сотрудника', component: UserForm},
    {path: '/user/update/:id', exact: true, name: 'Добавление сотрудника', component: UserForm},
];