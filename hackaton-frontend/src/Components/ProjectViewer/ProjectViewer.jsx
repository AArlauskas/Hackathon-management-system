import { Link } from '@material-ui/core';
import React, { Component } from 'react';
import "./quill.css";

class ProjectViewer extends Component {
    render() {
        if (this.props.html === "") {
            return (
                <div style={{ textAlign: "center" }}>
                    <h1 style={{color: "white"}}>No project has yet been uploaded.</h1>
                </div>
            );
        }
        else {
            return (
                <div style={{ marginLeft: "10%", marginRight: "10%" }}>
                    <div style={{textAlign: "center"}}>
                        <h1 style={{color: "white", fontSize: 30}}>{this.props.details.Name}</h1>
                        <h2 style={{color: "white", fontSize: 25}}>{this.props.details.ProjectTitle}</h2>
                    </div>
                    <div
                        style={{ borderRadius: "25px", backgroundColor: "rgba(255,255,255,0.5)", marginTop: 20, marginBottom: 20, color: "black" }}
                        className="ql-editor"
                        dangerouslySetInnerHTML={{ __html: this.props.html }}>
                    </div>
                    <div style={{ color: "black", backgroundColor: "rgba(255,255,255,0.5)" }}>
                        {this.props.fileList === "" ? null :
                            <div style={{padding: 5, marginBottom: 20}}>
                                <h2 style={{fontSize: 20}}>Files:</h2>
                                <ul>
                                    {this.props.fileList.map(file => {
                                        return (
                                            <li style={{fontSize: 15}} key={file}><Link color="secondary" onClick={() => this.props.downloadFile(file)} href="#" alt={file}>{file}</Link></li>
                                        );
                                    })}
                                </ul></div>}
                    </div>
                </div>
            );
        }
    }
}

export default ProjectViewer;