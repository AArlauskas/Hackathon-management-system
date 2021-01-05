import React, { Component } from 'react';
import { GetHackatonTeams } from '../../API/API';
import HackatonDetailsTable from '../../Components/HackatonDetailsTable/HackatonDetailsTable';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

class HackatonDetailsDisplay extends Component {
    state = { 
        Hackaton: null
     }
     componentDidMount()
     {
         let id = this.props.match.params.id;
         GetHackatonTeams(id).then(response => this.setState({Hackaton: response}));
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
 
export default HackatonDetailsDisplay;