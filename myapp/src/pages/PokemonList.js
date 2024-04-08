import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/system';
import { useEffect, useState } from "react";
import Loading from '../components/Box/Loading';
import PokemonCard from '../components/Card/Card';
import { getAllPokemon, getPokemon } from "../utils/pokemon";

function PokemonList() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon/";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecode = getPokemon(pokemon.url);
        return pokemonRecode;
      })
    );
    setPokemonData(_pokemonData);
  };

  useEffect(() => {
    const fetchPokemon = async () => {
      //２０体のポケんモンデータを取得
      let res = await getAllPokemon(initialURL);
      //各ポケモンの詳細なデータを取得
      await loadPokemon(res.results);
      setNextUrl(res.next);
      setPrevUrl(res.previous);
      setTimeout(() => setLoading(false), 1000); // 1秒後にloadingをfalseに設定
    }
    fetchPokemon();
  }, []);

  const handlePageChange = async (url) => {
    if (!url) return;
    setLoading(true);
    let data = await getAllPokemon(url);
    await loadPokemon(data.results);
    setPrevUrl(data.previous);
    setNextUrl(data.next);
    setTimeout(() => setLoading(false), 1000);
  }

  const FloatingStack = styled(Stack)({
    position: 'fixed',
    bottom: '20px',
    right: '20px',
  });

  return (
    <div className="PokemonList">
      {
        // ローディング中またはポケモンデータがない場合はローディングコンポーネントを表示
        loading || pokemonData.length === 0 ? (
          <Loading />
        ) : (
          <>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 12 }} p={10}>
              {pokemonData.map((pokemon, i) => (
                <Grid xs={4} sm={4} md={4} lg={3} key={i}>
                  <PokemonCard pokemon={pokemon} />
                </Grid>
              ))}
            </Grid>
            <FloatingStack spacing={2} direction="row">
              <Button onClick={() => handlePageChange(prevUrl)} variant="contained">前へ</Button>
              <Button onClick={() => handlePageChange(nextUrl)} variant="contained">次へ</Button>
            </FloatingStack>
          </>
        )
      }
    </div>
  );
}

export default PokemonList;