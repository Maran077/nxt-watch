import React from 'react'
import {Link} from 'react-router-dom'
import './index.css'

const calculateAge = publishedAt => {
  const currentDate = new Date()
  const publishedDate = new Date(publishedAt)

  const timeDifference = currentDate - publishedDate

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
  const months = Math.floor(days / 30)
  const years = Math.floor(months / 12)

  if (years > 0) {
    return `${years} ${years === 1 ? 'year' : 'years'} ago`
  } else if (months > 0) {
    return `${months} ${months === 1 ? 'month' : 'months'} ago`
  }

  return `${days} ${days === 1 ? 'day' : 'days'} ago`
}
const YouTubeCard = ({video, api}) => {
  const {channel} = video

  if (api === 'gaming') {
    return (
      <Link to={`/videos/${video.id}`}>
        <li className="youtube-card">
          <img
            src={video.thumbnail_url}
            alt="video thumbnail"
            className="thumbnail"
          />
          <div className="info">
            <div className="channel-info">
              <p className="title">{video.title}</p>
              <p className="views">{video.view_count} views</p>
            </div>
          </div>
        </li>
      </Link>
    )
  }

  const age = calculateAge(video.published_at)
  return (
    <Link key={video.id} to={`/videos/${video.id}`}>
      <li key={video.id} className="youtube-card">
        <img
          src={video.thumbnail_url}
          alt="video thumbnail"
          className="thumbnail"
        />
        <div className="info">
          <div className="channel-info">
            <img
              src={channel.profile_image_url}
              alt="channel logo"
              className="channel-logo"
            />

            <p className="channel">{channel.name}</p>
          </div>

          <p className="title">{video.title}</p>
          <div className="metadata">
            <p className="views">{video.view_count} views</p>
            <p className="duration">{age}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default YouTubeCard
