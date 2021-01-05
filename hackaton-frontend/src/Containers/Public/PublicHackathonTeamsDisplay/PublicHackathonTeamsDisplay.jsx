import React, { Component } from 'react';
import { GetPublicHackathonTeams } from '../../../API/PublicAPI';
import PublicHackathonTeamsTable from '../../../Components/Public/PublicHackathonTeamsTable/PublicHackathonTeamsTable';
import LoadingScreen from '../../LoadingScreen/LoadingScreen';

class PublicHackathonTeamsDisplay extends Component {
    state = { 
        Hackathon: null
     }
     componentDidMount()
     {
        let id = this.props.match.params.id;
        GetPublicHackathonTeams(id).then(result => this.setState({Hackathon: result}));
     }
    render() { 
        if(this.state.Hackathon === null)
        {
            return <LoadingScreen/>
        }
        else
        {
            return (
                <React.Fragment>
                    <PublicHackathonTeamsTable 
                    Hackathon={this.state.Hackathon}/>
                </React.Fragment>
            );
        }
    }
}
 
export default PublicHackathonTeamsDisplay;