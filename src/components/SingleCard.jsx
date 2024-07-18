import "./SingleCard.css";

export default function SingleCard({ card, handleChoice, flipped }) {
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card front" />
        <img
          onClick={() => handleChoice(card)}
          className="back"
          src="/img/cover.png"
          alt="cover"
        />
      </div>
    </div>
  );
}
