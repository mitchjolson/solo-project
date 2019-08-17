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

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
};

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
          <table className="collectionTable">
            <thead>
              <tr><th>Game</th><th>Category</th><th>Players</th><th>Playtime</th><th>Rating</th><th>&nbsp;</th><th>&nbsp;</th></tr>
            </thead>
            <tbody>
              {this.props.reduxStore.userCollection.map((game, i) => {
                return (<CollectionItemTable key={i} game={game} history={this.props.history} />);
              })}
            </tbody>
          </table>
        </>
      )
    }
  }

  render() {
    return (
      <>
      <div className="collectionDiv">
        <p>
          Collection
        </p>
        <button onClick={() => this.setView('table')}>Table</button>
        <button onClick={() => this.setView('grid')}>Grid</button>
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
