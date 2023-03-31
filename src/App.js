import React from "react";
import Todo from "./Todo";
import {Paper, List}from "@material-ui/core";
import "./App.css";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [
                { id: 0, title: "Todo 1"},
                { id: 1, title: "Todo 2"},
            ],
        };
    }
    render() {
        //todoItems에

        var todoItems=this.state.items.length > 0 &&(
            <Paper style={{margin:16}}>
                <List>
                    {this.state.items.map((item,ids)=>(
                        <Todo item={item} key={item.id}/>
                    ))}
                </List>
            </Paper>
        );

        return (
            <div className="App">
                {todoItems}
            </div>
        );
    }
}

export default App;
