import App from '../../app';
import { pubsub } from '../helpers/subscriptionManager.js';

App.on('reactorEject', ({id, tf = true}) => {
  const system = App.systems.find((sys) => sys.id === id);
  system.eject(tf);
  pubsub.publish('reactorUpdate', App.systems.filter(s => s.type === 'Reactor'));
})
App.on('reactorChangeOutput', ({id, output}) => {
  const system = App.systems.find((sys) => sys.id === id);
  system.changeOutput(output);
  pubsub.publish('reactorUpdate', App.systems.filter(s => s.type === 'Reactor'));
})
App.on('reactorChangeEfficiency', ({id, efficiency}) => {
  const system = App.systems.find((sys) => sys.id === id);
  system.changeEfficiency(efficiency)
  pubsub.publish('reactorUpdate', App.systems.filter(s => s.type === 'Reactor'));
})
App.on('reactorBatteryChargeLevel', ({id, level}) => {
  const system = App.systems.find((sys) => sys.id === id);
  system.changeBatteryChargeLevel(level)
  pubsub.publish('reactorUpdate', App.systems.filter(s => s.type === 'Reactor'));
})
App.on('reactorBatteryChargeRate', ({id, rate}) => {
  const system = App.systems.find((sys) => sys.id === id);
  system.changeBatteryChargeRate(rate);
  pubsub.publish('reactorUpdate', App.systems.filter(s => s.type === 'Reactor'));
})