import React from 'react';
import Task from './Task';
import Paper from 'material-ui/Paper';

const TasksList = (props) => (
    <Paper> {props.tasks.map((taskName, id) => (<Task key={id} name={taskName} onDelete={props.onDelete}/>))}
    </Paper>
);


export default TasksList;