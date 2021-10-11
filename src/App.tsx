import React, { useState } from 'react'
import { MovieCardComponent } from './components/MoiveCard'
import { NavigationBar } from './components/NavigationBar'
import Pagination from './components/Pagination'
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
  const [currentPage, setCurrentPage] = useState(1)
  const moviePerPage = 10

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

  const indexOfLastMovie = currentPage * moviePerPage
  const indexOfFirstMovie = indexOfLastMovie - moviePerPage
  const currentMovies = searchResult.Search.slice(
    indexOfFirstMovie,
    indexOfLastMovie,
  )

  const paginate = (pageNumber: React.SetStateAction<number>) => {
    setCurrentPage(pageNumber)
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
          <>
            <div className="grid-container">
              {currentMovies.map((movie: any) => (
                <MovieCardComponent
                  key={movie.imdbID}
                  imdbID={movie.imdbID}
                  Year={movie.Year}
                  Title={movie.Title}
                  Poster={movie.Poster}
                />
              ))}
            </div>
            <Pagination
              paginate={paginate}
              moviePerPage={moviePerPage}
              totalMovies={searchResult.Search.length}
            />
          </>
        )}
      </div>
    </>
  )
}

export default App
