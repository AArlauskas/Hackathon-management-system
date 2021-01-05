import React, { Component } from 'react';
import Transfer from 'react-virtualized-transfer';

class ManageUsersTransferList extends Component {
    constructor(props)
    {
        super(props);
        const dataSource = [];
        const targetKeys = [];

        this.props.Users.forEach(user => {
            dataSource.push({
               key: user.Id,
               title: user.Name 
            });
        });

        this.props.Team.Users.forEach(user => {
            targetKeys.push(user.Id);
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
                this.props.addUsers(this.props.Team.Id, _moveKeys);
            }
            else {
                this.props.removeUsers(this.props.Team.Id, _moveKeys);
            }
            this.setState({ targetKeys: nextTargetKeys });
        }

        return ( 
            <div style={{margin: 10}}>
                <div style={{textAlign: "center"}}>
                    <h2 style={{ color: "#F2F5F9" }}>{this.props.Team.Name}</h2>
                </div>
                <Transfer
                render={item => `${item.title}`}
                dataSource={this.state.dataSource}
                targetKeys={this.state.targetKeys}
                selectedKeys={this.state.selectedKeys}
                filterOption={filterOption}
                onSelectChange={handleSelectChange}
                onChange={handleChange}
                titles={['Unassigned users', 'Assigned users']}
                rowHeight={32}
                listStyle={{
                    width: '100%',
                    height: 400,
                }}
                operations={['Remove from Team', 'Assign/Add to Team']}
                showSearch
                notFoundContent={'not found'}
                searchPlaceholder={'Search'}
                />
            </div>
         );
    }
}
 
export default ManageUsersTransferList;