import * as React from 'react';
import axios, { AxiosResponse } from 'axios';
import * as _ from 'lodash';
import * as Styles from './App.styled';

import Movie from './movies/index';

interface AppProps {

}

interface AppState {
    allMovies: Array<AllMovieResponse>;
    titlesToShow: number;
    genreToShow: string;
    allGenres: Array<string>;
    showAllMovieList: boolean;
}

interface AllMovieResponse {
    Actors: Array<string>;
    Description: string;
    Director: string;
    Duration: string;
    Genres: Array<string>;
    Id: number;
    Name: string;
    Rank: number;
}

class App extends React.Component<AppProps, AppState> {
    static displayName = 'App';

    constructor(props: AppProps) {
        super(props);
        this.state = {
            allMovies: [],
            titlesToShow: 10,
            genreToShow: 'Action',
            allGenres: [],
            showAllMovieList: true,
        };
    }

    public componentWillMount() {
        axios.get('MOVIE_API_URL', {
            params: {
              authToken: 'MOVIE_API_TOKEN',
            },
        })
        .then((response: AxiosResponse<AllMovieResponse[]>) => {
            this.setState({
              allMovies: response.data,
              allGenres: _.uniq([].concat.apply([], _.map(response.data, 'Genres'))),
            });
        })
        .catch((error: Error) => {
            // console.log(error);
        });
    }

    render() {
        return (
            <React.Fragment>
                Showing {this.renderNumberOfMovieToSelect()} titles
                Genre {this.renderGenreList()}
                <input
                  type="checkbox"
                  checked={this.state.showAllMovieList}
                  onChange={(e) => this.onCheckboxChange(e)}
                />
                <label>
                    Show full movie list to compare
                </label>
                <Styles.MovieLabels>
                    <Styles.RankLabel>
                        Rank
                    </Styles.RankLabel>
                    <Styles.NameLabel>
                        Name
                    </Styles.NameLabel>
                    <Styles.DurationLabel>
                        Duration
                    </Styles.DurationLabel>
                </Styles.MovieLabels>
                {this.renderMovieList()}
            </React.Fragment>
        );
    }

    private renderMovieList() {
        const { allMovies, titlesToShow, genreToShow, showAllMovieList } = this.state;
        const moviesToFilterOn = showAllMovieList ?
                                allMovies :
                              _.filter(allMovies, movie => _.includes(movie.Genres, genreToShow));
        return _.map(_.slice(moviesToFilterOn, 0, titlesToShow), (movie, index) => {
            return (
              <Movie
                key={index}
                actors={movie.Actors}
                rank={movie.Rank}
                name={movie.Name}
                duration={movie.Duration}
                description={movie.Description}
                director={movie.Director}
              />);
        });
    }

    private onSelectChange(e: React.ChangeEvent<HTMLSelectElement>): void {
        this.setState({ titlesToShow : _.parseInt(e.target.value) });
    }

    private onGenreChange(e: React.ChangeEvent<HTMLSelectElement>): void {
        this.setState({ genreToShow: e.target.value });
    }

    private onCheckboxChange(e: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({ showAllMovieList: e.target.checked });
    }

    private renderNumberOfMovieToSelect(): JSX.Element {
        return (
          <select value={this.state.titlesToShow} onChange={(e) => this.onSelectChange(e)}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={40}>40</option>
            <option value={50}>50</option>
            <option value={60}>60</option>
            <option value={70}>70</option>
            <option value={80}>80</option>
            <option value={90}>90</option>
          </select>);
    }

    private renderGenreList(): JSX.Element | null {
        if (_.isEmpty(this.state.allGenres)) {
            return null;
        }

        return (
          <select value={this.state.genreToShow} onChange={(e) => this.onGenreChange(e)}>
              {_.map(this.state.allGenres, genre => {
                    return <option value={genre}>{genre}</option>;
              })}
          </select>);
    }
}

export default App;
