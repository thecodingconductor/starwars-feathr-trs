import { useParams } from "react-router-dom";
import {useEffect, useState } from 'react'
import axios from 'axios'
import type { Film } from '../../types/swapi'
import { useFilmStore } from "../../store/useFilmStore";

const FilmPage = () => {
    const { id } = useParams<{ id: string}>();
    const getFilmById = useFilmStore((state) => state.getFilmById)
    const [film, setFilm] = useState<Film | null>(() => 
        id ? getFilmById(id) || null : null)

    useEffect(() => {
       if (!film && id)  {
        axios.get(`https://swapi.info/api/films/${id}`).then(res => {setFilm(res.data)})
       }
    }, [film, id])
    
    if (!film) return <p>Loading film data...</p>;

    return (
        <div>
        <h1>{film.title}</h1>
        <p><strong>Episode:</strong> {film.episode_id}</p>
        <p><strong>Directed by:</strong> {film.director}</p>
        <p><strong>Released:</strong> {film.release_date}</p>
        <p>{film.opening_crawl}</p>
        </div>
  );
}

export default FilmPage