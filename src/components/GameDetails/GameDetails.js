import React, { Component } from 'react';
import { connect } from 'react-redux';
import categorize from '../Categorize/Categorize'
import Swal from 'sweetalert2';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

class GameDetails extends Component {

    handleAdd = () => {
        const myPayload = {
            game: this.props.reduxStore.gameDetails,
            user: this.props.reduxStore.user.id
        }
        this.props.dispatch({ type: 'ADD_GAME_FROM_DETAILS', payload: myPayload });
        Swal.fire({
            imageUrl: this.props.reduxStore.gameDetails.image,
            imageAlt: this.props.reduxStore.gameDetails.name,
            html: `Added ${this.props.reduxStore.gameDetails.name} to your collection!`
        })
        this.props.history.push('/collection')
    }

    descriptionRender = (description) => {
        return description
    }

    handleRemove = () => {
        // const myPayload = {
        //     game_id: this.props.reduxStore.gameDetails.atlas_id,
        //     user: this.props.reduxStore.user.id
        // }
        // this.props.dispatch({ type: 'REMOVE_GAME_FROM_COLLECTION', payload: myPayload });
        // Swal.fire({
        //     imageUrl: this.props.reduxStore.gameDetails.image,
        //     imageAlt: this.props.reduxStore.gameDetails.name,
        //     html: `Removed ${this.props.reduxStore.gameDetails.name} from your collection.`
        // })        
        // this.props.history.push('/collection')
        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to remove ${this.props.reduxStore.gameDetails.name} from your collection.`,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove it!'
        }).then((result) => {
            if (result.value) {
                const myPayload = {
                    game_id: this.props.reduxStore.gameDetails.atlas_id,
                    user: this.props.reduxStore.user.id
                }
                this.props.dispatch({ type: 'REMOVE_GAME_FROM_COLLECTION', payload: myPayload });
                Swal.fire(
                    'Removed!',
                    `${this.props.reduxStore.gameDetails.name} has been removed from your collection`,
                    'success'
                )
                this.props.history.push('/collection')
            }
        })
    }

    checkIfOwned = () => {
        const { classes } = this.props;
        for(let i=0; i < this.props.reduxStore.userCollection.length; i++){
            console.log('checking if these two are equal:', this.props.reduxStore.userCollection[i].atlas_id, this.props.reduxStore.gameDetails.atlas_id)
            if (this.props.reduxStore.userCollection[i].atlas_id === this.props.reduxStore.gameDetails.atlas_id){
                return <Button size='small' variant='contained' color='secondary' className={classes.button} onClick={this.handleRemove}>Remove from Collection</Button>
            }
        }
        return <Button size='small' variant='contained' color='primary' className={classes.button} onClick={this.handleAdd}>Add to Collection</Button>
    }

    render() {
        return (
            <>
            <div>
                <div className='gameImage'>
                    <img src={this.props.reduxStore.gameDetails.image} alt={this.props.reduxStore.gameDetails.name} />
                </div>
                <div className='gameDeets1'>
                    <h1> {this.props.reduxStore.gameDetails.name} </h1>
                    <h3>{this.props.reduxStore.gameDetails.year_published}</h3>
                    <p>Publisher: {this.props.reduxStore.gameDetails.publisher}</p>
                    <p>Rating: {Math.round(this.props.reduxStore.gameDetails.rating * 10) / 10}</p>
                    <p>Players: {this.props.reduxStore.gameDetails.min_players} - {this.props.reduxStore.gameDetails.max_players}</p>
                    <p>Playtime: {this.props.reduxStore.gameDetails.playtime} minutes</p>
                    <p>Category: {categorize(this.props.reduxStore.gameDetails.category)}</p>
                    {this.checkIfOwned()}
                </div>
                <div className='gameDescription'>
                    {this.props.reduxStore.gameDetails.description}
                </div>
            </div>
            </>
        )
    }
};

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps)(withStyles(styles)(GameDetails));
