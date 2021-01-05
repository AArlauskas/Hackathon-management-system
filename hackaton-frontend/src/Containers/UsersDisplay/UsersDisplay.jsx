import React, { Component } from 'react';
import { connect } from "react-redux";
import UsersTable from '../../Components/UsersTable/UsersTable';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import {deleteUser, getUsers, postUser, putUser} from "../../Actions/UserActions"

class UsersDisplay extends Component {
    state = {  }
    componentDidMount()
    {
        this.props.getUsers();
    }
    render() { 
        if(this.props.Users === null)
        {
            return (
                <LoadingScreen/>
            );
        }
        else
        {
            return (
                <UsersTable
                Users={this.props.Users}
                postUser={this.props.postUser}
                putUser={this.props.putUser}
                deleteUser={this.props.deleteUser}/>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    Users: state.Users
});

const mapDispatchToProps = (dispatch) => ({
     getUsers: () => dispatch(getUsers()),
     postUser: (data) => dispatch(postUser(data)),
     putUser: (id,data) => dispatch(putUser(id,data)),
     deleteUser: (id) => dispatch(deleteUser(id))
});

 
export default connect(mapStateToProps,mapDispatchToProps)(UsersDisplay);