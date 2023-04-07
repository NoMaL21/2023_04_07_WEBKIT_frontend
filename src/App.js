import React from 'react';
import Todo from './Todo';
import { Paper, List} from "@material-ui/core";
import './App.css';

function App() {
  const items = [{id:0,title:"Todo 1",done:true},
  {id:1,title:"Todo 2",done:false}];

  var todoItems = items.length > 0 && (
    <Paper style={{ margin: 16 }}>
      <List>
        {items.map((item, idx) => (
          <Todo item={item} key={item.id}/>
        ))}
      </List>
    </Paper>

  );
  return (
    <div className="App">{todoItems}</div>
  );
}

export default App;