import React, { Component } from 'react';
import { connect } from 'react-redux';
import EventsItem from '../EventsItem/EventsItem';

// Material UI
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    root: {
        width: '80%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
        margin: "auto",
    },
    table: {
        minWidth: 700,
        align: 'center',
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});

class Events extends Component {

    componentDidMount() {
        console.log('events component mounted');
        this.props.dispatch({ type: 'FETCH_USER_COLLECTION', payload: this.props.reduxStore.user.id });
        this.props.dispatch({ type: 'FETCH_FRIENDS', payload: this.props.reduxStore.user.id });
        this.props.dispatch({ type: 'FETCH_EVENTS', payload: this.props.reduxStore.user.id});
    }

    handleCreate = () => {
        this.props.history.push('/eventcreate')
    }

    render() {
    const { classes } = this.props;
        return (
            <>
            <div className="collectionDiv">
                <h1>Events</h1>
                <Button variant='contained' color='primary' className={classes.button} onClick = {this.handleCreate}>Create an Event</Button>
                    <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow><CustomTableCell>Event</CustomTableCell><CustomTableCell>Date</CustomTableCell><CustomTableCell>Start Time</CustomTableCell><CustomTableCell>Location</CustomTableCell><CustomTableCell>Creator</CustomTableCell><CustomTableCell>&nbsp;</CustomTableCell></TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.reduxStore.events.map((event, i) => {
                                    return (<EventsItem key={i} event={event} history={this.props.history} />);
                                })}
                            </TableBody>
                        </Table>
                    </Paper>
            </div>
            <div>
            </div>
            </>
        )
    }

};

const mapStateToProps = (reduxStore) => ({
    reduxStore
});

export default connect(mapStateToProps)(withStyles(styles)(Events));
