import React, { Component } from "react";

const CardButton = props => {
  return (
    <div className="card-icon-item">
      <a
        href="#"
        onClick={props.changeCard.bind(this, props.name)}
        className={props.name === props.currentCard ? "active" : ""}
      >
        <div className="card-button-mask">
          <div className="card-button-background">
            <div className="card-button">
              {props.name}
            </div>
          </div>
        </div>
        <div className={`card-icon-color ${props.className}`} />
        <img
          role="presentation"
          className="card-icon"
          src={require(`./icons/${props.component}.svg`)}
          draggable="false"
        />
        <div className="card-icon-background" />
      </a>
    </div>
  );
};

class CardSwitcher extends Component {
  render() {
    return (
      <div
        className={`card-icon-container ${this.props.clientObj.offlineState
          ? "offline"
          : ""} ${this.props.clientObj.loginState}`}
      >
        {this.props.cards.map((card, index) => {
          return (
            <CardButton
              key={index}
              cardNum={index}
              name={card.name}
              component={card.component}
              {...this.props}
            />
          );
        })}
      </div>
    );
  }
}

export default CardSwitcher;
