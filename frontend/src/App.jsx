import React, { useEffect, useState } from 'react';
import { Button, Rating, Spinner } from 'flowbite-react';

const App = props => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMovies = () => {
    setLoading(true);

    return fetch('http://localhost:8000/movies')
      .then(response => response.json())
      .then(data => {
        setMovies(data);
        setLoading(false);
        console.log(data);
      });
  }
  useEffect(() => {
    fetchMovies();
  }, []);
  return (
    <Layout>
      <Heading />
      <Btnordina>
      <Filtromovies movies={movies} setMovies={setMovies} />
      <Filtrorating movies={movies} setMovies={setMovies}/>
      <Filtrorecenti movies={movies} setMovies={setMovies}/>
      </Btnordina>
      <MovieList loading={loading}>
        {movies.map((item, key) => (
          <MovieItem key={key} {...item} />
        ))}
      </MovieList>
    </Layout>
  );
};
///////////////////////////////////////////////////filtro a-z
const Filtromovies = ({ movies, setMovies }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleSelect = (option) => {
    if (option === "A-Z") {
      const sortedMovies = [...movies].sort((a, b) => a.title.localeCompare(b.title));
      setMovies(sortedMovies);
    } else if (option === "Z-A") {
      const sortedMovies = [...movies].sort((a, b) => b.title.localeCompare(a.title));
      setMovies(sortedMovies);
    }
    setIsOpen(false);
  };
  return (
    <div className="dropdown">
      <button style={{backgroundColor: '#9fa3ea', border:'2px solid black', borderRadius:'10px'}} className="dropdown-toggle" onClick={toggleMenu}>
        Ordina per titolo
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          <li onClick={() => handleSelect("A-Z")}>A-Z</li>
          <li onClick={() => handleSelect("Z-A")}>Z-A</li>
        </ul>
      )}
    </div>
  );
};
////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////filtro rating
const Filtrorating = ({movies, setMovies})=>{
  const [isOpenrating, setIsOpenrating] = useState(false);
  const toggleMenurating = () => {
    setIsOpenrating(!isOpenrating);
  };
  const handleSelectbyrating = (option)=>{
    if(option === 'Ordine crescente'){
      const sortedMoviesbyrating = [...movies].sort((a, b) => a.rating - b.rating);
      setMovies(sortedMoviesbyrating);
    }else if(option === 'Ordine decrescente'){
      const sortedMoviesbyrating = [...movies].sort((a, b) => b.rating - a.rating);
      setMovies(sortedMoviesbyrating);
    }
    setIsOpenrating(false);
  }
  return (
    <div className="dropdown">
      <button style={{backgroundColor: '#b3d6ba', border:'2px solid black', borderRadius:'10px'}} className="dropdown-toggle" onClick={toggleMenurating}>
        Ordina per rating
      </button>
      {isOpenrating && (
        <ul className="dropdown-menu">
          <li onClick={() => handleSelectbyrating("Ordine crescente")}>Ordine Crescente</li>
          <li onClick={() => handleSelectbyrating("Ordine decrescente")}>Ordine decrescente</li>
        </ul>
      )}
    </div>
  );
}
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////filtro genres

/////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////filtro più recenti
const Filtrorecenti = ({movies, setMovies})=>{
  const [isOpenrecenti, setIsOpenrecenti] = useState(false);
  const toggleMenurecenti = () => {
    setIsOpenrecenti(!isOpenrecenti);
  };
  const handleSelectbyrecenti = (option)=>{
    if(option === 'Dal più recente'){
      const sortedMoviesbyrecenti = [...movies].sort((a, b) => b.year - a.year);
      setMovies(sortedMoviesbyrecenti);
    }else if(option === 'Dal meno recente'){
      const sortedMoviesbyrecenti = [...movies].sort((a, b) => a.year - b.year);
      setMovies(sortedMoviesbyrecenti);
    }
    setIsOpenrecenti(false);
  }
  return (
    <div className="dropdown">
      <button style={{backgroundColor: '#eae6b9', border:'2px solid black', borderRadius:'10px'}} className="dropdown-toggle" onClick={toggleMenurecenti}>
        Recenti
      </button>
      {isOpenrecenti && (
        <ul className="dropdown-menu">
          <li onClick={() => handleSelectbyrecenti("Dal più recente")}>Dal più recente</li>
          <li onClick={() => handleSelectbyrecenti("Dal meno recente")}>Dal meno recente</li>
        </ul>
      )}
    </div>
  );
}
////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////button
const Btnordina = ({children})=>{
  const [isOpenordina, setIsOpenordina] = useState(false);
  const toggleMenuordina = () => {
    setIsOpenordina(!isOpenordina);
  }
    return(
      <div>
    <button style={{color: '#912a2a', border:'2px solid black', borderRadius:'10px'}} className="dropdown-toggle" onClick={toggleMenuordina}>
          Ordina
    </button>
        {isOpenordina && (
          <ul className="dropdown-menu">
            <li>{children}</li>
          </ul>
        )}
    </div>
    );
  }
///////////////////////////////////////////////////////////
const Layout = props => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        {props.children}
      </div>
    </section>
  );
};

const Heading = props => {
  return (
    <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
      <h1 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
        Movie Collection
      </h1>

      <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
        Explore the whole collection of movies
      </p>
    </div>
  );
};

const MovieList = props => {
  if (props.loading) {
    return (
      <div className="text-center">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:gap-y-8 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3">
      {props.children}
    </div>
  );
};

const MovieItem = props => {
  return (
    <div className="flex flex-col w-full h-full rounded-lg shadow-md lg:max-w-sm">
      <div className="grow">
        <img
          className="object-cover w-full h-60 md:h-80"
          src={props.imageUrl}
          alt={props.title}
          loading="lazy"
        />
      </div>

      <div className="grow flex flex-col h-full p-3">
        <div className="grow mb-3 last:mb-0">
          {props.year || props.rating
            ? <div className="flex justify-between align-middle text-gray-900 text-xs font-medium mb-2">
                <span>{props.year}</span>

                {props.rating
                  ? <Rating>
                      <Rating.Star />

                      <span className="ml-0.5">
                        {props.rating}
                      </span>
                    </Rating>
                  : null
                }
              </div>
            : null
          }

          <h3 className="text-gray-900 text-lg leading-tight font-semibold mb-1">
            {props.title}
          </h3>

          <p className="text-gray-600 text-sm leading-normal mb-4 last:mb-0">
            {props.plot.substr(0, 80)}...
          </p>
        </div>

        {props.wikipediaUrl
          ? <Button
              color="light"
              size="xs"
              className="w-full"
              onClick={() => window.open(props.wikipediaUrl, '_blank')}
            >
              More
            </Button>
          : null
        }
      </div>
    </div>
  );
};

export default App;