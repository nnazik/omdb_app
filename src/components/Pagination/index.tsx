import React from 'react'

interface PaginationProps {
  moviePerPage: number
  totalMovies: number
  paginate: (pageNumber: number) => void
}

const Pagination = (props: PaginationProps) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(props.totalMovies / props.moviePerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <div>
      <nav>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li className="page-item" key={number}>
              <a
                onClick={() => props.paginate(number)}
                href="!#"
                className="page-link"
              >
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Pagination