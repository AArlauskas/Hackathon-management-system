import React, { Component } from 'react';
import { DownloadPublicFile } from '../../../API/DownloadAPI';
import { GetPublicProjectFileList, GetPublicProjectText, GetPublicTeamDetails } from '../../../API/PublicAPI';
import ProjectViewer from '../../../Components/ProjectViewer/ProjectViewer';
import LoadingScreen from '../../LoadingScreen/LoadingScreen';

class PublicProjectViewerDisplay extends Component {
    state = { 
        html: null,
        fileList: null,
        details: null
     }
     componentDidMount()
     {
         let id = this.props.match.params.id;
         GetPublicProjectText(id).then(response => this.setState({html: response}));
         GetPublicProjectFileList(id).then(response => this.setState({fileList: response}));
         GetPublicTeamDetails(id).then(response => this.setState({details: response}));
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
                    downloadFile={(text) => DownloadPublicFile(this.props.match.params.id,text)}/>
                </div>
             );
        }
    }
}
 
export default PublicProjectViewerDisplay;