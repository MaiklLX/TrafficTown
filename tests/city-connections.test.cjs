const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');

const html = fs.readFileSync('index.html', 'utf8');
const match = html.match(/<script>([\s\S]*?)<\/script>/);
assert.ok(match, 'inline game script exists');
const hook = 'globalThis.__trafficTownTest = { buildings, roads, connections, cars, roadBudget: () => roadBudget, buildingPort, connectAnchors, pathfind, missionProgress, spawnCar, step, trips: () => trips };';
const close = match[1].lastIndexOf('})();');
assert.notEqual(close, -1, 'game IIFE close exists');
const gameScript = match[1].slice(0, close) + hook + match[1].slice(close);

const elements = new Map();
const makeNode = id => ({
  id, textContent: '', innerHTML: '', hidden: false, style: {}, dataset: {},
  classList: { add() {}, remove() {}, contains() { return false; } },
  addEventListener() {}, setAttribute() {},
  getBoundingClientRect() { return { left: 0, top: 0, width: 900, height: 700 }; }
});
const context2d = new Proxy({}, {
  get(target, key) { return key in target ? target[key] : () => {}; },
  set(target, key, value) { target[key] = value; return true; }
});
const canvas = makeNode('city');
canvas.getContext = () => context2d;
canvas.getBoundingClientRect = () => ({ left: 0, top: 0, width: 900, height: 700 });
const document = {
  getElementById(id) {
    if (!elements.has(id)) elements.set(id, id === 'city' ? canvas : makeNode(id));
    return elements.get(id);
  },
  querySelectorAll() { return []; }
};
const deterministicMath = Object.create(Math);
deterministicMath.random = () => 0.999;
const sandbox = {
  document, window: { addEventListener() {} }, navigator: {}, Math: deterministicMath,
  performance: { now: () => 0 }, requestAnimationFrame() {}, devicePixelRatio: 1
};
vm.runInNewContext(gameScript, sandbox);
const game = sandbox.__trafficTownTest;
assert.ok(game, 'test hooks exposed');
assert.equal(game.roads.size, 0, 'new city starts without pre-painted roads');
assert.equal(game.buildings.length, 8, 'starter city has its planned landmarks');
assert.equal(game.roadBudget(), 90, 'starter road budget is 90');

const building = name => game.buildings.find(item => item.name === name);
const connect = (from, to) => game.connectAnchors(
  { point: game.buildingPort(from), building: from, label: from.name },
  { point: game.buildingPort(to), building: to, label: to.name }
);
assert.equal(connect(building('Сосновый квартал'), building('Технопарк')), true);
assert.equal(game.missionProgress(), 1, 'the first connected residential district counts once');
assert.equal(connect(building('Сосновый квартал'), building('Мастерские')), true);
assert.equal(game.missionProgress(), 1, 'one home linked to multiple destinations still counts as one district');
assert.equal(connect(building('Старый город'), building('Мастерские')), true);
assert.equal(connect(building('Речной район'), building('Торговая улица')), true);
assert.equal(game.missionProgress(), 3, 'three useful home-to-destination links complete the mission');
assert.equal(connect(building('Сосновый квартал'), building('Технопарк')), true, 'an alternate route can be added for a connected pair');
assert.equal(game.missionProgress(), 3, 'duplicate routes do not inflate unique mission progress');
assert.ok(game.roads.size > 0 && game.roads.size < 90, 'connections consume a finite road budget');
assert.ok(game.roadBudget() > 0, 'budget remains after the starter mission');

for (const connection of game.connections) {
  assert.ok(connection.path.length > 1, 'each connection has a traversable route');
  for (const point of connection.path) {
    for (const block of game.buildings.filter(item => item.type !== 'park')) {
      const insideFootprint = point.x >= block.x && point.x < block.x + 2 && point.y >= block.y && point.y < block.y + 2;
      assert.equal(insideFootprint, false, 'roads do not cut through building footprints');
    }
  }
}
game.spawnCar();
assert.equal(game.cars.length, 1, 'a connected pair can generate a trip');
game.cars[0].index = game.cars[0].path.length - 1;
game.step(0.001);
assert.equal(game.trips(), 1, 'a trip is counted only after the vehicle reaches its destination');
for (let i = 0; i < 12; i++) game.spawnCar();
assert.ok(game.cars.length > 0, 'connected destinations generate vehicle trips');
assert.equal(game.cars.some(car => car.origin === 'Новый берег'), false, 'unconnected homes do not generate phantom trips');
game.roads.clear();
assert.equal(game.missionProgress(), 0, 'removing the road network resets live connection progress');

console.log('City connection gameplay tests: OK');
console.log('Mission connectivity reset: OK; delivered: ' + game.trips() + '; budget left: ' + game.roadBudget());
