import React, { Component } from 'react';
import { GetPublicHackatons } from '../../../API/PublicAPI';
import PublicHackathonTable from '../../../Components/Public/PublicHackathonTable/PublicHackathonTable';
import LoadingScreen from '../../LoadingScreen/LoadingScreen';

class PublicHackathonDisplay extends Component {
    state = { 
        Hackathons: null
     }
    componentDidMount()
    {
        GetPublicHackatons().then(response => this.setState({Hackathons: response}));
    }
    render() { 
        if(this.state.Hackathons === null)
        {
            return <LoadingScreen/>
        }
        else
        {
            return (
                <React.Fragment>
                    <PublicHackathonTable
                    Hackathons={this.state.Hackathons}
                    />       
                </React.Fragment>
            );
        }
    }
}
 
export default PublicHackathonDisplay;