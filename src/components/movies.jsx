import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import {paginate } from '../utils/paginate'

class FetchMovies extends Component {
  allMovies = getMovies();
  state = {
    movies: [...this.allMovies],
    currentPage: 1,
    pageSize: 4
  };
  handleDelete = movie => {
    // console.log(movieID);
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };
  handleLike = movie => {
    // console.log('like clicked', movie)
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handlePageChange = page => {
    // console.log(page);
    this.setState({currentPage: page});
  };
  render() {
    const { length: count } = this.state.movies;
    const { currentPage, pageSize, movies: allMovies } = this.state;
    if (count === 0)
      return <p className="text-center">There are no movies in the database</p>;

    const movies = paginate(allMovies, currentPage, pageSize)
    return (
      <React.Fragment>
        <div className="container">
          <p className="mt-4">Showing {count} movies in the database </p>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              {movies.map(movie => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td> {movie.genre.name} </td>
                  <td> {movie.numberInStock} </td>
                  <td> {movie.dailyRentalRate} </td>
                  <td>
                    <Like
                      liked={movie.liked}
                      onClick={() => this.handleLike(movie)}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => this.handleDelete(movie)}
                      className="btn btn-outline-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default FetchMovies;