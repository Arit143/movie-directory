import * as React from 'react';
import * as Styles from './Movies.styled';

interface MovieProps {
    actors: Array<string>;
    rank: number;
    name: string;
    duration: string;
    description: string;
    director: string;
}

interface MovieState {
    showExtraDetails: boolean;
}

class Movie extends React.Component<MovieProps, MovieState> {
    static displayName = 'Movie';

    constructor(props: MovieProps) {
        super(props);
        this.state = { showExtraDetails: false };
    }

    render() {
        const { rank, name, duration } = this.props;
        return (
          <React.Fragment>
          <Styles.MovieWrapper onClick={(e) => this.onClick(e)}>
              <Styles.Rank>
                  {rank}
              </Styles.Rank>
              <Styles.Name>
                  {name}
              </Styles.Name>
              <Styles.Duration>
                  {duration}
              </Styles.Duration>
          </Styles.MovieWrapper>
            {this.state.showExtraDetails && this.showExtraDetails()}
        </React.Fragment>
        );
    }

    private showExtraDetails(): JSX.Element {
        return (
          <Styles.ExtraDetailsWrapper>
              <div>Actors: {this.props.actors.join(', ')}</div>
              <Styles.EachDetail>Description: {this.props.description}</Styles.EachDetail>
              <Styles.EachDetail>Director: {this.props.director}</Styles.EachDetail>
                <Styles.ButtonWrapper>
                  <Styles.ContinueButton>
                      Continue Booking
                  </Styles.ContinueButton>
                </Styles.ButtonWrapper>
        </Styles.ExtraDetailsWrapper>);
    }

    private onClick(e: React.MouseEvent<HTMLDivElement>): void {
        this.setState({ showExtraDetails: !this.state.showExtraDetails });
    }
}

export default Movie;
