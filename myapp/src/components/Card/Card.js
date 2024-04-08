import React, { useState, useEffect } from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography, Grid, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const PokemonCard = ({ pokemon }) => {
  // スターの状態を管理するためのステート
  const [starred, setStarred] = useState(false);

  // コンポーネントがマウントされた時、またはpokemon.nameが変更された時に実行される
  useEffect(() => {
    // ローカルストレージからスター付きのポケモンを取得
    const starredPokemon = JSON.parse(localStorage.getItem('starredPokemon') || '[]');
    // 現在のポケモンがローカルストレージに含まれているかどうかをチェック
    setStarred(starredPokemon.some(starredPokemon => starredPokemon.name === pokemon.name));
  }, [pokemon.name]);

  // スターがクリックされた時のハンドラー
  const handleStarClick = () => {
    // ローカルストレージからスター付きのポケモンを取得
    const starredPokemon = JSON.parse(localStorage.getItem('starredPokemon') || '[]');
    if (starred) {
      // 現在のポケモンをスター付きのポケモンリストから削除
      const newStarredPokemon = starredPokemon.filter(starredPokemon => starredPokemon.name !== pokemon.name);
      // 新しいリストをローカルストレージに保存
      localStorage.setItem('starredPokemon', JSON.stringify(newStarredPokemon));
    } else {
      // 現在のポケモンをスター付きのポケモンリストに追加
      starredPokemon.push(pokemon);
      // 新しいリストをローカルストレージに保存
      localStorage.setItem('starredPokemon', JSON.stringify(starredPokemon));
    }
    // スターの状態をトグル
    setStarred(!starred);
  };

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height=""
          image={ pokemon.sprites.front_default }
          alt={ pokemon.name }
        />
        <CardContent>
          <IconButton onClick={handleStarClick}>
            <StarIcon fontSize="large" color={starred ? 'warning' : 'action'} />
          </IconButton>
          <Typography gutterBottom variant="h5" component="div">
            { pokemon.name }
          </Typography>
          <Grid container spacing={2} columns={{ xs: 12 }}>
            {pokemon.stats.map((stat, j) => (
              <Grid xs={6} key={j}>
                <div>{stat.stat.name}: {stat.base_stat}</div>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PokemonCard;