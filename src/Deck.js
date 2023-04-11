/**
 * Represents a deck of playing cards.
 */
export default class Deck {
  /**
   * Creates a new instance of the Deck class.
   */
  constructor(cards) {

    const suits = ["Hearts", "Spades", "Clubs", "Diamonds"];
    const values = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];

    if (cards) {
      //update the id of the cards
      for (let i = 0; i < cards.length; i++) {
        cards[i].id = i;
      }
      this.cards = cards;
    } else {
      this.cards = [];
      // generate a deck of cards
      for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < values.length; j++) {
          this.cards.push(new PlayingCard(suits[i], values[j], this.cards.length));
        }
      }
    }
  }

  /**
   * Shuffles the deck of cards.
   * @returns {Array} The shuffled deck of cards.
   */
  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
    return this;
  }

  /**
   * Returns the cards in the deck.
   * @returns {Array} The cards in the deck.
   */
  getCards() {
    return this.cards;
  }

  /**
   * Draws a card from the deck.
   * @returns {Card} The drawn card.
   */
  drawCard() {
    return this.cards.pop();
  }

  /**
   * Draws a number of cards from the deck.
   * @param {number} count - The number of cards to draw.
   * @returns {Array} The drawn cards.
    */
  drawCards(num) {
    return this.cards.splice(0, num);
  }
}

export class PlayingCard  {

  /**
   * Creates a new instance of the Card class.
   * @param {string} suit - The suit of the card.
   * @param {string} value - The value of the card.
   */
  constructor(suit, value, id) {
    this.suit = suit;
    this.value = value;
    this.id = id;
  }

  /**
   * Returns the suit of the card.
   * @returns {string} The suit of the card.
   */
  getSuit() {
    return this.suit;
  }

  /**
   * Returns the value of the card.
   * @returns {string} The value of the card.
   */
  getValue() {
    return this.value;
  }

  getId() {
    return this.id;
  }

  /**
   * Returns a string representation of the card.
   * @returns {string} A string representation of the card.
   */
  toString() {
    return `${this.value} of ${this.suit}`;
  }

  /**
   * Returns the symbol of the card's suit.
   * @returns {string} The symbol of the card's suit.
    */
  getSuitSymbol() {
    switch (this.suit) {
      case "Hearts":
        return "♥";
      case "Spades":
        return "♠";
      case "Clubs":
        return "♣";
      case "Diamonds":
        return "♦";
      default:
        return this.getSuit();
    }
  }

  /**
   * Returns a clone of the card.
   * @returns {Card} A clone of the card.
   * @example
   * const card = new Card("Hearts", "Ace");
   * const clone = card.clone();
   * console.log(clone.getId()); // "Hearts-Ace-123456789"
   * console.log(clone.getId() === card.getId()); // false
   */
  clone() {
    return new PlayingCard(this.suit, this.value, this.id + 1);
  }

/**
 * Checks if the card is equal to another card.
 * @param {Card} otherCard - The card to compare.
 * @returns {boolean} True if the cards have the same suit and value; otherwise, false.
 */
isEqualTo(otherCard) {
  if (!(otherCard instanceof PlayingCard)) {
    return false;
  }
  const haveSameSuit = this.suit === otherCard.getSuit();
  const haveSameValue = this.value === otherCard.getValue();
  return haveSameSuit && haveSameValue;
}

}