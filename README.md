# TrafficTown

A mobile-first, top-down city traffic puzzle and simulation for phones, tablets and desktop browsers.

## Current checkpoint — KT-006: meaningful city connections (in progress)

Development branch: `feat/traffic-town-kt-006-city-connections`

The public GitHub Pages build is still KT-004. The feature branch includes the KT-005 transit work and begins the new core game loop:
- The starting map no longer has a pre-painted road grid; players create the network.
- Tap a building, then a destination building or an existing road to create a complete connection.
- The route planner finds a clear grid path while avoiding building footprints and the park.
- Road construction uses a limited road-piece budget, so route length and reuse of the existing network matter.
- The first mission asks players to connect three distinct residential districts to at least one workplace or shop; alternate routes from the same home do not inflate progress.
- Mission progress is calculated from the live road network, so erasing a bridge or disconnecting a district removes its progress immediately.
- New connections are validated against one-way streets and turn restrictions before the road budget is spent; invalid routes roll back cleanly.
- Homes and destinations have replenishing trip demand, shown as small meters above each building. Car departures are weighted by demand and route length, and the trip counter advances only when a vehicle reaches its destination.
- Live blocked vehicles create amber/red road hotspots. Congestion now combines traffic density with measured waiting delay; the city panel reports average delay.
- City state is automatically saved locally every three seconds and on page exit, including roads, remaining budget, demand, cars, bus routes, stops, traffic controls, and mission progress. The PWA cache key is now `traffictown-shell-v5`.
- The starter objective has two stages: connect three different homes, then deliver 12 trips to complete the level.
- Cars can spawn only when both the origin and destination buildings have direct access to the connected road network.
- Road rendering is moving from isolated square tiles to a continuous rounded road surface with soft shoulders and lane markings.
- The original bus line manager, headway settings and destination-aware passenger queues are retained in the branch.

### Verification so far
- JavaScript parses successfully with a syntax check.
- Deterministic tests now cover three distinct connected homes, duplicate/alternate links, route validity under traffic rules, invalid self-links, completed trip counting, road-budget safety, and mission reset after the network is erased. The latest successful run, including save/restore coverage, is [GitHub Actions #42868280577](https://github.com/MaiklLX/TrafficTown/actions/runs/42868280577).
- This is a code-level logic check, not a claim of manual browser or physical-device testing.

## Product direction

- Strict top-down 2D; no isometric or 3D view.
- Mobile-first controls inspired by the clarity and immediacy of Mini Motorways, with original TrafficTown identity and mechanics.
- Roads should connect meaningful city objects, not be painted as arbitrary isolated squares.
- Homes generate trips to workplaces and shops; destinations and city growth create evolving demand.
- Good network design distributes traffic; poor connections create queues, delays and bottlenecks.
- Follow individual vehicles and inspect their routes, waits and congestion.
- Public transport should complement the road network and reduce private-car demand.
- Scenarios, progression, new road types, city events and save/load will be developed after the core connection loop is reliable.

## Publication

GitHub Pages is deployed from `main` after a successful GitHub Actions verification and deploy. The currently published build remains KT-004. KT-005 and KT-006 are feature-branch work and will be published after interaction, mobile layout and CI checks are complete.

## Next work

1. Finish and verify the building-to-building connection loop on phone-sized and desktop layouts.
2. Make demand, traffic flow and congestion respond visibly to network quality.
3. Add scenario progression, goals, rewards and new map situations.
4. Rework the main menu, level selection and onboarding around the new puzzle-first game.
