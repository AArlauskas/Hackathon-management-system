import React, { Component } from 'react';
import Transfer from 'react-virtualized-transfer';

class ManageTeamsTransferList extends Component {
    constructor(props)
    {
        super(props);
        const dataSource = [];
        const targetKeys = [];

        this.props.Teams.forEach(team => {
            dataSource.push({
               key: team.Id,
               title: team.Name 
            });
        });

        this.props.Hackaton.Teams.forEach(team => {
            targetKeys.push(team.Id);
        });

        this.state = { 
            dataSource: dataSource,
            targetKeys: targetKeys,
            selectedKeys: []
         }
    }
    
    render() {
        
        const filterOption = (inputValue, option) => {
            return option.description.indexOf(inputValue) > -1;
        }

        const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
            this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });
        }

        const handleChange = (nextTargetKeys, _direction, _moveKeys) => {
            if (_direction === "right") {
                this.props.addTeams(this.props.Hackaton.Id, _moveKeys);
            }
            else {
                this.props.removeTeams(this.props.Hackaton.Id, _moveKeys);
            }
            this.setState({ targetKeys: nextTargetKeys });
        }

        return ( 
            <div style={{margin: 10}}>
                <div style={{textAlign: "center"}}>
                    <h2 style={{ color: "#F2F5F9" }}>{this.props.Hackaton.Name}</h2>
                </div>
                <Transfer
                render={item => `${item.title}`}
                dataSource={this.state.dataSource}
                targetKeys={this.state.targetKeys}
                selectedKeys={this.state.selectedKeys}
                filterOption={filterOption}
                onSelectChange={handleSelectChange}
                onChange={handleChange}
                titles={['Unassigned teams', 'Assigned teams']}
                rowHeight={32}
                listStyle={{
                    width: '100%',
                    height: 400,
                }}
                operations={['Remove from Hackathon', 'Assign/Add to Hackathon']}
                showSearch
                notFoundContent={'not found'}
                searchPlaceholder={'Search'}
                />
            </div>
         );
    }
}
 
export default ManageTeamsTransferList;