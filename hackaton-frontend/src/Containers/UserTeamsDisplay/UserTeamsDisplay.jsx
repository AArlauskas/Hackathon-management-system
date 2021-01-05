import React, { Component } from 'react';
import { GetHackatonTeamsUser } from '../../API/API';
import HackatonDetailsTable from '../../Components/HackatonDetailsTable/HackatonDetailsTable';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

class UserTeamsDisplay extends Component {
    state = { 
        Hackaton: null
     }
     componentDidMount()
     {
         GetHackatonTeamsUser().then(response => this.setState({Hackaton: response}));
     }
    render() { 
        if(this.state.Hackaton === null)
        {
            return (
                <LoadingScreen/>
            );
        }
        else
        {
            return (
                <HackatonDetailsTable
                Hackaton={this.state.Hackaton}/>
            );
        }
    }
}
 
export default UserTeamsDisplay;