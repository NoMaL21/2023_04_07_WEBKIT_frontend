import React from "react";
import {Grid, IconButton, Typography}from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

class DeleteTodo extends React.Component {
    constructor(props){
        super(props);
        this.state = {item :{title:""}};
        this.deleteForCompleted = props.deleteForCompleted;
    }

    onButtonClick = ()=>{
        this.deleteForCompleted();
        this.setState({item:{title:""}});
    }

    render(){
        return(
            <Grid container alignItems="center" spacing={1} justify="center">
                <Grid item>
                    <Typography variant="body1">완료한 일 삭제하기 :</Typography>
                </Grid>
                <Grid item>
                    <IconButton aria-label="Delete" onClick={this.onButtonClick}>
                        <DeleteOutlined />
                    </IconButton>
                </Grid>
            </Grid>

        );
    }

}

export default DeleteTodo;