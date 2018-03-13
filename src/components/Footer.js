import React, { Component } from 'react';
import Table, { TableBody, TableHead, TableFooter, TableCell, TableRow, TableSortLabel, TablePagination } from 'material-ui/Table';
  
class Footer extends Component {
    constructor(props){
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 5,
        };
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
        const {data, rowsPerPage, page} = this.props;
    return (
        <TableFooter>
            <TableRow>
                <TablePagination
                    colSpan={6}
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}/>
            </TableRow>
        </TableFooter>
    );
  };
}
export default Footer;