import React, { Component } from 'react'
import axios from 'axios'
import { Consumer } from '../../context.js'

const Url = trackTitle => {
  return `https://cors-anywhere.herokuapp.com/api.musixmatch.com/ws/1.1/track.search?q_track=${trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`
}

class Search extends Component {
  state = {
    trackTitle: '',
    message: ''
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  searchTrack = (dispatch, e) => {
    e.preventDefault()
    const { trackTitle } = this.state
    if (trackTitle.length > 0) {
      this.setState({ message: 'Fetching results...'}, ()=>{
        axios.get(Url(trackTitle))
        .then( res => {
          dispatch({
            type:'SEARCH_TRACK',
            payload:res.data.message.body.track_list
          })
          this.setState({ trackTitle: '', message: 'Done!' })
        })
        .catch( err => console.log(err))
      })
      
    } else {
      this.setState({ message: 'Looks like the search bar is empty! How could it be...' })
    }

  }

  render() {
    return (
      <Consumer>
        { value => {
          const { dispatch } = value
          return (
            <div className="card card-body mb-4 p-4">
              <h1 className="display-4 text-center">
                <i className="fas fa-music"></i> Search For A Song
              </h1>
              <p className="lead text-center">Get the lyrics for any song</p>

              <form onSubmit={this.searchTrack.bind(this, dispatch)}>
                <div className="form-group">
                  <input className="form-control form-control-lg" type="text" name="trackTitle" placeholder="Enter Track Title..." value={this.state.trackTitle} onChange={this.handleChange} />
                </div>
                <button className="btn btn-primary btn-lg btn-block mb-5" type="submit">Search</button>
                <p className="message text-center">{this.state.message}</p>            
              </form>
              </div>


          )
        }}

      </Consumer>
    )
  }
}

export default Search