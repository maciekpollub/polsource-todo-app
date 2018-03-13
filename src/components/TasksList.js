import React, { Component } from 'react';
/*import Task from './Task';*/
import Paper from 'material-ui/Paper';
import TableHeader from './TableHeader';
import Table, {TableBody, TableHead, TableRow, TableCell, TableSortLabel} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

/*const TasksList = (props) => (
    <Paper> {props.tasks.map((taskName, index) => (<Task key={index} name={taskName[0]} priorityLevel={taskName[1]} onDelete={props.onDelete}/>))}
    </Paper>
);*/
let counter = 0;
let createData = (name, priority) => {
    counter+=1;
    return {
        id: counter,
        name: name, 
        priority: priority};
  }

  const styles = theme => ({
    root: {
      width: '80%',
      marginTop: theme.spacing.unit * 3,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    table: {
      minWidth: 800,
    },
    tableWrapper: {
      overflow: 'auto', 
    },
    });  

class TasksList extends Component{
    constructor(props){
        super(props);
        this.state = {
            order: 'asc',
            orderBy: 'name',
            selected: [],
            data: [
                createData('Task 1', 'Medium'),
                createData('Task 2', 'High'),
                createData('Task 3', 'Low'),
                createData('Task 4', 'High'),
                createData('Task 5', 'Medium')
            ].sort((a, b) => (a.priority < b.priority ? -1 : 1)),
            page: 0,
            rowsPerPage: 5,
        };
    }
    
    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';
        if (this.state.orderBy === property && this.state.order === 'desc'){
            order = 'asc';
        };
        if (property === 'name') {
            const data = order === 'desc' 
            ? this.state.data.sort((a,b) => (b[orderBy] < a[orderBy] ? -1 : 1))
            : this.state.data.sort((a,b) => (a[orderBy] < b[orderBy] ? -1 : 1));
            this.setState({data: data, order: order, orderBy: orderBy});
        } else {
            const data = order === 'desc'
            ? this.state.data.sort((a,b) => ((b[orderBy] === 'Low' && a[orderBy] === 'Medium') ||
                                             (b[orderBy] === 'Low' && a[orderBy] === 'High') ||
                                             (b[orderBy] === 'Medium' && a[orderBy] === 'High') ? -1 : 1 ))
            : this.state.data.sort((a,b) => ((a[orderBy] === 'Low' && b[orderBy] === 'Medium') ||
                                             (a[orderBy] === 'Low' && b[orderBy] === 'High') ||
                                             (a[orderBy] === 'Medium' && b[orderBy] === 'High') ? -1 : 1));   
            this.setState({data: data, order: order, orderBy: orderBy});                               
        }
        
    };

    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1),
            );
        }
        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({
            rowsPerPage: event.target.value
        });
    };

    isSelected = id => {
        this.state.selected.indexOf(id) !== -1;
    }

    render(){
        const { classes } = this.props;
        const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return(
            <Paper className={classes.root} elevation={10}>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table}>
                        <TableHeader
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}/>
                            <TableBody>
                                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                                    const isSelected = this.isSelected(n.id);
                                    return (
                                        <TableRow
                                            onClick={event => this.handleClick(event, n.id)}
                                            aria-checked={isSelected}
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={n.id}
                                            selected={isSelected}>
                                            <TableCell padding='default'>{n.name}</TableCell>
                                            <TableCell padding='default'>{n.priority}</TableCell>
                                            <TableCell padding="checkbox"><Checkbox checked={isSelected} /></TableCell> 
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                    </Table>
                </div>
            </Paper>
        )
    }

}

TasksList.propTypes = {classes: PropTypes.object.isRequired};
export default withStyles(styles)(TasksList);