import React, { useState, useEffect } from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo';
import { Paper, List, Container } from "@material-ui/core";
import './App.css';

function App() {
  const [items, setItems] = useState([
    { id: 0, title: "Todo 1 ", done: true },
    { id: 1, title: "Todo 2 ", done: false },
  ]);
  
  const [todoItems, setTodoItems] = useState("");

  // add 함수 추가
  const add = (item) => {
    const thisItems = items;
    item.id = "ID-" + thisItems.length;//key를 위한 id 추가
    item.done = false;
    thisItems.push(item);
    setItems(thisItems);
    setTodoItems(items.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List>
          {items.map((item, idx) => (
            <Todo item={item} key={item.id} />
          ))}
        </List>
      </Paper>
    ));
    console.log(items);
  }

  useEffect(() => {
    setTodoItems(items.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List>
          {items.map((item, idx) => (
            <Todo item={item} key={item.id} />
          ))}
        </List>
      </Paper>
    ))
  }, []);

  return (
    <div className="App">
      <Container maxWidth="md">
        <AddTodo add={add} />
        <div className="TodoList">{todoItems}</div>
      </Container>
    </div>
  );

}

export default App;