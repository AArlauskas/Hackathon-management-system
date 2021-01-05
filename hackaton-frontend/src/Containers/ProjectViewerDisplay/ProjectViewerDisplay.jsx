import React, { Component } from 'react';
import { GetProjectText, GetProjectFileList, GetTeamDetails } from '../../API/API';
import { DownloadFileUser } from '../../API/DownloadAPI';
import ProjectViewer from '../../Components/ProjectViewer/ProjectViewer';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

class ProjectViewerDisplay extends Component {
    state = {
        html: null,
        fileList: null,
        details: null
    }
    componentDidMount()
    {
        GetProjectText().then(result => this.setState({html: result}));
        GetProjectFileList().then(result => this.setState({fileList: result}));
        GetTeamDetails().then(result => this.setState({details: result}));
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
                    downloadFile={(text) => DownloadFileUser(text)}/>
                </div>
             );
        }
    }
}
 
export default ProjectViewerDisplay;