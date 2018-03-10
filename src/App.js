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
            <FlipMove duration={350} easing="ease-out">
                {this.props.items.map((item) => {
                    return this.generateItem(item)
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
            <div className="timble-result"><p
                className={"result " + (this.props.item.opened ? "" : "hidden")}>{this.props.item.win ? "You win!" : "Nope!"}</p>
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
        this.state = {
            thimbles: this.initThimbles()
        }
    }

    initThimbles() {
        let thimbles = [
            {
                win: false,
                id: 1, class: 'red',
                opened: false
            }, {
                win: false,
                id: 2,
                class: "green",
                opened: false
            }, {
                win: false,
                id: 3, class: "blue",
                opened: false
            }
        ];
        return this.setRandom(thimbles)
    }

    setRandom(options) {
        const randomWinIndex = Math.floor(Math.random() * options.length);
        options.forEach((value, index) => {
            value.opened = false;
            value.clicked = false;
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
        for (i = 0; i < 100; i++) {
            setTimeout(() => this.shuffle(), 500)
        }
    }

    shuffle() {
        let options = this.state.thimbles.slice();
        options = this.shuffleThimbles(this.setRandom(options));
        this.setState({
            thimbles: options
        });
    }

    shuffleThimbles(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    onThimbleClick(id) {
        let options = this.state.thimbles.slice();
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
                <List items={this.state.thimbles} onClick={this.onThimbleClick}/>
                <Button class="btn-circle" text="Engage shuffle!" onClick={this.shuffleHard} ref={(button) => {
                    this.shuffleButton = button;
                }}/>
            </div>
        );
    }
}

export default App;
