import React, { useState } from 'react';
import { uniqueId } from 'lodash';
import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 50px);
  grid-template-rows: repeat(3, 50px);
`;

function TicTacToeTile(props) {
  const {
    onClick,
    value,
    x,
    y,
  } = props;

  const clickHandler = () => onClick(x, y);
  console.log(x, y, value);
  return (
    <button type="button" onClick={clickHandler}>{value}</button>
  );
}

function TicTacToe() {
  const EMPTY_TILE = '';
  const player1 = { id: 1, symbol: 'X' };
  const player2 = { id: 2, symbol: 'O' };
  player1.nextPlayer = player2;
  player2.nextPlayer = player1;
  const [currentPlayer, setCurrentPlayer] = useState(player1);
  const [grid, setGrid] = useState([
    [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE],
    [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE],
    [EMPTY_TILE, EMPTY_TILE, EMPTY_TILE],
  ]);
  const [prefix, setPrefix] = useState();

  const isHorizontalVictory = (x) => {
    if (
      grid[x][0] === grid[x][1]
      && grid[x][1] === grid[x][2]
      && grid[x][0] !== EMPTY_TILE) {
      return true;
    }

    return false;
  };

  const isVerticalVictory = (x) => {
    if (
      grid[0][x] === grid[1][x]
      && grid[1][x] === grid[2][x]
      && grid[0][x] !== EMPTY_TILE) {
      return true;
    }

    return false;
  };

  const isDiagonalVictory = () => {
    if (
      grid[0][0] === grid[1][1]
      && grid[1][1] === grid[2][2]
      && grid[0][0] !== EMPTY_TILE
    ) {
      return true;
    }
    if (
      grid[0][2] === grid[1][1]
      && grid[1][1] === grid[2][0]
      && grid[0][2] !== EMPTY_TILE
    ) {
      return true;
    }

    return false;
  };

  const isVictory = () => {
    if (isHorizontalVictory(0)) {
      return true;
    }
    if (isHorizontalVictory(1)) {
      return true;
    }
    if (isHorizontalVictory(2)) {
      return true;
    }
    if (isVerticalVictory(0)) {
      return true;
    }
    if (isVerticalVictory(1)) {
      return true;
    }
    if (isVerticalVictory(2)) {
      return true;
    }
    if (isDiagonalVictory()) {
      return true;
    }

    return false;
  };

  const turnPlayed = (x, y) => {
    grid[x][y] = currentPlayer.symbol;

    setGrid(grid);
    setPrefix(uniqueId());

    console.log(grid);

    if (isVictory()) {
      window.alert('VICTORY');
    } else {
      setCurrentPlayer(currentPlayer.nextPlayer);
    }
  };

  return (
    <Grid>
      {
        grid.map((rows, x) => rows.map((value, y) => {
          return <TicTacToeTile key={`${prefix}${x}${y}`} onClick={turnPlayed} x={x} y={y} value={value} />
        }))
      }
    </Grid>
  );
}

export default TicTacToe;
