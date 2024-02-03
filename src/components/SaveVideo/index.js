import {Component} from 'react'
import {SavedVideosContext} from '../../Context/videoContext.js'
import Header from '../Header'
import Banner from '../Banner'
import VideoCard from '../VideoCard'
import './index.css'

class SaveVideo extends Component {
  state = {
    showBanner: true,
  }

  hideBanner = () => {
    this.setState({showBanner: false})
  }

  rendersaveVideosList = videos => (
    <>
      {videos.length === 0 ? (
        <div>
          <img
            className="no-videos-img"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
            alt="no saved videos"
          />
          <h1>No saved videos found</h1>
          <p>Save your videos by clicking a button</p>
        </div>
      ) : (
        <>
          <h1>Saved Videos</h1>
          <ul>
            {videos.map(video => (
              <VideoCard key={video.id} video={video} api="save" />
            ))}
          </ul>
        </>
      )}
    </>
  )

  rendersaveVideosFailureView = () => (
    <img
      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
      alt="Register Prime"
      className="register-prime-image"
    />
  )

  rendersave(savedVideo) {
    return savedVideo.length === 0
      ? this.rendersaveVideosFailureView()
      : this.rendersaveVideosList(savedVideo)
  }

  render() {
    const {showBanner} = this.state
    return (
      <SavedVideosContext.Consumer>
        {context => {
          const {savedVideos} = context
          return (
            <>
              <Header />
              <div className="home">
                {showBanner && <Banner hideBanner={this.hideBanner} />}
                {this.rendersave(savedVideos)}
              </div>
            </>
          )
        }}
      </SavedVideosContext.Consumer>
    )
  }
}

export default SaveVideo
