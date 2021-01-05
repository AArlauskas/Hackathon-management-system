import React, { Component, forwardRef } from 'react';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { PeopleOutlined, ToysOutlined } from '@material-ui/icons';

class TeamsTable extends Component {
    state = {  }
    render() {
        const tableIcons = {
            Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
            Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
            Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
            Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
            DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
            Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
            Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
            Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
            FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
            LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
            NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
            PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
            ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
            Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
            SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
            ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
            ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
        };
        const columns = [
            {
                title: "Name",
                field: "Name"
            },
            {
                title: "Project Title",
                field: "ProjectTitle"
            },
            {
                title: "Number of users",
                field: "UserCount",
                editable: "never"
            },
            {
                title: "Hackathon",
                field: "Hackaton",
                render: rowData => rowData.Hackaton === null ? "" : rowData.Hackaton.Name,
                editable: "never",
            },
        ];
        return ( 
            <div style={{margin: 10}}>
                <MaterialTable
                options={{
                    addRowPosition: "first",
                    filtering: true,
                    actionsColumnIndex: -1,
                    pageSize: 5
                }}
                data={this.props.Teams}
                icons={tableIcons}
                columns={columns}
                title="Teams"
                actions={[
                    {
                        icon: () => <ToysOutlined/>,
                        tooltip: "View project",
                        onClick: (event, rowData) => {
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve();
                                    if(rowData.Hackaton !== null && rowData.Hackaton.status)
                                    {
                                        window.location.href = "/project-viewer/" + rowData.Id
                                    }
                                }, 600);
                            })
                        }
                    },
                    {
                        icon: () => <PeopleOutlined/>,
                        tooltip: "Manage users",
                        onClick: (event, rowData) => {
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve();
                                    window.location.href = "/manage-users/" + rowData.Id
                                }, 600);
                            })
                        }
                    }
                ]}
                editable={{
                    onRowAdd: (newData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                this.props.postTeam(newData);
                            }, 600);
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                if (oldData) {
                                    this.props.putTeam(oldData.Id, newData);
                                }
                            }, 600);
                        }),
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                  this.props.deleteTeam(oldData.Id);
                            }, 600);
                        })
                }}
                onRowClick={(event, rowData, togglePanel) => window.location.href = "/team-details/" + rowData.Id}/>
            </div>
         );
    }
}
 
export default TeamsTable;