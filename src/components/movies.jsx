import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MovieTable from "./movieTable";

class FetchMovies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4
  };
  componentDidMount() {
    const genres = [{ name: 'All Genres' , _id:'' }, ...getGenres()]
    this.setState({ movies: getMovies(), genres: genres });
  }
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
    this.setState({ currentPage: page });
  };
  handleGenreSelect = genre => {
    // console.log(genre);
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };
  handleSort = (path) =>{
    console.log(path);
    
  }
  render() {
    const { length: count } = this.state.movies;
    const { currentPage, selectedGenre, pageSize, movies: allMovies } = this.state;
    if (count === 0) return <p className="text-center">There are no movies in the database</p>;

    const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id): allMovies;
    const movies = paginate(filtered, currentPage, pageSize);

    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-3">
              <ListGroup items={this.state.genres} onItemSelect={this.handleGenreSelect} selectedItem={this.state.selectedGenre}
                // textProperty='name'
                // valueProperty='_id'
              />
            </div>
            <div className="col">
              <p className="mt-4">Showing {filtered.length} movies in the database </p>
              <MovieTable movies={movies} onDelete={this.handleDelete} onLike={this.handleLike} onSort={this.handleSort}/>
              <Pagination itemsCount={filtered.length} pageSize={pageSize} onPageChange={this.handlePageChange} currentPage={currentPage} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default FetchMovies;
