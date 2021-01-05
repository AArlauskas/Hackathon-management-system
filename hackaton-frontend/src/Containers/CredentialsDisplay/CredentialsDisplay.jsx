import React, { Component } from 'react';
import { GetCredentials, UpdateCredentials } from '../../API/API';
import CredentialForm from '../../Components/CredentialsForm/CredentialsForm';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

class CredentialsDisplay extends Component {
    state = { Credentials: null }
    componentDidMount()
    {
        GetCredentials().then(response => this.setState({Credentials: response}));
    }
    render() { 
        if(this.state.Credentials === null)
        {
            return (
                <LoadingScreen/>
            )
        }
        else
        {
            return (
                <CredentialForm 
                Credentials={this.state.Credentials}
                updateCredentials={updateCredentials}/>
            );
        }
    }
}


const updateCredentials = async (data) => {
    await UpdateCredentials(data);
}
 
export default CredentialsDisplay;