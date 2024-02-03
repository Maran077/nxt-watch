import './index.css'
import {MdCancel} from 'react-icons/md'

const Banner = ({hideBanner}) => (
  <div
    className="banner"
    data-testid="banner"
    style={{
      backgroundImage:
        "url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png')",
    }}
  >
    <button className="cancel-icon" data-testid="close" onClick={hideBanner}>
      <MdCancel size={20} />
    </button>
    <img
      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
      alt="nxt watch logo"
    />
    <p>Buy Nxt Watch Premium</p>
    <button>GET IT NOW</button>
  </div>
)

export default Banner
