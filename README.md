# TrafficTown

A top-down, living-city traffic simulation for mobile and desktop browsers.

## Current checkpoint — KT-004: operational bus routes

Branch: `feat/traffic-town-foundation-001`

The playable prototype now includes the KT-003 road and intersection controls plus an initial operational bus layer:
- Select the bus tool and tap existing road cells in order to place stops.
- A line can be launched after at least two stops have been selected.
- Each stop-to-stop segment is validated through the same route finder used by cars, respecting one-way streets and prohibited turns.
- Launched buses move along the route, reverse at the end and continue circulating.
- Buses dwell at stops, board waiting passengers and let passengers off.
- Passenger queues accumulate at active line stops; route geometry and numbered stops are drawn on the city map.
- Bus vehicles are selectable like other vehicles; private-car congestion metrics exclude buses.

This is a first playable transit loop, not a finished transit simulation. Passenger generation and boarding are currently simplified; timetable headways, destination-based passenger journeys, transfers, line editing/deletion and service reliability remain future work.

## Development and release safety

The GitHub Actions workflow checks inline JavaScript syntax and required PWA files on feature branches. GitHub Pages deployment is intentionally restricted to `main`. Development remains on `feat/traffic-town-foundation-001`; no public release or merge to `main` is authorized.

## Product direction

- Strict top-down 2D; no isometric or 3D view.
- The player designs and improves the road network.
- Residents, workplaces and travel demand evolve autonomously.
- Follow individual vehicles and inspect their routes, waits and bottlenecks.
- Public transport should reduce private-car demand.
- Browser-first responsive experience for Android, iOS and desktop.

## Next milestones

1. KT-004 — real bus routes, stops, schedules and passenger demand.
2. KT-005 — bridges, elevated roads, tunnels and grade-separated crossings.
3. KT-006 — rail and metro lines, stations and mode choice.
4. KT-007 — richer city growth, scenarios, save/load and mobile usability pass.
