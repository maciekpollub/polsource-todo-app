import React, { Component } from 'react';
import TasksList from './TasksList';
import TableHeader from './TableHeader';
import Table, {TableBody, TableHead, TableRow} from 'material-ui/Table';
import classNames from 'classnames';
import Typography from 'material-ui/Typography';
import FilterListIcon from 'material-ui-icons/FilterList';




class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [['Task 1', 'High'], ['Task 2', 'Medium'], ['Task 3', 'Low']],
            task: '',
            priority: ''
        };
    };

    handleDeletion = (taskToDelete) => {
        this.setState({
            tasks: this.state.tasks.filter((task) => (taskToDelete !== task))
        });
    };
    render() {
        return(<div>
            <TableHeader /> 
            <Table>
                <TableBody>
                    <TasksList tasks={this.state.tasks} onDelete={this.handleDeletion} />
                </TableBody>
            </Table>
        </div>
        )
    }
}
export default Container;