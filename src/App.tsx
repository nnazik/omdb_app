import React, { useState } from 'react'
import { MovieCardComponent } from './components/MoiveCard'
import { NavigationBar } from './components/NavigationBar'
import './App.css'

interface MovieResponse {
  Response: string
  Error: string
  Search: []
}

const movieResponseInitial: MovieResponse = {
  Response: '',
  Error: '',
  Search: [],
}

function App() {
  const [searchParam, setSearchParam] = useState('')
  const [searchResult, setSearchResult] = useState(movieResponseInitial)

  const getMovies = async () => {
    await fetch(`http://www.omdbapi.com/?s=${searchParam}&apikey=de8df502`)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.Response === 'True') {
            setSearchResult({
              Response: result.Response,
              Search: result.Search,
              Error: '',
            })
          } else {
            setSearchResult({
              Response: result.Response,
              Search: [],
              Error: result.Error,
            })
          }
        },
        (error) => {
          console.error(error)
        },
      )
  }

  return (
    <>
      <NavigationBar
        searchParam={searchParam}
        onChangeSearch={setSearchParam}
        onSearchParam={getMovies}
      />
      <div className="container">
        {searchResult.Response === '' && (
          <div className="default-message-container">
            Welcome to OMDB Search,search something in the bar above!
          </div>
        )}

        {searchResult.Response === 'False' && (
          <div className="error-message-container">{searchResult.Error}</div>
        )}

        {searchResult.Response === 'True' && (
          <div className="grid-container">
            {searchResult.Search.map((movie: any) => (
              <MovieCardComponent
                imdbID={movie.imdbID}
                Year={movie.Year}
                Title={movie.Title}
                Poster={movie.Poster}
              />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default App
