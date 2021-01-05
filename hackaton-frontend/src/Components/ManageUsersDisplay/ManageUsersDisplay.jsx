import React, { Component } from 'react';
import ManageUsersTransferList from '../../Containers/ManageUsersTransferList/ManageUsersTransferList';
import {GetUntakenUsersList, GetTeamUsers, AddUsersToTeam, RemoveUsersFromTeam} from "../../API/API";
import LoadingScreen from '../../Containers/LoadingScreen/LoadingScreen';

class ManageUsersDisplay extends Component {
    state = {
        id: this.props.match.params.id,
        Team: null,
        Users: null
     }

     componentDidMount()
     {
         GetTeamUsers(this.state.id).then(response => this.setState({Team: response}));
         GetUntakenUsersList(this.state.id).then(response => this.setState({Users: response}));
     }

    render() { 
        if(this.state.Team === null || this.state.Users === null)
        {
            return (
                <LoadingScreen/>
            );
        }
        else
        {
            return (
                <ManageUsersTransferList
                Team={this.state.Team}
                Users={this.state.Users}
                addUsers={addUsers}
                removeUsers={removeUsers}/>
            );
        }
    }
}

const addUsers = async (id, data) => {
    await AddUsersToTeam(id,data);
}

const removeUsers = async (id, data) => {
    await RemoveUsersFromTeam(id,data);
}
 
export default ManageUsersDisplay;