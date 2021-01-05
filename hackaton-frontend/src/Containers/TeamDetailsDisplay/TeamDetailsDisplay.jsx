import React, { Component } from 'react';
import { GetTeamUsers } from '../../API/API';
import TeamDetailsTable from '../../Components/TeamDetailsTable/TeamDetailsTable';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

class TeamDetailsDisplay extends Component {
    state = { 
        Team: null
     }
     componentDidMount()
     {
         let id = this.props.match.params.id;
         GetTeamUsers(id).then(response => this.setState({Team: response}));
     }
    render() { 
        if(this.state.Team === null)
        {
            return (
                <LoadingScreen/>
            );
        }
        else
        {
            return (
                <TeamDetailsTable
                Team={this.state.Team}/>
            );
        }
    }
}
 
export default TeamDetailsDisplay;