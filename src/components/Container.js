import React, { Component } from 'react';
import TasksList from './TasksList';
import Table, {TableBody} from 'material-ui/Table';

let Container = () => {
    return(
    <div>
        <Table>
            <TableBody>
                <TasksList />
            </TableBody>
        </Table>
    </div>)
    }
export default Container;