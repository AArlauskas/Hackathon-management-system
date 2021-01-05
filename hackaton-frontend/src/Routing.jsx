import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import RecoverPassword from './Components/ForgotPasswordLayout/ForgotPasswordLayout';
import ManageUsersDisplay from './Components/ManageUsersDisplay/ManageUsersDisplay';
import NavigationBreadcrumbsAdmin from './Components/NavigationBreadcrumbsAdmin/NavigationBreadcrumbsAdmin';
import NavigationBreadcrumbsUser from "./Components/NavigationBreadcrumbsUser/NavigationBreadcrumbsUser";
import CredentialsDisplay from './Containers/CredentialsDisplay/CredentialsDisplay';
import HackatonDetailsDisplay from './Containers/HackatonDetailsDisplay/HackatonDetailsDisplay';
import HackatonsDisplay from './Containers/HackatonsDisplay/HackatonsDisplay';
import LoginDisplay from "./Containers/LoginDisplay/LoginDisplay";
import ManageTeamsDisplay from './Containers/ManageTeamsDisplay/ManageTeamsDisplay';
import ProjectEditorDisplay from './Containers/ProjectEditorDisplay/ProjectEditorDisplay';
import TeamDetailsDisplay from './Containers/TeamDetailsDisplay/TeamDetailsDisplay';
import TeamsDisplay from './Containers/TeamsDisplay/TeamsDisplay';
import UsersDisplay from './Containers/UsersDisplay/UsersDisplay';
import UserTeamsDisplay from './Containers/UserTeamsDisplay/UserTeamsDisplay';
import ProjectViewerDisplay from "./Containers/ProjectViewerDisplay/ProjectViewerDisplay";
import AdminProjectViewerDisplay from './Containers/AdminProjectViewerDisplay/AdminProjectViewerDisplay';
import PublicHackathonDisplay from './Containers/Public/PublicHackathonDisplay/PublicHackathonDisplay';
import PublicHackathonTeamsDisplay from './Containers/Public/PublicHackathonTeamsDisplay/PublicHackathonTeamsDisplay';
import PublicProjectViewerDisplay from './Containers/Public/PublicProjectViewerDisplay/PublicProjectViewerDisplay';
import NavigationBreadcrumbsPublic from './Components/NavigationBreadcrumbsPublic';
import RegisterDisplay from './Containers/Public/RegisterDisplay/RegisterDisplay';

class Routing extends Component {
    state = {  }
    render() { 
        let role = window.localStorage.getItem("role");
        if(role === "admin")
        {
            return (
                <React.Fragment>
                    <NavigationBreadcrumbsAdmin/>
                    <Switch>
                        <Route path="/hackatons">
                            <HackatonsDisplay/>
                        </Route>
                        <Route path="/teams">
                            <TeamsDisplay/>
                        </Route>
                        <Route path="/users">
                            <UsersDisplay/>
                        </Route>
                        <Route path="/credentials">
                            <CredentialsDisplay/>
                        </Route>
                        <Route exact path="/manage-teams/:id" component={ManageTeamsDisplay}>
                        </Route>
                        <Route exact path="/manage-users/:id" component={ManageUsersDisplay}>
                        </Route>
                        <Route exact path="/hackaton-details/:id" component={HackatonDetailsDisplay}>
                        </Route>
                        <Route exact path="/team-details/:id" component={TeamDetailsDisplay}>
                        </Route>
                        <Route exact path="/project-viewer/:id" component={AdminProjectViewerDisplay}>
                        </Route>
                        <Route>
                            <Redirect to="/hackatons"/>
                        </Route>
                    </Switch>
                </React.Fragment>
            );
        }
        else if(role === "user")
        {
            return (
                <React.Fragment>
                    <NavigationBreadcrumbsUser/>
                    <Switch>
                        <Route path="/teams">
                            <UserTeamsDisplay/>
                        </Route>
                        <Route exact path="/team-details/:id" component={TeamDetailsDisplay}>
                        </Route>
                        <Route path="/project-editor">
                            <ProjectEditorDisplay/>
                        </Route>
                        <Route path="/project-viewer">
                            <ProjectViewerDisplay />
                        </Route>
                        <Route path="/credentials">
                            <CredentialsDisplay/>
                        </Route>
                        <Route>
                            <Redirect to="/teams"/>
                        </Route>
                    </Switch>
                </React.Fragment>
            );
            
        }
        else
        {
            return (
                <React.Fragment>
                    {window.location.pathname.startsWith("/previous/") ? <NavigationBreadcrumbsPublic /> : null}
                    <Switch>
                        <Route exact path="/">
                            <LoginDisplay/>
                        </Route>
                        <Route path="/forgot-password">
                            <RecoverPassword/>
                        </Route>
                        <Route path="/previous/hackathons">
                            <PublicHackathonDisplay />
                        </Route>
                        <Route path="/previous/hackathon-details/:id" component={PublicHackathonTeamsDisplay}>
                            </Route>
                        <Route path="/previous/project-viewer/:id" component={PublicProjectViewerDisplay}>
                        </Route>
                        <Route path="/register">
                            <RegisterDisplay/>
                        </Route>
                        <Route>
                            <Redirect to="/"/>
                        </Route>
                    </Switch>
                </React.Fragment>
            );
        }
    }
}
 
export default Routing;