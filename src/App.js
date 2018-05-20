import React, {Component} from 'react';
import DynamicList from './List/List';
import SaucerShip from './Saucer/saucer';
import Message from './Message/message';

import './App.css';

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
        this.pickAnswer = this.pickAnswer.bind(this);
        this.answers = {
            win: ['You won (a trip)!', 'Be my Valentine!', 'Will you marry me?', 'Warp One Engage!', 'Beam you up!', 'Come with me, into the ship', 'You found serenity!', 'Universe is yours', 'Fly over, fly over!', 'Permission to come on board!', 'Up we go!', 'Now you one of us'],
            lose: ['Nope', 'Loser!', 'No space trips for ya', 'Keep trying', 'You are pathetic', 'No luck, buddy', 'Don\'t ever play roulette', 'This is embarrassing', 'Lol', 'Crawling is your thing', 'You poor worm...', 'You are the worst', 'Haha!', 'Earthworm', 'Just one more time', 'Just go...', 'Are you done already?', 'You not gonna make it', 'Access denied', 'We don\'t need you', 'Boring', 'Lam\'oh']
        };
        this.state = {
            saucers: this.initSaucers(),
            playedID: null
        }
    }

    componentDidMount() {
        this.shuffleHard();
    }

    render() {
        const resultClass = (!this.state.playedID ? "hidden " : (this.guessedRight(this.state.playedID) ? "success " : "fail"));
        const message = (!this.state.playedID) ? "" : (this.guessedRight(this.state.playedID)) ? this.pickAnswer('win') : this.pickAnswer('lose');
        return (
            <div className="saucer-container">
                <h1>Pick a saucer, win a trip!</h1>
                <DynamicList itemRenderer={this.renderSaucer} items={this.state.saucers} onClick={this.onSaucerClick} />
                <Message className={resultClass} message={message} />
            </div>
        );
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
            value.message = this.pickAnswer(value.win ? 'win' : 'lose');
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
        let options = this.state.saucers.slice();
        options = this.shuffleSaucers(this.setRandom(options));
        options.forEach((value, index) => {
           value.opened = false;
           value.message = this.pickAnswer(value.win ? "win" : "lose");
        });
        this.setState({
            saucers: options,
            playedID: null
        });
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
            let options = this.state.saucers.slice();
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
            this.shuffleHard();
        }
    }

    pickAnswer(key) {
        const options = this.answers[key];
        return options[Math.floor(Math.random() * options.length)];
    }

    guessedRight(playedID) {
        return this.state.saucers.find((value) => {
            return value.id === playedID;
        }).win;
    }
};
