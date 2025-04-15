"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import styles from "./filmList.module.css";

const FilmList = () => {
  const url = "https://ghibliapi.vercel.app/films"; // link da API externa

  const [films, setFilms] = useState([]); // estado para armazenar os filmes
  const [loading, setLoading] = useState(true); // estado para controlar o carregamento
  const [error, setError] = useState(null); // estado para armazenar erros

  useEffect(() => {
    const fetchFilms = async () => {
        try {
          setLoading(true); // inicia o carregamento  
          const response = await axios.get(url); // faz a requisição para a API
          setFilms(response.data); // armazena os filmes no estado
          setLoading(false); // finaliza o carregamento
        } catch (error) {
           console.log("Erro ao buscar os filmes na API:", error); // exibe o erro no console
           setError(
            "Não foi possível carregar os filmes. Tente novamente mais tarde."
           );
              setLoading(false); // finaliza o carregamento
        }
    };

    fetchFilms(); // chama a função para buscar os filmes
  }, []);

  if (loading) {
    return (
        <div className={styles.loading}>
          Carregando filmes...
        </div>
    )
  }

    if (error) {
        return (
            <div className={styles.error}>
              {error}
            </div>
        )
    }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Filmes do Studio Ghibli</h1>
      <div className={styles.filmGrid}>
        {films.map((film) => (
          <div key={film.id} className={styles.filmCard}>
            <div className={styles.imageContainer}>
              <img src={film.image} alt={film.title} className={styles.image} />
            </div>
            <div className={styles.content}>
              <h2 className={styles.filmTitle}>{film.title}</h2>
              <p className={styles.director}>Diretor: {film.director}</p>
              <p className={styles.year}>{film.release_date}</p>
              <div className={styles.rating}>
                <span className={styles.score}>{film.rt_score}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilmList;