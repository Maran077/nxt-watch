import React, {createContext, useContext, useState} from 'react'

export const SavedVideosContext = createContext()

export const SavedVideosProvider = ({children}) => {
  const [savedVideos, setSavedVideos] = useState([])

  const addSaveVideo = videoDetails => {
    setSavedVideos(prevSavedVideos => [...prevSavedVideos, videoDetails])
  }

  const removeSaveVideo = videoId => {
    setSavedVideos(prevSavedVideos =>
      prevSavedVideos.filter(video => video.id !== videoId),
    )
  }

  return (
    <SavedVideosContext.Provider
      value={{
        savedVideos,
        addSaveVideo,
        removeSaveVideo,
      }}
    >
      {children}
    </SavedVideosContext.Provider>
  )
}

export const useSavedVideos = () => {
  return useContext(SavedVideosContext)
}
