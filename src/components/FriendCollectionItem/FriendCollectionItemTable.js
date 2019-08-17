import React, { Component } from 'react';
import { connect } from 'react-redux';
import Categorize from '../Categorize/Categorize'

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
        backgroundColor: theme.palette.common.white,
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
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});

class CollectionItemTable extends Component {

    handleDetails = () => {
        this.props.dispatch({ type: 'SET_GAME_DETAILS', payload: this.props.game })
        this.props.history.push('/gamedetails')
    }

    render() {
        const { classes } = this.props;
        return (
            <>
            <TableRow>
                <CustomTableCell>{this.props.game.name}</CustomTableCell>
                <CustomTableCell align="right">{Categorize(this.props.game.category)}</CustomTableCell>
                <CustomTableCell align="right">{this.props.game.min_players} - {this.props.game.max_players}</CustomTableCell>
                <CustomTableCell align="right">{this.props.game.playtime}</CustomTableCell>
                <CustomTableCell align="right">{Math.round(this.props.game.rating * 10) / 10}</CustomTableCell>
                <CustomTableCell><Button size='small' variant='contained' className={classes.button}onClick={this.handleDetails}>Details</Button></CustomTableCell>
            </TableRow>
            </>
        );
    }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps)(withStyles(styles)(CollectionItemTable));
