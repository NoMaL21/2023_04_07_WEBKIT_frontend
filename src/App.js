import React from "react";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import { Paper, List, Container } from "@material-ui/core";
import "./App.css";
import { Call } from "@material-ui/icons";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
        };
    }

    add = (item) => {
        Call("/todo","POST",item).then((response) => 
            this.setState({items:response.data})
            );
    };

    //delete 함수 추가
    delete =(item)=>{
        Call("/todo","DELETE",item).then((response) => 
            this.setState({items:response.data})
            );
    }

    update = (item)=>{
        Call("/todo","PUT",item).then((response) => 
        this.setState({items:response.data})
        );
    }

    componentDidMount(){
        Call("/todo","GET",null).then((response) => 
        this.setState({items:response.data})
        );
    }

    render() {
        var todoItems = this.state.items.length > 0 && (
            <Paper style={{ margin: 16 }}>
                <List>
                    {this.state.items.map((item, idx) => (
                        <Todo item={item} key={item.id} delete={this.delete} update={this.update} />
                    ))}
                </List>
            </Paper>
        );

        return (
            <div className="App">
                <Container maxWidth="md">
                    <AddTodo add={this.add} />
                    <div className="TodoList">{todoItems}</div>
                </Container>
            </div>
        );
    }
}

export default App;
