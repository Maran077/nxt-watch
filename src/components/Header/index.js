import React, {useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {FaMoon, FaSwatchbook, FaFireAlt} from 'react-icons/fa'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {GiHamburgerMenu} from 'react-icons/gi'
import {SiYoutubegaming} from 'react-icons/si'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import './index.css'

const Header = props => {
  const [activeTab, setActiveTab] = useState(props.match.path)
  const [showSideMenu, setShowSideMenu] = useState(false)
  const onClickTab = tab => {
    setActiveTab(tab)
  }
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <>
      <div className="nav-content vertical">
        <Link to="/">
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
          />
        </Link>
        <ul className="nav-menu">
          <li className="burger" onClick={() => setShowSideMenu(prev => !prev)}>
            <GiHamburgerMenu size={25} />
          </li>
          <li>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              alt="profile"
              className="profile"
            />
          </li>
          <li>
            <Popup
              modal
              trigger={
                <button type="button" className="logout">
                  Logout
                </button>
              }
            >
              {close => (
                <>
                  <div>
                    <p>Are you sure, you want to logout</p>
                  </div>
                  <button
                    type="button"
                    className="logout"
                    onClick={onClickLogout}
                  >
                    Confirm
                  </button>
                  <button
                    type="button"
                    className="trigger-button logout"
                    onClick={() => close()}
                  >
                    Cancel
                  </button>
                </>
              )}
            </Popup>
          </li>
        </ul>
      </div>
      <div
        className={`nav-content horizontal ${
          showSideMenu ? 'translate' : 'default'
        } `}
      >
        <ul className="tabs">
          <Link to="/">
            <li
              className={activeTab === '/' ? 'active' : ''}
              onClick={() => onClickTab('home')}
            >
              <AiFillHome size={20} />
              <p>Home</p>
            </li>
          </Link>
          <Link to="/trending">
            <li
              className={activeTab === '/trending' ? 'active' : ''}
              onClick={() => onClickTab('trending')}
            >
              <FaFireAlt size={20} />
              <p>Trending</p>
            </li>
          </Link>
          <Link to="/gaming">
            <li
              className={activeTab === '/gaming' ? 'active' : ''}
              onClick={() => onClickTab('gaming')}
            >
              <SiYoutubegaming size={20} />
              <p>Gaming</p>
            </li>
          </Link>
          <Link to="/saved-videos">
            <li
              className={activeTab === 'watch' ? 'active' : ''}
              onClick={() => onClickTab('watch')}
            >
              <FaSwatchbook size={20} />
              <p>Saved videos</p>
            </li>
          </Link>
        </ul>
        <ul className="contact">
          <li>
            <p>CONTACT US</p>
          </li>
          <li className="socialmedia">
            <img
              alt="facebook logo"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
            />
            <img
              alt="twitter logo"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
            />
            <img
              alt="linked in logo"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
            />
          </li>
          <li>
            <p>Enjoy! Now to see your channels and recommendations!</p>
          </li>
        </ul>
      </div>
    </>
  )
}
export default withRouter(Header)
