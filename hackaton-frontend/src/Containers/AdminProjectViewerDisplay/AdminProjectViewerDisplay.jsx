import React, { Component } from 'react';
import { GetProjectTextAdmin, GetTeamDetailsAdmin, GetProjectFileListAdmin } from '../../API/API';
import { DownloadFileAdmin } from '../../API/DownloadAPI';
import ProjectViewer from '../../Components/ProjectViewer/ProjectViewer';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

class AdminProjectViewerDisplay extends Component {
    state = {
        html: null,
        fileList: null,
        details: null
    }
    componentDidMount()
    {
        let id = this.props.match.params.id;
        GetProjectTextAdmin(id).then(result => this.setState({html: result}));
        GetProjectFileListAdmin(id).then(result => this.setState({fileList: result}));
        GetTeamDetailsAdmin(id).then(result => this.setState({details: result}));
    }
    render() { 
        if(this.state.html === null || this.state.fileList === null || this.state.details === null)
        {
            return <LoadingScreen/>;
        }
        else
        {
            return ( 
                <div>
                    <ProjectViewer
                    html={this.state.html}
                    fileList={this.state.fileList}
                    details={this.state.details}
                    downloadFile={(text) => DownloadFileAdmin(this.props.match.params.id,text)}/>
                </div>
             );
        }
    }
}
 
export default AdminProjectViewerDisplay;