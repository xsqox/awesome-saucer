import React, {Component} from 'react';
import './App.css';
import DynamicList from './List/List';
import SaucerShip from './Saucer/saucer';
import Message from './Message/message';
import Button from './Button/button';

export default class App extends Component {
    constructor() {
        super();
        this.shuffle = this.shuffle.bind(this);
        this.shuffleHard = this.shuffleHard.bind(this);
        this.onSaucerClick = this.onSaucerClick.bind(this);
        this.shuffleSaucers = this.shuffleSaucers.bind(this);
        this.initSaucers = this.initSaucers.bind(this);
        this.renderSaucer = this.renderSaucer.bind(this);
        this.setRandom = this.setRandom.bind(this);
        this.deepClone = this.deepClone.bind(this);
        this.pickAnswer = this.pickAnswer.bind(this);
        this.showAnswer = this.showAnswer.bind(this);
        this.answers = {
            win: ['You won (a trip)!', 'Be my Valentine!', 'Will you marry me?', 'Warp One Engage!', 'Beam you up!', 'Come with me, into the ship', 'You found serenity!', 'Universe is yours', 'Fly over, fly over!', 'Permission to come on board!', 'Up we go!', 'Now you one of us'],
            lose: ['Nope', 'Loser!', 'No space trips for ya', 'Keep trying', 'You are pathetic', 'No luck, buddy', 'Don\'t ever play roulette', 'This is embarrassing', 'Lol', 'Crawling is your thing', 'You poor worm...', 'You are the worst', 'Haha!', 'Earthworm', 'Just one more time', 'Just go...', 'Are you done already?', 'You not gonna make it', 'Access denied', 'We don\'t need you', 'Boring', 'Lam\'oh']
        };
        this.state = {
            saucers: this.initSaucers(),
            playedID: null
        }
    }

    pickAnswer(key) {
        const options = this.answers[key];
        return options[Math.floor(Math.random() * options.length)];
    }

    showAnswer(key) {
        return this.pickAnswer(key);
    }

    renderSaucer(item, onClick) {
        return <SaucerShip saucer={item} onClick={onClick}/>;
    }

    initSaucers() {
        let saucers = [
            {
                win: false,
                id: 1,
                opened: false,
            }, {
                win: false,
                id: 2,
                opened: false
            }, {
                win: false,
                id: 3,
                opened: false
            }
        ];
        saucers = this.setRandom(saucers);
        saucers.forEach((value, index) => {
            value.message = this.showAnswer(value.win ? 'win' : 'lose');
        });
        return saucers;
    }

    setRandom(options) {
        const randomWinIndex = Math.floor(Math.random() * options.length);
        options.forEach((value, index) => {
            value.opened = false;
            if (index === randomWinIndex) {
                value.win = true
            } else {
                value.win = false;
            }
        });
        return options;
    }

    shuffleHard() {
        var i = 0;
        for (i = 0; i < 99; i++) {
            setTimeout(() => this.shuffle(), 500)
        }
    }

    shuffle() {
        let options = this.deepClone(this.state.saucers.slice());
        options = this.shuffleSaucers(this.setRandom(options));
        options.forEach((value, index) => {
           value.opened = false;
           value.message = this.showAnswer(value.win ? "win" : "lose");
        });
        this.setState({
            saucers: options,
            playedID: null
        });
    }

    deepClone(input) {
        return JSON.parse(JSON.stringify(input));
    }

    shuffleSaucers(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    onSaucerClick(id) {
        if (!this.state.playedID) {
            let options = this.deepClone(this.state.saucers.slice());
            options.forEach((item) => {
                if (item.id === id) {
                    item.opened = true;
                }
            });
            this.setState({
                saucers: options,
                playedID: id
            });
        } else {
            this.shuffleButton.prompt();
        }
    }

    guessedRight(playedID) {
        return this.state.saucers.find((value, index) => {
            return value.id === playedID;
        }).win;
    }

    render() {
        const resultClass = (!this.state.playedID ? "hidden " : (this.guessedRight(this.state.playedID) ? "success " : "fail"));
        const message = (!this.state.playedID) ? "" : (this.guessedRight(this.state.playedID)) ? this.showAnswer('win') : this.showAnswer('lose');
        return (
            <div className="saucer-container">
                <h1>Pick a saucer, win a trip!</h1>
                <DynamicList itemRenderer={this.renderSaucer} items={this.state.saucers} onClick={this.onSaucerClick} ref={(list) => {
                    this.saucerList = list
                }}/>
                <Message className={resultClass} message={message} />
                <Button class="btn-circle" text="Engage shuffle!" onClick={this.shuffleHard} ref={(button) => {
                    this.shuffleButton = button;
                }}/>
            </div>
        );
    }
};
