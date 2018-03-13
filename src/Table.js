/*
import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import Table, { TableBody,TableHead, TableFooter, TableCell, TableRow, TableSortLabel, TablePagination } from 'material-ui/Table';
import FilterListIcon from 'material-ui-icons/FilterList'; 
import Tooltip from 'material-ui/Tooltip'
import PropTypes from 'prop-types';


let counter=0;
function addTask(name, priority){
  counter+=1;
  return {id: counter, name: name, priority: priority};
}

const columnData = [
  {id:'name', numeric: false, disablePadding: true, label: 'Task'},
  {id:'priority', numeric: false, disablePaddnig: true, label: 'Priority'},
  {id: 'done', numeric: false, disablePadding: true, label: 'Done'}
];

class TableHeader extends Component {

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    return (
      <TableHead>
        <TableRow>
          {columnData.map(column => {
            return(
              <TableCell key={column.id} 
                         numeric={column.numeric} 
                         padding={column.disablePadding ? 'none': 'default'} 
                         sortDirection={orderBy === column.id ? order: false}>
                <Tooltip title="Sort"
                         placement={'bottom-start'}
                         enterDelay={200}>
                  <TableSortLabel active={orderBy === column.id}
                                  direction={order}
                                  onClick={this.createSortHandler(column.id)}>
                    {column.label}
                  </TableSortLabel>
                </Tooltip>         
              </TableCell>           
            );
          }, this)}
        </TableRow>  
      </TableHead>
    );
  }
}

TableHeader.propTypes = {
  numSelected: PropTypes.number.isRequired,
  order: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  orederBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme =>({
  root: {
    paddingRigth: theme.spacing.unit,
  },
  spacer: {
    flex: '1 1 100%'
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: 'o o auto',
  },
});

let TableToolbar = props => {
  const {numSelected, classes } = props;

  return (
    <Toolbar className={classNames(classes.root)}>
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant ="title">Todo app</Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSeleced > 0 ? (
          <Tooltip title='Delete'>
            <IconButton aria-label='Delete'>
              <DeleteIcon/>
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

TableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
"  numSelected: PropTypes.number.isRequired,
};

TableToolbar = withStyles(toolbarStyles)(TableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 800,
  },
  tableWrapper: {
    overflow: 'auto', 
  },
  });

  class MyTable extends Component {
    constructor(props, context){
      super(props, context);
      this.state = {
        order: 'asc',
        orderBy: 'name',
        selected: [],
        data: [
          addTask('Take children to school', 'High'),
          addTask('Talk to God', 'High'),
          addTask('Play with children', 'Medium'),
          addTask('Do the homework', 'High'),
          addTask('Cook the dinner', 'Medium'),
          addTask('Write some code', 'Low'),
        ].sort((a,b) => (a.name < b.name ? -1 : 1)),
        page: 0,
        rowsPerPage: 5,
      };
    }

    handleRequestSort = (event,property) => {
      const orderBy = property;
      let order = 'desc';

      if (this.state.orderBy === property && this.state.order === 'desc'){
        order='asc';
      }
      const data = order === 'desc' ? this.state.data.sort((a,b) => (b[orderBy]<a[orderBy] ? -1 :1))
                                    : this.state.data.sort((a,b) => (a[orderBy]<b[orderBy] ? -1 :1));
      this.setState({ data, order, orderBy });
    };

    handleClick = (event, id) => {
      const { selected } = this.state;
      const selectedIndex = selected.indexOf(id);
      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length -1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex +1),
        );
      }
      this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {
      this.setState({ page });
    };
    
    handleChangeRowsPerPage = event => {
      this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render(){
      const { classes } = this.props;
      const { data, order, orderBy, selected, rowsPerPage, page} = this.state;
      const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

      return(
        <Paper className={classes.root}>
          <TableToolbar numSelected={selected.length} />
          <div className={classes.tableWrapper}>
            <Table className={classes.table}>
              <TableHeader numSelected={selected.length} order={order} orderBy={orderBy} onRequestSort={this.handleRequestSort} rowCount={data.length}/>
              <TableBody>
                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                  const isSelected = this.isSelected(n.id);
                  return(
                    <TableRow hover onClick={event => this.handleClick(event, n.id)} role='checkbox' aria-checked={isSelected} tabIndex={-1} key={n.id} selected={isSelected}>
                      <TableCell padding='checkbox'>
                        <Checkbox checked ={isSelected}/>
                      </TableCell>
                      <TableCell padding='none'>{n.name}</TableCell>
                      <TableCell padding='none'>{n.priority}</TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow style={{height: 49 * emptyRows}}>
                    <TableCell colSpan={6} />
                  </TableRow> 
                )}
              </TableBody>  
            </Table>
          </div>
        </Paper>
      )
    }
  }
MyTable.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(MyTable);*/
