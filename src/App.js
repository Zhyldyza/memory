import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  {src: "/img/helmet-1.png", matched: false},
  {src: "/img/potion-1.png", matched: false},
  {src: "/img/ring-1.png", matched: false},
  {src: "/img/scroll-1.png", matched: false},
  {src: "/img/shield-1.png", matched: false},
  {src: "/img/sword-1.png", matched: false},
];

function App() {
  const [cards, setCards]= useState([]);
  const [turns, setTurns]= useState(0);
  const [choiceOne, setChoiceOne]=useState(null);
  const [choiceTwo, setChoiceTwo]=useState(null);

  const shuffleCards=()=>{
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(()=> Math.random() - 0.5)
    .map((card)=>({...card,id:Math.random()}))

  setCards(shuffledCards);
  setTurns(0);
  }

  const handleChoice=(card)=>{
    choiceOne? setChoiceTwo(card):setChoiceOne(card);

   // console.log(choiceOne, 'first');
   //console.log(choiceTwo, 'second');
  };

  const resetTurn=()=>{
    setChoiceOne(null);
    setChoiceTwo(null);
  }

  // compare 2 selected cards
  useEffect(()=>{
    if(choiceOne && choiceTwo){
      if(choiceOne.src === choiceTwo.src){
        setCards((prevCards)=>{
          return prevCards.map((card)=>{
            if(choiceOne.src === card.src){
              return {...card, matched: true};
            }
            return card;
          });
        });
        resetTurn();
      }
    }
    let timerId = setTimeout(()=>{
      resetTurn();
    }, 1000);


    //cleanup function
    return ()=>{
      clearTimeout(timerId);
    };
  }, [choiceOne,choiceTwo]);

  return (
    <div className="App">
      <h1>Magic war</h1>
      <button onClick={shuffleCards}>New game</button>

      <div className='card-grid'>
        {cards.map((card)=>(
           <SingleCard 
           key={card.id} 
           card={card} 
           handleChoice={handleChoice} 
           flipped={card ===choiceOne || card===choiceTwo || card.matched}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
