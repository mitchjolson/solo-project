import React, {Component} from 'react';
import { connect } from 'react-redux';
import CollectionItemGrid from '../CollectionItem/CollectionItemGrid';
import CollectionItemTable from '../CollectionItem/CollectionItemTable';

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
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
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

class Collection extends Component {

  state = {
    view: 'table',
  }

  componentDidMount() {
    this.setState({ view: this.props.reduxStore.collectionView });
    this.props.dispatch({ type: 'FETCH_USER_COLLECTION', payload: this.props.reduxStore.user.id });
    this.props.dispatch({ type: 'CHECK_FLAG', payload: this.props.reduxStore.user.id });
  }

  setView = (selectedView) => {
    this.props.dispatch({ type: 'SET_COLLECTION_VIEW', payload: selectedView});
      this.setState({
        view: selectedView
      })
  }

  loadView = () => {
    const { classes } = this.props;
    if(this.state.view === 'grid'){
      return (
        <>
        <div>
          {this.props.reduxStore.userCollection.map((game, i) => {
            return (<CollectionItemGrid key={i} game={game} history={this.props.history} />);
          })}
        </div>
        </>
      )
    }
    else{
      return (
        <>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow><CustomTableCell>Game</CustomTableCell><CustomTableCell align='right'>Category</CustomTableCell><CustomTableCell align='right'>Players</CustomTableCell><CustomTableCell align='right'>Playtime</CustomTableCell><CustomTableCell align='right'>Rating</CustomTableCell><CustomTableCell align='right'>&nbsp;</CustomTableCell></TableRow>
            </TableHead>
            <TableBody>
              {this.props.reduxStore.userCollection.map((game, i) => {
                return (<CollectionItemTable key={i} game={game} history={this.props.history} />);
              })}
            </TableBody>
          </Table>
          </Paper>
        </>
      )
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <>
      <div className="collectionDiv">
        <h1>My Collection</h1>
        <Button variant='contained' className={classes.button} onClick={() => this.setView('table')}>Table View</Button>
        <Button variant='contained' className={classes.button} onClick={() => this.setView('grid')}>Grid View</Button>
      </div>
      {this.loadView()}
      </>
    )
  }

};

const mapStateToProps = (reduxStore) => ({
  reduxStore
})

export default connect(mapStateToProps)(withStyles(styles)(Collection));
