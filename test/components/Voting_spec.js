import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Voting from '../../src/components/Voting';
import {expect} from 'chai';

const { renderIntoDocument: render } = TestUtils;
const { scryRenderedDOMComponentsWithTag: scryWithTag } = TestUtils;
const { Simulate } = TestUtils;

describe('Voting', () => {

  it('renders a pair of buttons', () => {
    const component = render(
      <Voting pair={["Trainspotting", "28 Days Later"]} />
    );
    const buttons = scryWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].textContent).to.equal('Trainspotting');
    expect(buttons[1].textContent).to.equal('28 Days Later');
  });

  it('invokes callback when a button is clicked', () => {
    let votedWith;
    const vote = (entry) => votedWith = entry;

    const component = render(
      <Voting pair={["Trainspotting", "28 Days Later"]}
              vote={vote}/>
    );
    const buttons = scryWithTag(component, 'button');
    Simulate.click(buttons[0]);

    expect(votedWith).to.equal('Trainspotting');
  });

  it('disables buttons when user has voted', () => {
    const component = render(
      <Voting pair={["Trainspotting", "28 Days Later"]}
              hasVoted="Trainspotting" />
    );
    const buttons = scryWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].hasAttribute('disabled')).to.equal(true);
    expect(buttons[1].hasAttribute('disabled')).to.equal(true);
  });

  it('adds label to the voted entry', () => {
    const component = render(
      <Voting pair={["Trainspotting", "28 Days Later"]}
              hasVoted="Trainspotting" />
    );
    const buttons = scryWithTag(component, 'button');

    expect(buttons[0].textContent).to.contain('Voted');
  });

  it('renders just the winner when there is one', () => {
    const component = render(
      <Voting winner="Trainspotting" />
    );
    const buttons = scryWithTag(component, 'button');
    expect(buttons.length).to.equal(0);

    const winner = React.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('Trainspotting');
  });

  it('renders as a pure component', () => {
    const pair = ['Trainspotting', '28 Days Later'];
    const component = render(
      <Voting pair={pair} />
    );

    let firstButton = scryWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Trainspotting');

    pair[0] = 'Sunshine';
    component.setProps({pair: pair});
    firstButton = scryWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Trainspotting');
  });

});
