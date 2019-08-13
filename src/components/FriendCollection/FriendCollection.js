import React, {Component} from 'react';
import { connect } from 'react-redux';
import FriendCollectionItemGrid from '../FriendCollectionItem/FriendCollectionItemGrid';
import FriendCollectionItemTable from '../FriendCollectionItem/FriendCollectionItemTable';
import FriendLog from '../FriendLog/FriendLog';

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

class FriendCollection extends Component {

  state = {
    view: 'table',
  }

  componentDidMount() {
    this.setState({
      view: this.props.reduxStore.collectionView
    })
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
          {this.props.reduxStore.friendCollection.map((game, i) => {
            return (<FriendCollectionItemGrid key={i} game={game} history={this.props.history} />);
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
              {this.props.reduxStore.friendCollection.map((game, i) => {
                return (<FriendCollectionItemTable key={i} game={game} history={this.props.history} />);
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
      <div>
        <h1>Collection</h1>
        <button onClick={() => this.setView('table')}>Table</button>
        <button onClick={() => this.setView('grid')}>Grid</button>
      </div>
      {this.loadView()}
      <FriendLog/>
      </>
    )
  }

};

const mapStateToProps = (reduxStore) => ({
  reduxStore
})

export default connect(mapStateToProps)(withStyles(styles)(FriendCollection));
