import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TableHeader from './TableHeader';
import Footer from './Footer';
import Table, {TableBody, TableHead, TableRow, TableCell, TableSortLabel} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Form from 'material-ui/Form';


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
    form: {
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    table: {
      minWidth: 800,
    },
    tableWrapper: {
      overflow: 'auto', 
    }
});


class TasksList extends Component{
    constructor(props){
        super(props);
        this.state = {
            order: 'asc',
            orderBy: 'name',
            selected: [],
            task: '',
            level:'',
            data: [
                createData('Task 1', 'Medium'),
                createData('Task 2', 'High'),
                createData('Task 3', 'Low'),
                createData('Task 4', 'High'),
                createData('Task 5', 'Medium'),
                createData('Task 6', 'Low'),
                createData('Task 7', 'High')
            ].sort((a, b) => (a.priority < b.priority ? -1 : 1)),
            page: 0,
            rowsPerPage: 5,
        };
    }

    handleTaskChange = (event) => {
        this.setState({
            task: event.target.value
        });
    }

    handleLevelChange = (event) => {
        this.setState({
            level: event.target.value
        });
    } 

    handleSubmition = (event) => {
        this.setState({
            data: this.state.data.concat(createData(this.state.task,this.state.level)),
            task: '',
            level: '' 
        });
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

    isSelected = id => {
        this.state.selected.indexOf(id) !== -1;
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    };
    handleChangeRowsPerPage = event => {
        this.setState({
            rowsPerPage: event.target.value
        });
    }; 


    render(){
        const { classes } = this.props;
        const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return(
            <Grid container spacing={24}>
                <Grid item xs={12} sm={6} className={classes.form}>
                    <Grid container>
                        <TextField
                         id="task"
                         label="Task"
                         value={this.state.task}
                         onChange={this.handleTaskChange}
                         margin="normal"
                        />
                        <TextField
                         id='level'
                         label="Priority"
                         value={this.state.level}
                         onChange={this.handleLevelChange}
                         margin="normal"
                        />   
                    <Button type="submit" color="primary" onClick={this.handleSubmition}>Add</Button>
                    </Grid>
                </Grid>
            <Paper className={classes.root} elevation={12}>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table}>
                        <TableHeader
                         order={order}
                         orderBy={orderBy}
                         onRequestSort={this.handleRequestSort}
                         rowCount={data.length}
                        />
                            <TableBody>
                                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(entry => {
                                    const isSelected = this.isSelected(entry.id);
                                    return (
                                        <TableRow
                                         hover
                                         onClick={event => this.handleClick(event, entry.id)}
                                         aria-checked={isSelected}
                                         role="checkbox"
                                         tabIndex={-1}
                                         key={entry.id}
                                         selected={isSelected}
                                        >
                                            <TableCell padding='default'>{entry.name}</TableCell>
                                            <TableCell padding='default'>{entry.priority}</TableCell>
                                            <TableCell padding="checkbox"><Checkbox checked={isSelected} /></TableCell> 
                                        </TableRow>
                                    );
                                })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 49 * emptyRows }}>
                                        <TableCell colSpan={6}/>
                                    </TableRow>
                                )}
                            </TableBody>
                            <Footer 
                             data={data}
                             page={page}
                             rowsPerPage={rowsPerPage}
                             onChangePage={this.handleChangePage}
                             onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            />
                    </Table>
                </div>
            </Paper>
        </Grid>    
        )
    }

}

TasksList.propTypes = {classes: PropTypes.object.isRequired};
export default withStyles(styles)(TasksList);