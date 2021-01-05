import React, { Component } from 'react';
import { connect } from "react-redux";
import { deleteTeam, getTeams, postTeam, putTeam } from '../../Actions/TeamActions';
import TeamsTable from '../../Components/TeamsTable/TeamsTable';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

class TeamsDisplay extends Component {
    state = {  }
    componentDidMount()
    {
        this.props.getTeams();
    }
    render() { 
        if(this.props.Teams === null)
        {
            return (<LoadingScreen/>);
        }
        else
        {
            return (
                <React.Fragment>
                  <TeamsTable
                  Teams={this.props.Teams}
                  postTeam={this.props.postTeam}
                  putTeam={this.props.putTeam}
                  deleteTeam={this.props.deleteTeam}
                />  
                </React.Fragment>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    Teams: state.Teams
});

const mapDispatchToProps = (dispatch) => ({
       getTeams: () => dispatch(getTeams()),
       postTeam: (data) => dispatch(postTeam(data)),
       putTeam: (id,data) => dispatch(putTeam(id,data)),
       deleteTeam: (id) => dispatch(deleteTeam(id))
});


export default connect(mapStateToProps, mapDispatchToProps)(TeamsDisplay);