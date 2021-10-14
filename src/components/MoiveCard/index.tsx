import * as React from 'react'
import './styles.css'
import defaultImage from '../../assets/imdb_default.png'
interface MovieCardComponentProps {
  Title: string
  Poster: string
  Year: string
  imdbID: string
}

interface Rating {
  Source: string
  Value: string
}

interface IntialStateInterace {
  Plot: string
  Actors: string
  imdbID: string
  Ratings: Rating[]
}

const intialState: IntialStateInterace = {
  Plot: 'N/A',
  Actors: 'N/A',
  Ratings: [],
  imdbID: '',
}

export const MovieCardComponent = (props: MovieCardComponentProps) => {
  const [detailsResults, setDetailsResult] = React.useState(intialState)

  const getMovieDetails = async () => {
    await fetch(`http://www.omdbapi.com/?i=${props.imdbID}&apikey=de8df502`)
      .then((res) => res.json())
      .then(
        (result) => {
          setDetailsResult(result)
        },
        (error) => {
          console.log(error)
        },
      )
  }

  return (
    <div className={detailsResults.imdbID ? 'card grid-full' : 'card'}>
      <div className="card-image">
        <img
          width="150"
          height="200"
          src={props.Poster === 'N/A' ? defaultImage : props.Poster}
          alt="poster"
        />
      </div>
      <div className="card-details">
        <div className="card-details-container">
          <div>{props.Title}</div>
          {detailsResults.imdbID && (
            <>
              <div className="card-details-wrapper">
                <div className="card-details-header">Plot</div>
                {detailsResults.Plot}
              </div>
              <div className="card-details-wrapper">
                <div className="card-details-header">Actors</div>
                {detailsResults.Actors}
              </div>
              <div className="card-details-wrapper">
                <div className="card-details-header">Ratings</div>
                <div>
                  {detailsResults.Ratings.length > 0 &&
                    detailsResults.Ratings.map((item) => (
                      <li key={item.Source}>
                        {item.Source} :{item.Value}
                      </li>
                    ))}
                </div>
              </div>
            </>
          )}
        </div>
        <div className="card-details-bottom">
          <div>{props.Year}</div>
          {!detailsResults.imdbID && (
            <button className="btn" onClick={() => getMovieDetails()}>
              DETAILS
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
