# TrafficTown

A mobile-first, top-down city traffic puzzle and simulation for phones, tablets and desktop browsers.

## Current checkpoint — KT-006: city connection puzzle (published)

Public build: KT-006 at https://maikllx.github.io/TrafficTown/

KT-006 includes the KT-005 transit work and the new core game loop:
- The starting map no longer has a pre-painted road grid; players create the network.
- Tap a building, then a destination building or an existing road to create a complete connection.
- The route planner finds a clear grid path while avoiding building footprints and the park.
- Road construction uses a limited road-piece budget, so route length and reuse of the existing network matter.
- The first mission asks players to connect three distinct residential districts to at least one workplace or shop; alternate routes from the same home do not inflate progress.
- Mission progress is calculated from the live road network, so erasing a bridge or disconnecting a district removes its progress immediately.
- New connections are validated against one-way streets and turn restrictions before the road budget is spent; invalid routes roll back cleanly.
- Homes and destinations have replenishing trip demand. Car departures are weighted by demand and route length, and the trip counter advances only when a vehicle reaches its destination.
- The starter objective has two stages: connect three different homes, then deliver 12 trips to complete the level.
- Cars can spawn only when both the origin and destination buildings have direct access to the connected road network.
- Road rendering uses continuous rounded road segments with soft shoulders and lane markings.
- The original bus line manager, headway settings and destination-aware passenger queues are retained in the branch.

### Verification so far
- JavaScript parses successfully with a syntax check.
- Deterministic tests now cover three distinct connected homes, duplicate/alternate links, route validity under traffic rules, invalid self-links, completed trip counting, road-budget safety, and mission reset after the network is erased. The final published workflow [#42865546024](https://github.com/MaiklLX/TrafficTown/actions/runs/42865546024) passed syntax, gameplay tests, PWA checks and GitHub Pages deployment.
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

KT-006 was merged through [PR #2](https://github.com/MaiklLX/TrafficTown/pull/2) as commit `da711f0ead08775d4282afbd61fd8c778372e7f3`. GitHub Actions run #42865546024 completed both verification and deployment successfully. The published site is https://maikllx.github.io/TrafficTown/.

## Next work

1. Manually test the published touch controls, map readability, vehicle movement and bus-line setup on a phone and desktop; no physical-device/browser test is claimed yet.
2. Tune demand, vehicle spacing and congestion using the first live playtest.
3. Add level progression, new map scenarios and rewards.
4. Rework the main menu, level selection and onboarding around the puzzle-first game.
