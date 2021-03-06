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

class PublicHackathonTable extends Component {
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
                title: "Hackathon Title",
                field: "Name",
                validate: rowData => {
                    if(rowData.Name === undefined)
                    {
                        return true;
                    }
                    else if(rowData.Name.length === 0)
                    {
                        return "Hackathon name cannot be empty";
                    }
                    return true;
                }
            },
            {
                title: "Number of teams",
                field: "TeamCount",
                render: rowData => rowData.Teams.length,
                CustomFilterAndSearch:(term,rowData) => term === rowData.Teams.length.toString(),
                editable: "never"
            },
            {
                title: "Link",
                field: "Link",
                render: rowData => <a href={rowData.Link} alt="link">{rowData.Link}</a>,
                searhable: false,
                filter: false,
            }
        ]
        return ( 
            <div style={{padding: 10}}>
            <MaterialTable
            options={{
                addRowPosition: "first",
                filtering: true,
                actionsColumnIndex: -1,
                pageSize: 5
            }}
            data={this.props.Hackathons}
            icons={tableIcons}
            columns={columns}
            title="Hackathons of previous years"
            onRowClick={(event, rowData, togglePanel) => window.location.href = "/previous/hackathon-details/" + rowData.Id}/>
         </div>
         );
    }
}
 
export default PublicHackathonTable;