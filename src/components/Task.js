import React, { Component } from 'react';
import Table,{ TableCell, TableRow, TableBody } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import Checkbox from 'material-ui/Checkbox';


/*const deleteIconStyle = {
    hoveredRow: {}, 
    unhoveredRow: {
        visibility: 'none',
    }
};*/

class Task extends Component {
    constructor (props){
        super(props);
        this.state = {
            done: false
        }
    }

    /*handleTaskStatusChange = event => {
        this.setState({
            done: event.target.checked
        })
    };

    handleDeleteIconVisibilityChange = () => {
        this.setState =({
            hoveredRow: event.target
        })
    };*/



    render(){
        return(
            <Table>
            <TableBody>
            <TableRow>
                <TableCell>
                    <span>{this.props.label}</span>
                </TableCell>
                <TableCell>
                    <span>kkkk</span>
                </TableCell>
                <TableCell>
                    <Checkbox></Checkbox>
                </TableCell>
                <TableCell>
                    <IconButton aria-label='Delete' color='primary'>
                        <DeleteIcon/>
                    </IconButton>
                </TableCell>
            </TableRow>
            </TableBody>
            </Table>
        )
    }
}

export default Task;