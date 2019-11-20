import React, {Fragment} from 'react';
import UserList from "./screens/Users/UserList";

function Test() {
    return <div>AAAAAAAAAAAAA</div>
}


export default [
    {path: '/', exact: true, name: 'Home'},
    {path: '/statistic', exact: true, name: 'Dashboard', component: Test},
    {path: '/user/list', exact: true, name: 'Список сотрудников', component: UserList},
];