import React from 'react';
import './App.css';
import Deck, { PlayingCard } from "./Deck";
import Card from "./Card";
import Confetti from 'react-confetti';
import Modal from 'react-modal';

function App() {
  const [attempts, setAttempts] = React.useState(0);
  const [matches, setMatches] = React.useState(0);
  const [matchedCards, setMatchedCards] = React.useState(new Set());
  const [attemptCards, setAttemptCards] = React.useState(new Set());
  const [playingDeck, setPlayingDeck] = React.useState([]);
  const [showCongratulationsModal, setShowCongratulationsModal] = React.useState(false);
  const [showConfetti, setShowConfetti] = React.useState(false);
  const [confettiComplete, setConfettiComplete] = React.useState(false);


  const handleClick = (card) => {
    if (attemptCards.size === 2 || attemptCards.has(card) || matchedCards.has(card)) {
      return;
    }
    setAttemptCards((attemptCards) => new Set([...attemptCards, card]));
    if (attemptCards.size === 1) {
      const [firstCard, secondCard] = [...attemptCards, card];
      if (firstCard instanceof PlayingCard && firstCard.isEqualTo(secondCard)) {
        setMatchedCards(new Set([...matchedCards, firstCard, secondCard]));
        setMatches(matches + 1);
      }
      setTimeout(() => {
        setAttemptCards(new Set());
      }, 1000);
      setAttempts(attempts + 1);
      if (matchedCards.size + 2 === playingDeck.length) {
        setShowCongratulationsModal(true);
        setShowConfetti(true);
      }
    }
  };
  
  const handleYesClick = () => {
    setShowCongratulationsModal(false);
    setAttempts(0);
    setMatches(0);
    setMatchedCards(new Set());
    setAttemptCards(new Set());
    const cards = new Deck().shuffle().drawCards(10);
    const clones = cards.map((card) => card.clone());
    const dupes = [...cards, ...clones];
    const deck = new Deck(dupes).shuffle().getCards();
    setPlayingDeck(deck);
  };

  React.useEffect(() => {
    const cards = new Deck().shuffle().drawCards(10);
    const clones = cards.map((card) => card.clone());
    const dupes = [...cards, ...clones];
    const deck = new Deck(dupes).shuffle().getCards();
    setPlayingDeck(deck);
}, []);



  return (
    <div className="App">
      <header className="App-header">
        <h1>Memory Game</h1>
        <p>This game is just a little play around in React.</p>
        <p>Match all the pairs of cards to win!</p>
        <p>Click on a card to flip it. Try to find a match!</p>
        <p>Number of pairs: 10</p>
        <p>Number of attempts: {attempts}</p>
        <p>Number of matches: {matches}</p>
        <div className="card-list">
          {playingDeck.map((card, index) => (
          <>
          <Card key={index} card={card} matchedCards={matchedCards} attemptCards={attemptCards} handleClick={handleClick} />
          </>
          ))}
        </div>
        {/* <ol>
        {playingDeck.map((card, index) => (
          <li key={index}>{card.toString()}</li>
        ))}

        </ol> */}
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={1000}
          recycle={false}
          run={showConfetti}
          onConfettiComplete={() => {
            setConfettiComplete(true); 
            setShowConfetti(false);}
          }
        />
        <Modal isOpen={showCongratulationsModal} onRequestClose={() => {
          setShowCongratulationsModal(false);
          setShowConfetti(false);
        }}>
          <h2>Congratulations!</h2>
          <p>You won in {attempts} attempts.</p>
          <p>Do you want to play again?</p>
          <button
            onClick={handleYesClick}
          >
            Yes
          </button>
          <button onClick={() => setShowCongratulationsModal(false)}>No</button>
        </Modal>
      </header>
      
    </div>
  );
}

export default React.memo(App);