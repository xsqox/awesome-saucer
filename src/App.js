import React, { Component } from 'react';
import DynamicList from './List/List';
import SquareBox from './SquareBox/SquareBox';
import SaucerShip from './Saucer/saucer';
import BeamSaucer from './BeamSaucer/beam.saucer';
import Message from './Message/message';
import Data from './strings/strings.json';
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
      attempts: 9,
      playedID: null,
      winID: App.setRandom(3),
    };
    this.answers = Data.answers;
    this.saucerRefs = [];
    this.onSaucerClick = this.onSaucerClick.bind(this);
    this.renderSaucer = this.renderSaucer.bind(this);
    this.pickAnswer = this.pickAnswer.bind(this);
    this.resetHandler = this.resetHandler.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
  }

  componentDidMount() {
    document.body.addEventListener('click', this.handleOutsideClick);
    this.shuffleHard();
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleOutsideClick);
  }

  onSaucerClick(id) {
    if (id) {
      const {
        playedID, attempts, winID, progress, steps,
      } = this.state;
      if (steps !== progress) {
        if (!playedID) {
          this.setState({
            attempts: attempts - 1,
            playedID: id,
            progress: this.updateProgress(id, winID),
            activeRound: true,
          });
        } else {
          this.shuffleHard();
        }
      }
    }
  }

  setWrapperRef(node) {
    this.saucerRefs.push(node);
  }


  static setRandom(length) {
    return Math.floor(Math.random() * length);
  }

  shuffleHard() {
    for (let i = 0; i < 50; i += 1) {
      setTimeout(() => this.shuffle(), 500);
    }
  }

  handleOutsideClick(event) {
    let insider = false;
    if (this.saucerRefs.length) {
      this.saucerRefs.forEach((saucer) => {
        if (saucer.contains(event.target)) {
          insider = true;
        }
      });
    }
    if (insider) {
      this.onSaucerClick(null);
    } else {
      this.shuffleHard();
    }
  }


  shuffle() {
    let { saucers } = this.state;
    saucers = this.shuffleSaucers(saucers);
    this.setState({
      saucers,
      playedID: null,
      winID: App.setRandom(saucers.length),
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
    if (this.guessedRight(played, win)) {
      return progress < steps ? progress + 1 : progress;
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

  resetHandler() {
    this.setState({
      progress: 0,
      attempts: 0,
      playedID: null,
    }, this.shuffleHard());
  }

  renderSaucer(item, onClick) {
    return <div ref={this.setWrapperRef}><SaucerShip saucer={item} onClick={onClick} /></div>;
  }

  render() {
    let showReset = false;
    let noAttemptsLeft = false;
    const {
      saucers, progress, attempts, steps,
    } = this.state;
    const { message, resultClass } = this.generateFeedback();
    if (progress === steps) {
      showReset = true;
    }
    if (attempts === 0) {
      showReset = true;
      // noAttemptsLeft = true;
    }

    return (
      <div className="game-container">
        <SquareBox className="counter" borderType="double" color="#fff" size={60} content={attempts} reset={showReset} onClick={this.resetHandler} />
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
