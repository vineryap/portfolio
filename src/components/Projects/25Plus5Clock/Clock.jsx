import { Component } from "react";

const initialStates = {
  minutes: 25,
  seconds: 0,
  countdown: 0,
  breakLength: 5,
  sessionLength: 25,
  timerStart: false,
  isBreak: false
};
let audio;

export default class Clock extends Component {
  state = {
    minutes: 25,
    seconds: 0,
    countdown: 0,
    breakLength: 5,
    sessionLength: 25,
    timerStart: false,
    isBreak: false
  };

  componentDidMount() {
    audio = document.getElementById("beep");
    this.setState({ ...initialStates });
  }

  componentWillUnmount() {
    clearInterval(this.state.countdown);
  }

  handleStart = () => {
    const countdown = setInterval(() => {
      this.setState(states => {
        if (states.seconds === 0) {
          if (states.minutes === 0) {
            audio.play();
            return {
              minutes: states.isBreak ? states.sessionLength : states.breakLength,
              seconds: 0,
              isBreak: !states.isBreak
            };
          }
          return {
            minutes: states.minutes - 1,
            seconds: 59
          };
        }

        return {
          seconds: states.seconds - 1
        };
      });
    }, 1000);

    this.setState({ countdown });
  };

  handleStop = () => {
    if (!audio.paused) {
      audio.pause();
      audio.currentTime = 0;
    }

    clearInterval(this.state.countdown);
  };

  handleBreak = action => {
    switch (action) {
      case "increment":
        if (this.state.breakLength === 60) return;
        this.setState({ breakLength: this.state.breakLength + 1 });
        break;
      case "decrement":
        if (this.state.breakLength <= 1) return;
        this.setState({ breakLength: this.state.breakLength - 1 });
        break;
    }
  };

  handleSession = action => {
    switch (action) {
      case "increment":
        this.setState(states => {
          if (this.state.sessionLength === 60) return;
          const increment = states.sessionLength + 1;
          return {
            sessionLength: increment,
            minutes: increment,
            seconds: 0
          };
        });
        break;
      case "decrement":
        if (this.state.sessionLength <= 1) return;
        this.setState(states => {
          const decrement = states.sessionLength - 1;
          return {
            sessionLength: decrement,
            minutes: decrement,
            seconds: 0
          };
        });
        break;
    }
  };

  handleTimer = action => {
    switch (action) {
      case "start_stop":
        this.setState({ timerStart: !this.state.timerStart });

        if (this.state.timerStart) {
          this.handleStop();
        } else {
          this.handleStart();
        }
        break;
      case "reset":
        this.handleStop();
        this.setState({ ...initialStates });
        break;
    }
  };

  breakControlHandler = action => {
    if (this.state.timerStart) return;
    this.handleBreak(action);
  };
  sessionControlHandler = action => {
    if (this.state.timerStart) return;
    this.handleSession(action);
  };

  timerControlHandler = action => {
    this.handleTimer(action);
  };

  render() {
    const { minutes, seconds, breakLength, sessionLength, timerStart, isBreak } = this.state;

    return (
      <div className="py-10 overflow-hidden">
        <div className="flex flex-col text-center mb-20">
          <label
            id="timer-label"
            className={`w-full mb-6 ${
              isBreak ? "text-secondary-focus" : "text-neutral"
            } text-xl tracking-wider capitalize font-semibold`}
            htmlFor="time-left"
          >
            {isBreak ? "Break" : "Session"}
          </label>
          <span
            id="time-left"
            className={`px-10 py-4 mx-auto font-mono text-6xl md:text-9xl ${
              isBreak ? "bg-secondary text-white" : "bg-base-200 text-neutral"
            } rounded-md transition-all shadow-lg cursor-default`}
          >
            {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
          </span>
        </div>
        <div className="flex flex-col md:flex-row w-full items-center place-content-center mx-auto">
          <BreakControl
            onChangeHandler={this.breakControlHandler}
            breakLength={breakLength}
            timerStart={timerStart}
          />
          <TimerControl onChangeHandler={this.timerControlHandler} timerStart={timerStart} />
          <SessionControl
            onChangeHandler={this.sessionControlHandler}
            sessionLength={sessionLength}
            timerStart={timerStart}
          />
        </div>
      </div>
    );
  }
}

class BreakControl extends Component {
  handleClick = dispatchAction => {
    this.props.onChangeHandler(dispatchAction);
  };

  render() {
    const { breakLength, timerStart } = this.props;
    return (
      <div className="order-3 flex flex-col items-center text-center justify-around">
        <label
          id="break-label"
          className="w-full mb-6 text-base text-neutral tracking-wider capitalize font-semibold"
          htmlFor="break-length"
        >
          Break Length
        </label>
        <div className="flex flex-row items-center text-center auto-cols-max">
          <button
            onClick={() => this.handleClick("decrement")}
            id="break-decrement"
            className="kbd bg-base-100 hover:bg-base-content hover:bg-opacity-10 focus:bg-base-200 border-base-300 transition-all h-12 md:h-16 w-full"
            disabled={timerStart}
          >
            ▼
          </button>
          <div className="flex flex-col p-3 mx-5 md:p-2 bg-base-200 rounded-box text-neutral text-sm md:text-base text-center items-center shadow-lg">
            <span className="font-mono text-4xl md:text-6xl countdown">
              <span id="break-length" style={{ "--value": breakLength }}>
                {breakLength}
              </span>
            </span>
            mins
          </div>
          <button
            onClick={() => this.handleClick("increment")}
            id="break-increment"
            className="kbd bg-base-100 hover:bg-base-content hover:bg-opacity-10 focus:bg-base-200 border-base-300 transition-all h-12 md:h-16 w-full"
            disabled={timerStart}
          >
            ▲
          </button>
        </div>
      </div>
    );
  }
}

class SessionControl extends Component {
  handleClick = dispatchAction => {
    this.props.onChangeHandler(dispatchAction);
  };

  render() {
    const { sessionLength, timerStart } = this.props;
    return (
      <div className="order-2 md:order-1 flex flex-col items-center text-center justify-around my-10 md:my-0">
        <label
          id="session-label"
          className="w-full mb-6 text-base text-neutral tracking-wider capitalize font-semibold"
          htmlFor="session-length"
        >
          Session Length
        </label>
        <div className="flex flex-row items-center text-center auto-cols-max">
          <button
            onClick={() => this.handleClick("decrement")}
            id="session-decrement"
            className="kbd bg-base-100 hover:bg-base-content hover:bg-opacity-10 focus:bg-base-200 border-base-300 transition-all h-12 md:h-16 w-full"
            disabled={timerStart}
          >
            ▼
          </button>
          <div className="flex flex-col p-3 mx-5 md:p-2 bg-base-200 rounded-box text-neutral text-sm md:text-base text-center items-center shadow-lg">
            <span className="font-mono text-4xl md:text-6xl countdown">
              <span id="session-length" style={{ "--value": sessionLength }}>
                {sessionLength}
              </span>
            </span>
            mins
          </div>
          <button
            onClick={() => this.handleClick("increment")}
            id="session-increment"
            className="kbd bg-base-100 hover:bg-base-content hover:bg-opacity-10 focus:bg-base-200 border-base-300 transition-all h-12 md:h-16 w-full"
            disabled={timerStart}
          >
            ▲
          </button>
        </div>
      </div>
    );
  }
}

class TimerControl extends Component {
  handleClick = actionName => {
    this.props.onChangeHandler(actionName);
  };

  render() {
    return (
      <div className="order-1 md:order-2 md:mx-10 lg:mx-20">
        <ul className="menu justify-evenly shadow-lg bg-base-100 border-base-300 border border-b-2 rounded-box horizontal">
          <li className="w-full flex">
            <a
              id="start_stop"
              className="w-full flex group"
              onClick={() => this.handleClick("start_stop")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                className="iconify iconify--ion text-neutral group-hover:text-neutral-focus select-none"
                width="32"
                height="32"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 512 512"
              >
                <path
                  d="M133 440a35.37 35.37 0 0 1-17.5-4.67c-12-6.8-19.46-20-19.46-34.33V111c0-14.37 7.46-27.53 19.46-34.33a35.13 35.13 0 0 1 35.77.45l247.85 148.36a36 36 0 0 1 0 61l-247.89 148.4A35.5 35.5 0 0 1 133 440z"
                  fill="currentColor"
                ></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                className="iconify iconify--ion text-neutral group-hover:text-neutral-focus select-none"
                width="32"
                height="32"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 512 512"
              >
                <path
                  d="M208 432h-48a16 16 0 0 1-16-16V96a16 16 0 0 1 16-16h48a16 16 0 0 1 16 16v320a16 16 0 0 1-16 16z"
                  fill="currentColor"
                ></path>
                <path
                  d="M352 432h-48a16 16 0 0 1-16-16V96a16 16 0 0 1 16-16h48a16 16 0 0 1 16 16v320a16 16 0 0 1-16 16z"
                  fill="currentColor"
                ></path>
              </svg>
            </a>
          </li>
          <li data-tip="Reset" className="">
            <a id="reset" className="w-full flex group" onClick={() => this.handleClick("reset")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                className="iconify iconify--ion text-neutral group-hover:text-neutral-focus select-none"
                width="32"
                height="32"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 512 512"
              >
                <path
                  d="M256 48C141.12 48 48 141.12 48 256s93.12 208 208 208s208-93.12 208-208S370.88 48 256 48zm-82.33 114.34l105 71a32.5 32.5 0 0 1-37.25 53.26a33.21 33.21 0 0 1-8-8l-71-105a8.13 8.13 0 0 1 11.32-11.32zM256 432c-97 0-176-78.95-176-176a174.55 174.55 0 0 1 53.87-126.72a14.15 14.15 0 1 1 19.64 20.37A146.53 146.53 0 0 0 108.3 256c0 81.44 66.26 147.7 147.7 147.7S403.7 337.44 403.7 256c0-76.67-58.72-139.88-133.55-147v55a14.15 14.15 0 1 1-28.3 0V94.15A14.15 14.15 0 0 1 256 80c97.05 0 176 79 176 176s-78.95 176-176 176z"
                  fill="currentColor"
                ></path>
              </svg>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}
