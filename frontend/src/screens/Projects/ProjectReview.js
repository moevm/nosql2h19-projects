import React, {Component, Fragment} from 'react'
import {Link, Route, Switch, withRouter} from "react-router-dom";
import {reviewRoutes} from '../../routes'
import {
    Card,
    CardHeader,
    CardBody,
    Nav,
    NavItem,
    NavLink,

} from 'reactstrap';
import "../index.sass"

class ProjectReview extends Component {
    render() {

        return (
            <div className="animated fadeIn">
                <Card>
                    <CardBody>
                        <Nav pills>
                            <Switch>

                                {reviewRoutes.map(route =>
                                    <Route

                                        path={route.path}
                                        exact={route.exact}

                                        render={props => <Fragment>

                                            {reviewRoutes.map(_route =>
                                                <NavItem>
                                                    <NavLink href={_route.path.replace(":id", this.props.match.params.id)} active={this.props.location.pathname === _route.path.replace(":id", this.props.match.params.id)}> {_route.title}</NavLink>
                                                </NavItem>
                                            )}
                                        </Fragment>
                                        }
                                    />
                                )}
                            </Switch>
                        </Nav>
                    </CardBody>
                </Card>
            </div>
        )
    }

}

export default withRouter(ProjectReview)