import { useEffect, useState } from "react";
import chuck from './assets/chuck.png'

function App() {
  const [joke, setJoke] = useState("");
  const [jokes, setJokes] = useState([]);


  useEffect(() => {
    const jokesparse = JSON.parse(localStorage.getItem('joke'))
    if(jokesparse){
      setJokes(jokesparse)
    }
  }, []);
  

  function apiCall (){
    fetch("https://api.chucknorris.io/jokes/random")
    .then((response) => response.json())
    .then((data) => {
      setJoke(data.value);
    })
    .catch((error) => console.log(error));
  }


  const favorite = () => {
    const jokesFav = [...jokes, joke];
    setJokes(jokesFav);
    localStorage.setItem('joke', JSON.stringify(jokesFav));
    console.log(jokesFav)
  }

  const removefav = (index) => {
    const Confirmed = window.confirm(
      "Tem certeza que quer deletar?",
    );
    if (Confirmed) {
      const jokesFav = [...jokes];
      jokesFav.splice(index, 1);
      setJokes(jokesFav);
      localStorage.setItem('joke', JSON.stringify(jokesFav));
    }
};


return (
  <main>
    <img src={chuck} alt="Chuck imagem vetor" />
    <h1>Chuck Norris Jokes</h1>
    <p>{joke}</p>
    <button onClick={apiCall}>Nova Piada</button>
    <button onClick={favorite}>Favoritos</button>
    <h1>Favoritos</h1>
    {jokes.map((item, index) => (
    <div>
      <p key= {index}>{item}</p>
      <button onClick={() => removefav(index)}>Remover</button> 
    </div>
    ) )}
  </main>
);
}

export default App;
