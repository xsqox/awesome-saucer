import React, {Component} from 'react';
import './App.css';
import FlipMove from 'react-flip-move';

class Beam extends Component {
    render() {
        return <div ref={(beam) => {this.beam = beam}} className={this.props.class}></div>
    }
}
Beam.defaultProps = {
    class: 'beam hidden'
}

class Button extends Component {
    render() {
        return <button ref={(button) => {this.button = button}} className={this.props.class} onClick={this.props.onClick}>{this.props.text}</button>
    }

    prompt() {
        this.button.classList.add('prompting');
        setTimeout(() => {this.button.classList.remove('prompting')}, 2000);
    }
}
Button.defaultProps = {
    class: 'btn-circle',
    text: 'Press me'
};

class Textspan extends Component {

    render() {
        return(
            <div className={"textspan " + this.props.className}><p>{this.props.message}</p>
            </div>
        )
    }

}

class List extends Component {

    generateItem(item, index) {
        console.log(index);
        let beamDirection = 'center';
        if (index === 0) {
            beamDirection = 'right';
        } else if (index===3) {
            beamDirection = 'left';
        } else {
            beamDirection = 'center'
        }
        return (
            <li key={item.id}>
                <Thimble key={item.id} item={item} onClick={this.props.onClick}/>
                <Beam className={beamDirection + " " + this.props.beamVisibility }  />
            </li>)
    }

    render() {
        return (<ul>
            <FlipMove duration={150} easing="ease-out">
                {this.props.items.map((item, index) => {
                    return this.generateItem(item, index)
                })}
            </FlipMove>
        </ul>)
    }
}


class Thimble extends Component {
    render() {
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
            win: ['You won (a trip)!', 'Be my Valentine!', 'Will you marry me?', 'Warp One Engage!', 'Beam you up!', 'Come with me, into the ship', 'You found serenity!', 'Universe is yours', 'Fly over, fly over!', 'Permission to come on board!', 'Up we go!', 'Now you one of us'],
            lose: ['Nope', 'Loser!', 'No space trips for ya', 'Keep trying', 'You are pathetic', 'No luck, buddy', 'Don\'t ever play roulette', 'This is embarrassing', 'Lol', 'Crawling is your thing', 'You poor worm...', 'You are the worst', 'Haha!', 'Earthworm', 'Just one more time', 'Just go...', 'Are you done already?', 'You not gonna make it', 'Access denied', 'We don\'t need you', 'Boring', 'Lam\'oh']
        };
        this.state = {
            thimbles: this.initThimbles(),
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
            thimbles: options,
            playedID: null
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
        if (!this.state.playedID) {
            let options = this.deepClone(this.state.thimbles.slice());
            options.forEach((item) => {
                if (item.id === id) {
                    item.opened = true;
                }
            });
            this.setState({
                thimbles: options,
                playedID: id
            });
        } else {
            this.shuffleButton.prompt();
        }
    }

    guessedRight(playedID) {
        return this.state.thimbles.find((value, index) => {
            return value.id === playedID;
        }).win;
    }

    render() {
        const resultClass = (!this.state.playedID ? "hidden " : (this.guessedRight(this.state.playedID) ? "success " : "fail"));
        const message = (!this.state.playedID) ? "" : (this.guessedRight(this.state.playedID)) ? this.showAnswer('win') : this.showAnswer('lose');
        const beamVisibility = (!this.state.playedID || !this.guessedRight(this.state.playedID))? "hidden " : "";
        return (
            <div className="thimble-container">
                <h1>Pick a saucer, win a trip!</h1>
                <List items={this.state.thimbles} onClick={this.onThimbleClick} beamVisibility={beamVisibility} ref={(list) => {
                    this.thimbleList = list
                }}/>
                <Textspan className={resultClass} message={message} />
                <Button class="btn-circle" text="Engage shuffle!" onClick={this.shuffleHard} ref={(button) => {
                    this.shuffleButton = button;
                }}/>
            </div>
        );
    }
}

export default App;
