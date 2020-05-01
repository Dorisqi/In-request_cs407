import React, { Component } from 'react';
import {fdb} from "../../firebase";
import { withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';


const styles = theme => ({
    root: {
        minWidth: 275,
        margin: 10,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
})

class ActiveTransaction extends Component {
    constructor(props){
        super(props);
        this.state = {
            active_br_post: [],
            active_ld_post: [],
        };
    }
    componentDidMount() {
        let request_collection = fdb.collection('requests')
        let query = request_collection.where('borrower', '==', this.props.curUser).where('msnone', '==', true).where('msfinished', '==', false).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    const item = doc.data();
                    const new_item = item;
                    new_item['id'] = doc.id;
                    this.setState({
                        active_br_post: [...this.state.active_br_post, new_item],
                    });
                });
            }).catch(err => {
                console.log('Error getting borrowing documents', err);
            });
        let len_query = request_collection.where('lender', '==', this.props.curUser).where('msaccepted','==',true).where('msfinished', '==', false).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    const item = doc.data();
                    const new_item = item;
                    new_item['id'] = doc.id;
                    this.setState({
                        active_ld_post: [...this.state.active_ld_post, new_item],
                    });
                });
            }).catch(err => {
                console.log('Error getting lending documents', err);
            });

    }

    handleStartb(post){
        alert("start button is pushed, the post id is " + post.id);
        var upd = fdb.collection("requests").doc(post.id);
        upd.update({
            startb:true,
            status:"pending"
        })
    }
    handleStartl(post){
        alert("start button is pushed, the post id is " + post.id);
        var upd = fdb.collection("requests").doc(post.id);
        upd.update({
            startl:true,
            status:"pending"
        })
    }

    handleFinishb(post){
        alert("Finish button is pushed, the post id is " + post.id);
        var upd = fdb.collection("requests").doc(post.id);
        upd.update({
            msfinished:true,
            status:"archived"
        })
    }

    handleFinishl(post){
        alert("Finish button is pushed, the post id is " + post.id);
        var upd = fdb.collection("requests").doc(post.id);
        upd.update({
            msfinished:true,
            status:"archived"
        })
    }

    handleCancel(post){
        console.log(post)
        console.log(post.id)
        alert("you have cancelled your post : " + post.title);
        var upd = fdb.collection("requests").doc(post.id);
        upd.update({
            msfinished:true,
            status:"archived"
        })
    }

    render() {
        const{classes} = this.props
        const{active_br_post, active_ld_post} = this.state

        return (
            <div>
                <Typography variant="h4" gutterBottom color="textPrimary">
                    Active Borrow Record
                </Typography>
                <Grid container xs={12} spacing={3}>
                    {active_br_post.map(post=>
                        <Grid item xs={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        {post.title}
                                    </Typography>
                                    <Typography variant= "subtitle1" >
                                        {post.content}
                                    </Typography>
                                    <Typography variant="body2" component="p" color="textSecondary">
                                        Estimated Return Date: {post.estReturn.toDate().toString()}
                                        <br />
                                    </Typography>
                                    {post.msaccepted == false
                                        ?
                                        <CardActions>
                                            <Button size="small" disabled>Start</Button>
                                            <Button size="small" disabled>Finish</Button>
                                            <Button size="small" color="primary">Cancel</Button>
                                        </CardActions>
                                        :
                                        [
                                            ((post.startb == false) || (post.startl == false)
                                                    ?
                                                    <div>
                                                        <Typography variant="body2" component="p" color="textSecondary">
                                                            Lender: {post.lender}
                                                            <br />
                                                        </Typography>
                                                        <CardActions>
                                                            <Button size="small" color="primary" onClick={()=>this.handleStartb(post)}>Start</Button>
                                                            <Button size="small" disabled>Cancel</Button>
                                                        </CardActions>
                                                    </div>
                                                    :
                                                    <div>
                                                        <Typography variant="body2" component="p" color="textSecondary">
                                                            Lender: {post.lender}
                                                            <br />
                                                        </Typography>
                                                        <CardActions>
                                                            <Button size="small" color="primary" disabled>Start</Button>
                                                            <Button size="small" disabled>Cancel</Button>
                                                        </CardActions>
                                                    </div>
                                            ),
                                        ]
                                    }
                                </CardContent>
                            </Card>
                        </Grid>
                    )}
                </Grid>
                <br />
                <Divider />
                <br />
                <Typography variant="h4" gutterBottom color="textPrimary">
                    Active Lend Record
                </Typography>
                {active_ld_post.map(post=>
                    <Grid item xs={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    {post.title}
                                </Typography>
                                <Typography variant= "subtitle1" >
                                    {post.content}
                                </Typography>
                                <Typography variant="body2" component="p" color="textSecondary">
                                    Borrower: {post.borrower}
                                    <br />
                                </Typography>
                                <Typography variant="body2" component="p" color="textSecondary">
                                    Estimated Return Date: {post.estReturn.toDate().toString()}
                                    <br />
                                </Typography>
                                {post.msaccepted == false
                                    ?
                                    <CardActions>
                                        <Button size="small" disabled>Start</Button>
                                        <Button size="small" disabled>Finish</Button>
                                        <Button size="small" color="primary" disabled>Cancel</Button>
                                    </CardActions>
                                    :
                                    [
                                        ((post.startb == false) || (post.startl == false)
                                                ?
                                                <div>
                                                    <Typography variant="body2" component="p" color="textSecondary">
                                                        Lender: {post.lender}
                                                        <br />
                                                    </Typography>
                                                    <CardActions>
                                                        <Button size="small" color="primary" onClick={()=>this.handleStartl(post)}>Start</Button>
                                                        <Button size="small" disabled>Finish</Button>
                                                        <Button size="small" disabled>Cancel</Button>
                                                    </CardActions>
                                                </div>
                                                :
                                                <div>
                                                    <Typography variant="body2" component="p" color="textSecondary">
                                                        Lender: {post.lender}
                                                        <br />
                                                    </Typography>
                                                    <CardActions>
                                                        <Button size="small" color="primary" disabled>Start</Button>
                                                        <Button size="small" onClick={()=>this.handleFinishl(post)}>Finish</Button>
                                                        <Button size="small" disabled>Cancel</Button>
                                                    </CardActions>
                                                </div>
                                        ),
                                    ]
                                }
                            </CardContent>
                        </Card>
                    </Grid>
                )}
            </div>
        );
    }
}
export default withStyles(styles,{withTheme: true})(ActiveTransaction);
