import React, { Component } from 'react';
import { connect } from "react-redux";
import { deleteHackaton, getHackatons, postHackaton, putHackaton } from '../../Actions/HackatonActions';
import HackatonTable from '../../Components/HackatonTable/HackatonTable';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

class HackatonsDisplay extends Component {
    state = {  }
    componentDidMount()
    {
        this.props.getHackatons();
    }
    render() { 
        if(this.props.Hackatons === null)
        {
            return (<LoadingScreen/>);
        }
        else
        {
            return (
                <React.Fragment>
                  <HackatonTable
                  Hackatons={this.props.Hackatons}
                  postHackaton={this.props.postHackaton}
                  putHackaton={this.props.putHackaton}
                  deleteHackaton={this.props.deleteHackaton}
                  />  
                </React.Fragment>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    Hackatons: state.Hackatons
});

const mapDispatchToProps = (dispatch) => ({
    getHackatons: () => dispatch(getHackatons()),
    postHackaton: (data) => dispatch(postHackaton(data)),
    putHackaton: (id,data) => dispatch(putHackaton(id,data)),
    deleteHackaton: (id) => dispatch(deleteHackaton(id))
});


export default connect(mapStateToProps, mapDispatchToProps)(HackatonsDisplay);