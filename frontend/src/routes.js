import React, {Fragment} from 'react';

function Test() {
    return <div>a</div>
}


export default [
    {path: '/', exact: true, name: 'Home'},
    {path: '/statistic', exact: true, name: 'Dashboard', component: Test},
];