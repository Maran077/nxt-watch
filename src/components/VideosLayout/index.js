import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Banner from '../Banner'
import VideoCard from '../VideoCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    homeVideos: [],
    apiStatus: apiStatusConstants.initial,
    showBanner: true,
    searchValue: '',
  }

  hideBanner = () => {
    this.setState({showBanner: false})
  }

  changeSearchValue = e => {
    this.setState({searchValue: e.target.value})
  }

  componentDidMount() {
    this.getHomeVideos()
  }

  getHomeVideos = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {searchValue} = this.state
    const {api} = this.props
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/videos/${api}${
      api === 'all' ? `?search=${searchValue}` : ''
    }`
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
        homeVideos: fetchedData.videos,
        apiStatus: apiStatusConstants.success,
      })
    } else if (!response.ok) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderHomeVideosList = videos => (
    <>
      {videos.length === 0 ? (
        <div className="failure">
          <img
            className="no-videos-img failure-image"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
            alt="no videos"
          />
          <h1>No Search results found</h1>
          <p>Try different key words or remove search filter</p>
          <button onClick={this.getHomeVideos} className="retry">
            Retry
          </button>
        </div>
      ) : (
        <ul>
          {videos.map(video => (
            <VideoCard key={video.id} video={video} api={this.props.api} />
          ))}
        </ul>
      )}
    </>
  )

  renderHomeVideosFailureView = () => (
    <div className="failure">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>
        We are having some trouble to complete your request. Please try again.
      </p>
      <button className="retry" onClick={this.getHomeVideos}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderHome() {
    const {apiStatus, homeVideos} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderHomeVideosList(homeVideos)
      case apiStatusConstants.failure:
        return this.renderHomeVideosFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {showBanner, searchValue} = this.state
    const {api} = this.props
    return (
      <>
        <Header />
        <div className="home">
          {showBanner && <Banner hideBanner={this.hideBanner} />}
          {api === 'trending' && <h1>Trending</h1>}
          {api === 'gaming' && <h1>Gaming</h1>}
          {api === 'all' ? (
            <div className="searchbar">
              <input
                type="search"
                value={searchValue}
                onChange={this.changeSearchValue}
              />
              <button data-testid="searchButton" onClick={this.getHomeVideos}>
                Search
              </button>
            </div>
          ) : null}
          {this.renderHome()}
        </div>
      </>
    )
  }
}

export default Home
