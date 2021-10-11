import * as React from 'react'
import './styles.css'
interface NavigationBarProps {
  searchParam: string
  onSearchParam: () => void
  onChangeSearch: (searchParam: string) => void
}
export const NavigationBar = (props: NavigationBarProps) => {
  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <div className="nav-logo">OMDB Search</div>
          <div className="nav-menu">
            <div className="search-title">Search a movie</div>
            <input
              type="text"
              className="search-input"
              value={props.searchParam}
              onChange={(e) => props.onChangeSearch(e.target.value)}
            />
            <button className="btn" onClick={() => props.onSearchParam()}>
              SEARCH
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}
