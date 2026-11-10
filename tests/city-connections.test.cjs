const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');

const html = fs.readFileSync('index.html', 'utf8');
const match = html.match(/<script>([\s\S]*?)<\/script>/);
assert.ok(match, 'inline game script exists');
const hook = 'globalThis.__trafficTownTest = { get buildings() { return buildings; }, get roads() { return roads; }, connections, get cars() { return cars; }, roadBudget: () => roadBudget, buildingPort, connectAnchors, pathfind, missionProgress, spawnCar, step, updateUI, saveGame, loadGame, vehicleBlocks, trips: () => trips };';
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
const savedItems = new Map();
const localStorage = { getItem(key) { return savedItems.get(key) ?? null; }, setItem(key, value) { savedItems.set(key, value); } };
const sandbox = {
  document, window: { addEventListener() {} }, navigator: {}, localStorage, Math: deterministicMath,
  performance: { now: () => 0 }, requestAnimationFrame() {}, devicePixelRatio: 1
};
vm.runInNewContext(gameScript, sandbox);
const game = sandbox.__trafficTownTest;
assert.ok(game, 'test hooks exposed');
assert.equal(game.roads.size, 0, 'new city starts without pre-painted roads');
assert.equal(game.buildings.length, 8, 'starter city has its planned landmarks');
assert.equal(game.roadBudget(), 90, 'starter road budget is 90');
const carAhead = { x: 2.55, y: 2, path: [{ x: 2.55, y: 2 }, { x: 3.55, y: 2 }], index: 0 };
const carBehind = { x: 1.4, y: 2, path: [{ x: 1.4, y: 2 }, { x: 2.4, y: 2 }], index: 0 };
const carCrossing = { x: 2.5, y: 2.5, path: [{ x: 2.5, y: 2.5 }, { x: 2.5, y: 1.5 }], index: 0 };
const carOpposite = { x: 2.5, y: 2, path: [{ x: 2.5, y: 2 }, { x: 1.5, y: 2 }], index: 0 };
const movingCar = { x: 2, y: 2, path: [{ x: 2, y: 2 }, { x: 3, y: 2 }], index: 0 };
assert.equal(game.vehicleBlocks(movingCar, carAhead), true, 'a vehicle ahead in the same lane causes a safe following gap');
assert.equal(game.vehicleBlocks(movingCar, carBehind), false, 'a vehicle behind does not create a false traffic jam');
assert.equal(game.vehicleBlocks(movingCar, carCrossing), false, 'a vehicle on a crossing direction does not block this lane');
assert.equal(game.vehicleBlocks(movingCar, carOpposite), false, 'an oncoming vehicle does not cause a permanent mutual standstill');
const firstHome = game.buildings.find(item => item.type === 'home');
const demandAtStart = firstHome.demand;
game.step(0.5);
assert.ok(firstHome.demand > demandAtStart, 'residential demand grows over simulation time');

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
const budgetBeforeInvalid = game.roadBudget();
assert.equal(connect(building('Сосновый квартал'), building('Сосновый квартал')), false, 'a building cannot connect to itself');
assert.equal(game.roadBudget(), budgetBeforeInvalid, 'an invalid connection does not consume road budget');
assert.ok(game.roads.size > 0 && game.roads.size < 90, 'connections consume a finite road budget');
assert.ok(game.roadBudget() > 0, 'budget remains after the starter mission');

for (const connection of game.connections) {
  assert.ok(connection.path.length > 1, 'each connection has a traversable route');
  if (connection.fromBuilding && connection.toBuilding) {
    assert.ok(game.pathfind(game.buildingPort(building(connection.fromBuilding)), game.buildingPort(building(connection.toBuilding))), 'each built connection remains valid under live traffic rules');
  }
  for (const point of connection.path) {
    for (const block of game.buildings.filter(item => item.type !== 'park')) {
      const insideFootprint = point.x >= block.x && point.x < block.x + 2 && point.y >= block.y && point.y < block.y + 2;
      assert.equal(insideFootprint, false, 'roads do not cut through building footprints');
    }
  }
}
const savedRoadCount = game.roads.size;
const savedBudget = game.roadBudget();
assert.equal(game.saveGame(), true, 'city state saves to local storage');
game.roads.clear();
assert.equal(game.loadGame(), true, 'saved city state can be restored');
assert.equal(game.roads.size, savedRoadCount, 'road network is restored after reload');
assert.equal(game.roadBudget(), savedBudget, 'remaining road budget is restored after reload');
game.spawnCar();
assert.equal(game.cars.length, 1, 'a connected pair can generate a trip');
game.cars[0].index = game.cars[0].path.length - 1;
game.step(0.001);
assert.equal(game.trips(), 1, 'a trip is counted only after the vehicle reaches its destination');
for (let i = 0; i < 12; i++) game.spawnCar();
assert.ok(game.cars.length > 0, 'connected destinations generate vehicle trips');
assert.equal(game.cars.some(car => car.origin === 'Новый берег'), false, 'unconnected homes do not generate phantom trips');
game.cars[0].wait = 4;
game.cars[0].blocked = true;
game.updateUI();
assert.equal(elements.get('avgDelay').textContent, '4.0 сек', 'the live average delay reflects actual vehicle waiting time');
assert.ok(Number.parseInt(elements.get('loadBar').style.width, 10) > 0, 'traffic pressure updates the congestion meter');
game.roads.clear();
assert.equal(game.missionProgress(), 0, 'removing the road network resets live connection progress');

console.log('City connection gameplay tests: OK');
console.log('Mission connectivity reset: OK; delivered: ' + game.trips() + '; budget left: ' + game.roadBudget());
