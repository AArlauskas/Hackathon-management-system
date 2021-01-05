import React, { Component } from 'react';
import ProjectEditor from "../../Components/ProjectEditor/ProjectEditor";
import { GetProjectFileList, GetProjectText, GetTeamDetails, SetProjectText, SetTeamDetails } from '../../API/API';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { UploadFiles } from '../../API/UploadAPI';

class ProjectEditorDisplay extends Component {
    state = {
        html: null,
        files: null,
        details: null,
        Loading: false,
    }
    componentDidMount()
    {
        GetProjectText().then(result => this.setState({html: result}));
        GetProjectFileList().then(result => this.setState({files: result}));
        GetTeamDetails().then(response => this.setState({details: response}));
    }
    render() { 
        if(this.state.html === null || this.state.Loading || this.state.files === null || this.state.details === null)
        {
            return (<LoadingScreen/>);
        }
        else
        {
            return (
                <div>
                    <ProjectEditor
                    html={this.state.html}
                    initialFiles={this.state.files}
                    details={this.state.details}
                    SaveChanges={(text,files,name,title) => {
                        this.setState({Loading: true});
                        SaveChanges(text,files,name,title);
                    }}/>
                </div>
             );
        }
    }
}

const SaveChanges = (html, files, name, title) => {
    SetProjectText(html).then(() => {
        let formData = new FormData();
        files.forEach(tempFile => {
            formData.append(tempFile.name, tempFile);
        });
        UploadFiles(formData).then(() => {
            SetTeamDetails(name,title).then(() => window.location.href = "project-viewer");
        });
    });
}

 
export default ProjectEditorDisplay;