import React, { Component } from 'react'
import { Consumer } from '../../context.js'
import Spinner from '../layout/Spinner.js'
import Track from './Track.js'

class Tracks extends Component {
  render() {
    return (
      <Consumer>
        { value => {
            const { trackList, heading } = value
            if(trackList === undefined) {
              return <Spinner />
            } else if (trackList.length === 0) {
              return <h3 className="text-center mb-4"> We found nothing, forgive us</h3>
            } else {
              return (
                <React.Fragment>
                  <h3 className="text-center mb-4">{heading}</h3>
                  <div className="row">
                    {trackList.map(item=>{
                      return <Track key={item.track.track_id} track={item.track} />
                    })}
                  </div>
                </React.Fragment>
              )
            }
          }
        }
      </Consumer>
    )
  }
}


export default Tracks