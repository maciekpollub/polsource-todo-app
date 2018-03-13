import React, { Component } from 'react';
import Table, {TableBody, TableHead, TableRow, TableCell, TableSortLabel} from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Tooltip from 'material-ui/Tooltip';
import classNames from 'classnames';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';



const columnData = [
    {id:'name', numeric: false, disablePadding: true, label: 'Task name'},
    {id:'priority', numeric: false, disablePaddnig: true, label: 'Priority'},
    {id: 'done', numeric: false, disablePadding: true, label: 'Done'}
];

const styles = {
    tableHead: {
    backgroundColor: '#3c423b',
     },  
    tableHeadCell: {
        color: 'white'
    }
};


class TableHeader extends Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    

    

    render(){
        const {order, orderBy, rowCount } = this.props;
        return (
            <TableHead className={this.props.classes.tableHead}>
                <TableRow>
                    {columnData.map(column => {
                        return(
                            <TableCell 
                                key={column.id} 
                                numeric={column.numeric} 
                                className={this.props.classes.tableHeadCell}
                                sortDirection={orderBy === column.id ? order : false} >
                                <Tooltip
                                    title="Sort"
                                    placement={column.numeric ? 'bottom-end': 'bottom-start'}
                                    enterDelay={500}>
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={order}
                                        className={this.props.classes.tableHeadCell}
                                        onClick={this.createSortHandler(column.id)}>
                                        {column.label}
                                    </TableSortLabel>    
                                </Tooltip>           
                            </TableCell>
                        );
                    },this)}
                </TableRow>
            </TableHead>
        )
    }
}
TableHeader.propTypes = {
    order: PropTypes.string.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };
  
  
  
  
  

export default withStyles(styles)(TableHeader);