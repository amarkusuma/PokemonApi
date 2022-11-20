import express from "express";
import { PokemonList , PokemonDetail } from "../Controllers/pokemon.js";
 
const router = express.Router();

router.get('/pokemon-list', PokemonList);

router.get('/pokemon-detail/:name', PokemonDetail);

export default router;