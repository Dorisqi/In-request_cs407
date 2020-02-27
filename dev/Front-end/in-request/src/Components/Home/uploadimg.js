import React, {Component} from "react";
import IconButton from "@material-ui/core/IconButton";
import Button from  "@material-ui/core/Button";
import {storage} from '../../firebase';
class Upload extends Component{
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            url: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }
    handleChange = e => {
        if(e.target.files[0]){
            const image = e.target.files[0];
            this.setState(()=>({image}));
        }
    }
    handleUpdate = e => {
        console.log('ababa');
        const {image} = this.state;
        const uploadtask = storage.ref('images/${image.name}').put(image);
        uploadtask.on('state_changed', (snapshot) => {
            console.log("intheresomewhere")//progress
        }, (error) => {console.log()}, () => {
            //complete
            storage.ref('images').child(image.name).getDownloadURL().then(url => {
                console.log(url);
            })
        });
    }
    render(){
        const style = {
            height: '100vh,',
            display: 'flex ',
            flexDirection: 'column',
            alignItems: 'ccenter'
        };
        return (
            <div style={style}>
                <IconButton onClick={(e) => this.myInput.click() } >F</IconButton>
                <Button disabled={!this.state.image} onClick={() => this.handleUpdate()}>Upload</Button>
                <input id="myInput" type="file" ref={(ref) => this.myInput = ref} onChange={this.handleChange}/>
            </div>
        )
    }
}
export default Upload;