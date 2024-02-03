import React, {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import {SavedVideosContext} from '../../Context/videoContext.js'
import {FaThumbsUp, FaThumbsDown, FaBookmark} from 'react-icons/fa'
import Header from '../Header'
import Banner from '../Banner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class SingleVideoPlayer extends Component {
  state = {
    videoDetails: [],
    apiStatus: apiStatusConstants.initial,
    likeActive: false,
    dislikeActive: false,
    saveActive: false,
    showBanner: true,
  }

  hideBanner = () => {
    this.setState({showBanner: false})
  }

  componentDidMount() {
    this.getvideoDetails()
  }

  getvideoDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {id} = this.props.match.params

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()

      this.setState({
        videoDetails: fetchedData.video_details,
        apiStatus: apiStatusConstants.success,
      })
    } else if (!response.ok) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  handleButtonClick = buttonType => {
    this.setState(prevState => ({
      [`${buttonType}Active`]: !prevState[`${buttonType}Active`],
    }))
  }

  rendervideoDetailsFailureView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
        className="register-prime-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>
        We are having some trouble to complete your request. Please try again.
      </p>
      <button onClick={this.getvideoDetails}>Retry</button>
    </>
  )

  renderLoadingView = () => (
    <>
      <Header />
      <div
        className="products-loader-container single-video-player"
        data-testid="loader"
      >
        <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </div>
    </>
  )

  rendervideoDetails(videoDetails) {
    const {
      id,
      title,
      video_url,
      thumbnail_url,
      channel,
      view_count,
      published_at,
      description,
    } = videoDetails
    const {profile_image_url, name, subscriber_count} = channel
    const {likeActive, dislikeActive, saveActive, showBanner} = this.state
    return (
      <SavedVideosContext.Consumer>
        {context => {
          const {addSaveVideo, removeSaveVideo, savedVideos} = context

          const isVideoSaved = savedVideos.some(
            savedVideo => savedVideo.id === id,
          )

          const handleSaveClick = () => {
            console.log(id)
            if (isVideoSaved) {
              removeSaveVideo(id)
            } else {
              addSaveVideo(videoDetails)
            }
          }

          return (
            <>
              <Header />
              <div className="single-video-container">
                {showBanner && <Banner hideBanner={this.hideBanner} />}
                <div className="video-wrapper">
                  <ReactPlayer
                    url={video_url}
                    controls
                    width="100%"
                    height="100%"
                  />
                </div>
                <div className="video-details">
                  <p className="video-title">{title}</p>
                  <div className="channel-info-active">
                    <div className="channel-info">
                      <img
                        src={profile_image_url}
                        alt="channel logo"
                        className="channel-logo"
                      />
                      <p className="channel-name">{name}</p>
                      <p className="subscriber-count">
                        {subscriber_count} subscribers
                      </p>
                    </div>
                    <div className="action-buttons">
                      <button
                        className={`like-button ${likeActive ? 'active' : ''}`}
                        onClick={() => this.handleButtonClick('like')}
                      >
                        <FaThumbsUp /> Like
                      </button>
                      <button
                        className={`dislike-button ${
                          dislikeActive ? 'active' : ''
                        }`}
                        onClick={() => this.handleButtonClick('dislike')}
                      >
                        <FaThumbsDown /> Dislike
                      </button>
                      <button
                        className={`save-button ${saveActive ? 'active' : ''}`}
                        onClick={() => {
                          handleSaveClick()
                          this.handleButtonClick('save')
                        }}
                      >
                        <FaBookmark /> Saved
                      </button>
                    </div>
                  </div>
                  <div className="metadata">
                    <p className="views">{view_count} views</p>
                    <p className="published-at">{published_at}</p>
                  </div>
                  <p className="description">{description}</p>
                </div>
              </div>
            </>
          )
        }}
      </SavedVideosContext.Consumer>
    )
  }

  render() {
    const {apiStatus, videoDetails} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.rendervideoDetails(videoDetails)
      case apiStatusConstants.failure:
        return this.rendervideoDetailsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default SingleVideoPlayer
