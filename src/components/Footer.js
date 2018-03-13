import React, { Component } from 'react';
import { TableFooter, TableRow, TablePagination } from 'material-ui/Table';
  
class Footer extends Component {
    constructor(props){
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 5,
        };
    }
    
    
    render(){
        const {data, rowsPerPage, page, onChangePage, onChangeRowsPerPage} = this.props;
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
                 onChangePage={onChangePage}
                 onChangeRowsPerPage={onChangeRowsPerPage}/>
            </TableRow>
        </TableFooter>
    );
  };
}
export default Footer;