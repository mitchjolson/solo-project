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

const styles = {
    card: {
        maxWidth: 300,
        minWidth: 300,
    },
    media: {
        height: 300,
    },
};

class CollectionItemGrid extends Component {

    handleDetails = () => {
        this.props.dispatch({ type: 'SET_GAME_DETAILS', payload: this.props.game })
        this.props.history.push('/gamedetails')
    }

    render() {
        const { classes } = this.props;
        return (
            <>
            <div className="div-grid">
            <Card onClick={this.handleDetails} className={classes.card}>
                <CardActionArea>
                    <CardMedia className={classes.media}
                        image={this.props.game.image}
                        title={this.props.game.name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {this.props.game.name}
                        </Typography>
                        <Typography component="p">
                            {this.props.game.min_players} - {this.props.game.max_players} players<br/>
                            {this.props.game.playtime} minutes
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            </div>
            </>
        );
    }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps)(withStyles(styles)(CollectionItemGrid));
