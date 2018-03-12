import React, { Component } from 'react';
import Container from './components/Container';

let tasksList = [
  {
    id: 1,
    taskName: 'Task 1',
    priority: 'Medium'
  },
  {
    id: 2,
    taskName: 'Task 2',
    priority: 'High'
  },
  {
    id: 3, 
    taskName: 'Task 3',
    priority: 'Low'
  }
];


class App extends Component {

  render() {
    return(
      <div className="App">
         <Container tasks={tasksList}/>
      </div>
    );
  }
}

export default App;
