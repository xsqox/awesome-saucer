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
      steps: 3,
      progress: 0,
      saucers: [
        {
          id: 1,
        }, {
          id: 2,
        }, {
          id: 3,
        },
      ],
      activeRound: false,
      attempts: 0,
      playedID: null,
      winID: this.setRandom(3),
    };
    this.answers = {
      win: ['Maybe you\'ll even get to pilot', 'We have black hole roller coasters', 'That\'s gonna be hell of a ride!', 'Ever been on Super Nova?', 'Sky is no limit', 'Be my Valentine!', 'Will you marry me?', 'Warp One Engage!', 'Come with me, into the ship', 'Universe can be yours', 'Fly over, fly over!', 'Permission to come on board soon!', 'Up we go!', 'Departing soon', 'Prepare to take off', 'Zero gravity is fun!', 'You might be the only one'],
      lose: ['Nope', 'Nobody cares', 'Abort mission', 'Oh oh, again!', 'Yep it happened again', 'Left behind haha', 'What\'s taking you so long?', 'No space trips for ya', 'Loser!', 'You were doing so well', 'Oopsy Daisy', 'Keep trying', 'Dismissed!', 'Kinda dissapointing', 'Never give up!', 'Are you always like that?', 'Just walk away, friend, just walk away...', 'You just don\'t wanna go?', 'You are pathetic', 'No luck, buddy', 'Don\'t ever play roulette', 'This is embarrassing', 'Lol', 'Crawling is your thing', 'You poor worm...', 'You are the worst', 'Haha!', 'Earthworm', 'Just one more time', 'Just go...', 'Are you done already?', 'You not gonna make it', 'Access denied', 'We don\'t need you', 'Lam\'oh'],
      victory: ['You won (a trip)!', 'Kiss the Earth goodbye', 'Beaming you up!', 'You found serenity!', 'Now you one of us', 'How it feels to be chosen?'],
    };
    this.onSaucerClick = this.onSaucerClick.bind(this);
    this.renderSaucer = this.renderSaucer.bind(this);
    this.pickAnswer = this.pickAnswer.bind(this);
  }

  componentDidMount() {
    this.shuffleHard();
  }

  onSaucerClick(id) {
    const { playedID, attempts, winID } = this.state;
    if (!playedID) {
      this.setState({
        attempts: attempts + 1,
        playedID: id,
        progress: this.updateProgress(id, winID),
        activeRound: true,
      });
    } else {
      this.shuffleHard();
    }
  }

  setRandom(length) {
    return Math.floor(Math.random() * length);
  }

  shuffleHard() {
    for (let i = 0; i < 50; i += 1) {
      setTimeout(() => this.shuffle(), 500);
    }
  }

  shuffle() {
    let { saucers } = this.state;
    saucers = this.shuffleSaucers(saucers);
    this.setState({
      saucers,
      playedID: null,
      winID: this.setRandom(saucers.length),
    });
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
    const { progress, steps } = this.state;
    // if (this.guessedRight(played, win)) {
    //   return progress < steps ? progress + 1 : progress;
    // }
    // return progress > 0 ? progress - 1 : progress;
    let actual = progress;
    return actual += 1;
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

  generateFeedback() {
    let message;
    let resultClass;
    const {
      playedID, winID, progress, steps, activeRound,
    } = this.state;
    if (!activeRound) {
      message = 'Pick a saucer, win a trip!';
      resultClass = 'invite';
    } else if (!playedID) {
      message = '';
    } else if (progress === steps) {
      message = this.pickAnswer('victory');
      resultClass = 'victory';
    } else {
      message = (this.guessedRight(playedID, winID)) ? this.pickAnswer('win') : this.pickAnswer('lose');
      resultClass = (this.guessedRight(playedID, winID)) ? 'success' : 'fail';
    }
    return { message, resultClass };
  }

  renderSaucer(item, onClick) {
    return <SaucerShip saucer={item} onClick={onClick} />;
  }

  render() {
    const {
      saucers, progress, attempts, steps,
    } = this.state;
    const { message, resultClass } = this.generateFeedback();

    return (
      <div className="game-container">
        <SquareBox className="counter" borderType="double" color="#fff" size={60} content={attempts} />
        <BeamSaucer scale={1.7} background="magenta" progress={progress} steps={steps} />
        <DynamicList
          itemRenderer={this.renderSaucer}
          items={saucers}
          onClick={this.onSaucerClick}
        />
        <Message className={resultClass} message={message} />
      </div>
    );
  }
}
