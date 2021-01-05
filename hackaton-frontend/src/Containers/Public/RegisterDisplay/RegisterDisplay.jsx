import React, { Component } from 'react';
import RegisterForm from "../../../Components/RegisterForm/RegisterForm";

class RegisterDisplay extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <RegisterForm />
            </React.Fragment>
         );
    }
}
 
export default RegisterDisplay;