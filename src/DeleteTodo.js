import React from "react";
import {Grid, IconButton}from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

class DeleteTodo extends React.Component {
    constructor(props){
        super(props);
        this.state = {item :{title:""}};
        this.add = props.add;
    }

    onButtonClick = ()=>{
        this.deleteForCompleted();
        this.setState({item:{title:""}});
    }

    render(){
        return(
            <Grid container>
                <Grid xs={1} md={1} item>
                    <IconButton aria-label="Delete"
                    onClick={this.onButtonClick}>
                        <DeleteOutlined />
                    </IconButton>
                </Grid>
            </Grid>

        );
    }

}

export default DeleteTodo;