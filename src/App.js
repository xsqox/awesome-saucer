import React, {Component} from 'react';
import DynamicList from './List/List';
import SaucerShip from './Saucer/saucer';
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
                    opened: false
                }, {

                    id: 3,
                    opened: false
                }
            ],
            playedID: null,
            winID: this.setRandom(3),
        };
        this.answers = {
            win: ['You won (a trip)!', 'Be my Valentine!', 'Will you marry me?', 'Warp One Engage!', 'Beam you up!', 'Come with me, into the ship', 'You found serenity!', 'Universe is yours', 'Fly over, fly over!', 'Permission to come on board!', 'Up we go!', 'Now you one of us'],
            lose: ['Nope', 'Loser!', 'No space trips for ya', 'Keep trying', 'You are pathetic', 'No luck, buddy', 'Don\'t ever play roulette', 'This is embarrassing', 'Lol', 'Crawling is your thing', 'You poor worm...', 'You are the worst', 'Haha!', 'Earthworm', 'Just one more time', 'Just go...', 'Are you done already?', 'You not gonna make it', 'Access denied', 'We don\'t need you', 'Boring', 'Lam\'oh']
        };
        this.onSaucerClick = this.onSaucerClick.bind(this);
        this.renderSaucer = this.renderSaucer.bind(this);
        this.pickAnswer = this.pickAnswer.bind(this);
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

    setRandom(length) {
        return Math.floor(Math.random() * length);
    }

    shuffleHard() {
        for (let i = 0; i < 99; i++) {
            setTimeout(() => this.shuffle(), 500)
        }
    }

    shuffle() {
        let options = this.state.saucers.slice();
        options = this.shuffleSaucers(options);
        this.setState({
            saucers: options,
            playedID: null,
            winID: this.setRandom(options.length)
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
            this.setState({
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
        return playedID === this.state.winID;
    }
};
