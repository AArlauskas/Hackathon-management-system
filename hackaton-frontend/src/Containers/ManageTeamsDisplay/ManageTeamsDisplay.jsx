import React, { Component } from 'react';
import { GetHackatonTeams, GetUntakenTeamsList, AddTeamsToHackaton, RemoveTeamsFromHackaton } from '../../API/API';
import ManageTeamsTransferList from '../../Components/ManageTeamsTransferList/ManageTeamsTransferList';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

class ManageTeamsDisplay extends Component {
    state = {
        id: this.props.match.params.id,
        Hackaton: null,
        Teams: null
     }
     componentDidMount()
     {
         GetHackatonTeams(this.state.id).then(response => this.setState({Hackaton: response}));
         GetUntakenTeamsList(this.state.id).then(response => this.setState({Teams: response}));
     }
    render() {
        if(this.state.Hackaton === null || this.state.Teams === null)
        {
            return (
                <LoadingScreen/>
            );
        }
        else
        {
            return (
                <ManageTeamsTransferList
                Hackaton={this.state.Hackaton}
                Teams={this.state.Teams}
                addTeams={addTeams}
                removeTeams={removeTeams}/>
            );
        }
    }
}

const addTeams = async (id, data) => {
    await AddTeamsToHackaton(id,data);
}

const removeTeams = async (id, data) => {
    await RemoveTeamsFromHackaton(id,data);
}
 
export default ManageTeamsDisplay;