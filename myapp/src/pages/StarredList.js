import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PokemonCard from '../components/Card/Card';

const StarredList = () => {
  const [starredPokemon, setStarredPokemon] = useState([]);

  useEffect(() => {
    const storedStarredPokemon = JSON.parse(localStorage.getItem('starredPokemon') || '[]');
    setStarredPokemon(storedStarredPokemon);
  }, []);

  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 12 }} p={10}>
      {starredPokemon.map((pokemon, i) => (
        <Grid xs={4} sm={4} md={4} lg={3} key={i}>
          <PokemonCard pokemon={pokemon} />
        </Grid>
      ))}
    </Grid>
  );
};

export default StarredList;