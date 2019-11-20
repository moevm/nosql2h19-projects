import React, {Component, Suspense} from 'react';
import {
    AppSidebar,
    AppSidebarFooter,
    AppSidebarForm,
    AppSidebarHeader,
    AppSidebarMinimizer,
    AppSidebarNav
} from "@coreui/react";
import navigation from "../nav";
import {withRouter} from "react-router-dom";


class Sidebar extends Component {
    render() {
        return (
            <AppSidebar fixed display="lg">
                <AppSidebarHeader/>
                <AppSidebarForm/>
                <Suspense>
                    <AppSidebarNav navConfig={navigation} {...this.props} router={this.props.router}/>
                </Suspense>
                <AppSidebarFooter/>
                <AppSidebarMinimizer/>
            </AppSidebar>
        )
    }
}

export default withRouter(Sidebar);