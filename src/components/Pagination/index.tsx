import React from 'react'

interface PaginationProps {
  moviePerPage: number
  totalMovies: number
  currentPage: number
  paginate: (pageNumber: number) => void
}

const Pagination = (props: PaginationProps) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(props.totalMovies / props.moviePerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <div>
      <div className="pagination">{`Total Results : ${props.totalMovies}`}</div>
      <nav>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li
              className={
                props.currentPage === number ? 'page-item-current' : 'page-item'
              }
              key={number}
            >
              <span
                onClick={() => {
                  props.currentPage !== number && props.paginate(number)
                }}
                className={
                  props.currentPage === number
                    ? 'page-link-current'
                    : 'page-link'
                }
              >
                {number}
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Pagination
