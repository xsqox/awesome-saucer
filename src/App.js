import React, {Component} from 'react';
import './App.css';
import FlipMove from 'react-flip-move';

class Button extends Component {
    render() {
        return <button className={this.props.class} onClick={this.props.onClick}>{this.props.text}</button>
    }
}

class List extends Component {

    generateItem(item) {
        return (
            <li key={item.id}>
                <Thimble key={item.id} item={item} onClick={this.props.onClick}/>
            </li>)
    }

    render() {
        return (<ul>
            <FlipMove duration={150} easing="ease-out">
                {this.props.items.map((item) => {
                    return this.generateItem(item)
                })}
            </FlipMove>
        </ul>)
    }
}


class Thimble extends Component {
    render() {
        const resultClass = "result " + (this.props.item.opened ? " " : "hidden ") + (this.props.item.win ? "won" : "");
        return <div className="thimble">
            <div className={"thimble-handle " + this.props.item.class}
                 onClick={() => this.props.onClick(this.props.item.id)}>
                <div className="saucer-head"></div>
                <div className="saucer-body"></div>
                <div className="saucer-windows">
                    <span className="flash odd"></span>
                    <span className="flash even"></span>
                    <span className="flash odd"></span>
                    <span className="flash even"></span>
                    <span className="flash odd"></span>
                </div>
            </div>
            <div className="timble-result"><p
                className={resultClass}>{this.props.item.message}</p>
            </div>
        </div>
    }
}

class App extends Component {
    constructor() {
        super();
        this.shuffle = this.shuffle.bind(this);
        this.shuffleHard = this.shuffleHard.bind(this);
        this.onThimbleClick = this.onThimbleClick.bind(this);
        this.shuffleThimbles = this.shuffleThimbles.bind(this);
        this.initThimbles = this.initThimbles.bind(this);
        this.setRandom = this.setRandom.bind(this);
        this.deepClone = this.deepClone.bind(this);
        this.pickAnswer = this.pickAnswer.bind(this);
        this.showAnswer = this.showAnswer.bind(this);
        this.answers = {
            win: ['You won (a trip to Pluto)!', 'Be my Valentine!', 'Will you marry me?', 'Warp One Engage!', 'Beam you up!'],
            lose: ['Nope', 'Loser!', 'Keep trying', 'No luck, buddy', 'Don\'t ever play lottery', 'Embarrassing', 'Lol']
        };
        this.state = {
            thimbles: this.initThimbles()
        }
    }

    pickAnswer(key) {
        const options = this.answers[key];
        return options[Math.floor(Math.random() * options.length)];
    }

    showAnswer(key) {
        return this.pickAnswer(key);
    }

    initThimbles() {
        let thimbles = [
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
        thimbles = this.setRandom(thimbles);
        thimbles.forEach((value, index) => {
            value.message = this.showAnswer(value.win ? 'win' : 'lose');
        });
        return thimbles;
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
        for (i = 0; i < 250; i++) {
            setTimeout(() => this.shuffle(), 500)
        }
    }

    shuffle() {
        let options = this.deepClone(this.state.thimbles.slice());
        options = this.shuffleThimbles(this.setRandom(options));
        options.forEach((value, index) => {
           value.opened = false;
           value.message = this.showAnswer(value.win ? "win" : "lose");
        });
        this.setState({
            thimbles: options
        });
    }

    deepClone(input) {
        return JSON.parse(JSON.stringify(input));
    }

    shuffleThimbles(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    onThimbleClick(id) {
        let options = this.deepClone(this.state.thimbles.slice());
        options.forEach((item) => {
            if (item.id === id) {
                item.opened = true;
            }
        });
        this.setState({
            thimbles: options
        });
    }

    render() {
        return (
            <div className="thimble-container">
                <h1>Pick a saucer, try your luck!</h1>
                <List items={this.state.thimbles} onClick={this.onThimbleClick} ref={(list) => {
                    this.thimbleList = list
                }}/>
                <Button class="btn-circle" text="Engage shuffle!" onClick={this.shuffleHard} ref={(button) => {
                    this.shuffleButton = button;
                }}/>
            </div>
        );
    }
}

export default App;
