import React, { Component } from 'react'
import axios from 'axios'
import Spinner from '../layout/Spinner.js'
import { Link } from 'react-router-dom'

const Url1 = trackId => {
  return `https://cors-anywhere.herokuapp.com/api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${trackId}&apikey=${process.env.REACT_APP_MM_KEY}`
} 
const Url2 = trackId => {
  return `https://cors-anywhere.herokuapp.com/api.musixmatch.com/ws/1.1/track.get?track_id=${trackId}&apikey=${process.env.REACT_APP_MM_KEY}`
}   

class Lyrics extends Component {

  state = {
    lyrics: '',
    track: {}
  }

  componentDidMount() {
    axios.get(Url1(this.props.match.params.id))
      .then( res => {
        this.setState( { lyrics: res.data.message.body.lyrics.lyrics_body} )
        return axios.get(Url2(this.props.match.params.id))
          .then( res=> {
            this.setState( { track: res.data.message.body.track} )
          })
          .catch( err => console.log(err) )
      })
      .catch( err => console.log(err) )
  }

  render() {
    const { lyrics, track } = this.state
    if ( lyrics === undefined || lyrics.length === 0 ||
         track  === undefined || Object.keys(track).length  === 0) {
      return <Spinner />
    } else {
      return (
        <React.Fragment>
          <Link to="/" className="btn btn-dark btn-sm mb-4">Go Back</Link>
          <div className="card">
            <h5 className="card-header">
              {track.track_name} by <span className="text-secondary"> {track.artist_name}</span>
            </h5>
            <div className="card-body">
              <p className="card-text">{lyrics}</p>
            </div>
          </div>
          <ul className="list-group mt-3">
            <li className="list-group-item">
              <strong>Album:</strong> {track.album_name} 
            </li>
          </ul>
        </React.Fragment>
      )
    }    
  }
}

export default Lyrics