import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchGamesItem from '../SearchGamesItem/SearchGamesItem'

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

class SearchGames extends Component {

    state = {
        search: '',
    }

    componentDidMount = () => {
        this.props.dispatch({ type: 'FETCH_USER_COLLECTION', payload: this.props.reduxStore.user.id })
        this.props.dispatch({ type: 'SEARCH_GAMES', payload: this.state.search });
    }

    handleChangeFor = (event, propToChange) => {
        this.setState({
            [propToChange]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'SEARCH_GAMES', payload: this.state.search });
        this.setState({
            search: '',
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <>
            <div className='collectionDiv'>
                <h1>Search Games</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>Game Title: </label>
                    <input type="text" value={this.state.search} onChange={(event) => this.handleChangeFor(event, 'search')} />
                    <button type="submit">Search</button>
                </form>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow><CustomTableCell>Game</CustomTableCell><CustomTableCell>Category</CustomTableCell><CustomTableCell>Players</CustomTableCell><CustomTableCell>Playtime</CustomTableCell><CustomTableCell>Year</CustomTableCell><CustomTableCell>Publisher</CustomTableCell><CustomTableCell>&nbsp;</CustomTableCell><CustomTableCell>&nbsp;</CustomTableCell></TableRow>
                        </TableHead>
                        <tbody>
                            {this.props.reduxStore.searchGame.map((game, i) => {                            
                                return (<SearchGamesItem key={i} game={game} history={this.props.history}/>);
                            })}
                        </tbody>
                    </Table>
                </Paper>
            </div>
            </>
        )
    }

};

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps)(withStyles(styles)(SearchGames));