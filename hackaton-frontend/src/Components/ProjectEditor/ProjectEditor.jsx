import { Button, TextField } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import "./quill.css";

class ProjectEditor extends Component {
    constructor(props)
    {
        super(props);

        let files = [];
        if(this.props.initialFiles !== "")
        {
            this.props.initialFiles.forEach(temp => {
                files.push(new File(["foo"], temp));
            });
        }
        this.state = {
            editorValue: this.props.html,
            html: "",
            files: files,
            name: this.props.details.Name,
            title: this.props.details.ProjectTitle
        }
    }
    render() {
        const modules = {
            toolbar: [
                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                [{ size: [] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' },
                { 'indent': '-1' }, { 'indent': '+1' }],
                [{ 'align': [] }],
                ['image'],
                ['clean']
            ],
            clipboard: {
                // toggle to add extra line breaks when pasting HTML:
                matchVisual: false,
            }
        };
        const formats = [
            'header', 'font', 'size',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet', 'indent', 'align',
             'image'
        ];
        return (
            <div>
                <div style={{textAlign: "center", marginBottom: "2.5%"}}>
                    <Button onClick={() => window.location.href = "/project-viewer"} variant="contained" color="secondary">View page</Button>
                    <div>
                        <div>
                        <TextField
                         value={this.state.name}
                         onChange={e => this.setState({name: e.target.value})}
                         style={{width: 400, color: "white"}}
                         label="Team name"
                         variant="standard"
                         inputProps={{
                            style: {
                                color: "white"
                            }
                        }}/>
                        <br/>
                        <TextField 
                         value={this.state.title}
                         onChange={e => this.setState({title: e.target.value})}
                         style={{width: 400, color: "white"}}
                         label="Project title"
                        variant="standard"
                        inputProps={{
                            style: {
                                color: "white"
                            }
                        }}/>
                        </div>
                    </div>
                </div>
                <div style={{ backgroundColor: "white", color: "black", marginRight: "10%", marginLeft: "10%", top: 20 }}>
                    <ReactQuill
                        theme="snow"
                        modules={modules}
                        formats={formats}
                        value={this.state.editorValue}
                        onChange={(content, delta, source, editor) => {
                            this.setState({ editorValue: content, html: editor.getHTML() });
                        }} />
                </div>
                <div style={{color: "black",marginTop: 20, marginBottom: 20, marginRight: "10%", marginLeft: "10%", top: 20}}>
                    <DropzoneArea
                    filesLimit="10"
                    onChange={(newFiles) => this.setState({files: newFiles})}
                    initialFiles={this.state.files}/>
                </div>
                <div style={{textAlign: "center", marginBottom: 20}}>
                    <Button 
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        let model = {
                            Text: this.state.html
                        };
                        this.props.SaveChanges(model,this.state.files,this.state.name,this.state.title);
                    }}
                    >Submit</Button>
                </div>
            </div>
        );
    }
}

export default ProjectEditor;