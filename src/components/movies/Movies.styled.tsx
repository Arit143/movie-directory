import styled, { withProps } from './../styled-components';

interface MovieWrapperProps {
    odd?: boolean;
}

export const MovieWrapper = withProps<MovieWrapperProps, HTMLDivElement>(styled.div)`
    width: 100%;
    padding: 20px;
    border: 1px solid black;
    background: ${props => props.odd ? 'grey' : 'white' }
    display: inline-flex;
    box-sizing: border-box;
    cursor: pointer;

    &:hover {
        background-color: lightgrey;
    }
`;

export const Rank = styled.div`
    width: 10%;
    text-align: center;
`;

export const Name = styled.div`
    width: 80%;
    text-align: left;
`;

export const Duration = styled.div`
    width: 10%;
    text-align: center;
`;

export const ExtraDetailsWrapper = styled.div`
    background-color: lightblue;
`;

export const EachDetail = styled.div`
    margin-top: 10px;
`;

export const ButtonWrapper = styled.div`
    text-align: right;
`;

export const ContinueButton = styled.button`
    padding: 20px 30px;
    background-color: red;
    border-radius: 3px;
    border: 1px solid black;
`;
