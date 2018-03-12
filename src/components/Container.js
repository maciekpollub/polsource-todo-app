import React, { Component } from 'react';
import TasksList from './TasksList';

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: this.props.tasks
        };
    };

    handleDeletion = (taskToDelete) => {
        this.setState({
            tasks: this.state.tasks.filter((task) => (taskToDelete !== task))
        });
    };

    render () {
        return(
            <div>
                <TasksList tasks={this.state.tasks} onDelete={this.handleDeletion} />
            </div>
        )
    }
}
export default Container;