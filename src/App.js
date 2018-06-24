import React, { Component } from 'react';
import DynamicList from './List/List';
import SquareBox from './SquareBox/SquareBox';
import SaucerShip from './Saucer/saucer';
import BeamSaucer from './BeamSaucer/beam.saucer';
import Message from './Message/message';
import './App.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      saucers: [
        {
          id: 1,
          opened: false,
        }, {
          id: 2,
          opened: false,
        }, {

          id: 3,
          opened: false,
        },
      ],
      activeRound: false,
      attempts: 0,
      rightGuessCount: 0,
      playedID: null,
      winID: this.setRandom(3),
      progress: 0,
      movesToComplete: 0,
    };
    this.answers = {
      win: ['Maybe you\'ll even get to pilot', 'You won (a trip)!', 'Kiss the Earth goodbye', 'Be my Valentine!', 'Will you marry me?', 'Warp One Engage!', 'Beam you up!', 'Come with me, into the ship', 'You found serenity!', 'Universe can be yours', 'Fly over, fly over!', 'Permission to come on board soon!', 'Up we go!', 'Now you one of us', 'Departing soon...', 'Prepare to take off', 'Zero gravity is fun!', 'How it feels to be chosen?', 'You are the only one'],
      lose: ['Nope', 'Nobody cares', 'Loser!', 'You were doing so well', 'Oopsy Daisy', 'No space trips for ya', 'Keep trying', 'Dismissed', 'Just walk away, friend, just walk away...', 'You are pathetic', 'No luck, buddy', 'Don\'t ever play roulette', 'This is embarrassing', 'Lol', 'Crawling is your thing', 'You poor worm...', 'You are the worst', 'Haha!', 'Earthworm', 'Just one more time', 'Just go...', 'Are you done already?', 'You not gonna make it', 'Access denied', 'We don\'t need you', 'Lam\'oh'],
    };
    this.onSaucerClick = this.onSaucerClick.bind(this);
    this.renderSaucer = this.renderSaucer.bind(this);
    this.pickAnswer = this.pickAnswer.bind(this);
  }

  componentDidMount() {
    this.shuffleHard();
  }


  setRandom(length) {
    return Math.floor(Math.random() * length);
  }


  shuffle() {
    let options = this.state.saucers.slice();
    options = this.shuffleSaucers(options);
    this.setState({
      saucers: options,
      playedID: null,
      winID: this.setRandom(options.length),
    });
  }


  shuffleHard() {
    for (let i = 0; i < 99; i++) {
      setTimeout(() => this.shuffle(), 500);
    }
  }

  renderSaucer(item, onClick) {
    return <SaucerShip saucer={item} onClick={onClick} />;
  }

  render() {
    let message;
    let resultClass;
    const {
      saucers, playedID, winID, progress, attempts,
    } = this.state;

    if (!playedID) {
      message = '';
    } else {
      message = (this.guessedRight(playedID, winID)) ? this.pickAnswer('win') : this.pickAnswer('lose');
      resultClass = (this.guessedRight(playedID, winID)) ? 'success' : 'fail';
    }
    return (
      <div className="game-container">
        <SquareBox className="counter" borderType="double" color="#fff" size={40} content={attempts} />
        <h1>
                    Pick a saucer, win a trip!
        </h1>
        <BeamSaucer scale={1.7} background="magenta" progress={progress} />
        <DynamicList
          itemRenderer={this.renderSaucer}
          items={saucers}
          onClick={this.onSaucerClick}
        />
        <Message className={resultClass} message={message} />
      </div>
    );
  }

  onSaucerClick(id) {
    const { playedID, attempts, winID } = this.state;
    if (!playedID) {
      this.setState({
        attempts: attempts + 1,
        playedID: id,
        progress: this.updateProgress(id, winID),
      });
    } else {
      this.shuffleHard();
    }
  }

  shuffleSaucers(saucers) {
    const shuffledSaucers = saucers;
    for (let i = shuffledSaucers.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledSaucers[i], shuffledSaucers[j]] = [shuffledSaucers[j], shuffledSaucers[i]];
    }
    return shuffledSaucers;
  }

  updateProgress(played, win) {
    const { progress } = this.state;
    if (this.guessedRight(played, win)) {
      return progress < 4 ? progress + 1 : progress;
    }
    return progress > 0 ? progress - 1 : progress;
  }

  pickAnswer(key) {
    const options = this.answers[key];
    return options[Math.floor(Math.random() * options.length)];
  }

  guessedRight(playedID, winID) {
    const { saucers } = this.state;
    const played = saucers.find(saucer => saucer.id === playedID);
    return saucers.indexOf(played) === winID;
  }
}
