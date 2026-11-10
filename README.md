# TrafficTown

A top-down, living-city traffic simulation for mobile and desktop browsers.

## Current checkpoint — KT-005: transit dispatch and passenger flow

Development branch: `feat/traffic-town-kt-005-transit`

The public Pages build currently contains KT-004. KT-005 development adds:
- A mobile-accessible transit control panel opened from the map.
- Per-line status: active buses, onboard passengers and waiting passengers.
- Adjustable departure headways (8–40 simulation seconds).
- Multiple buses per line, dispatched when the route origin has safe spacing.
- Passenger queues with destination stop indices; buses board passengers for their selected line and unload them at their requested stop.
- Private-car congestion metrics separated from bus vehicle counts.
- A responsive transit panel that remains usable on narrow phone screens.

This remains an early simulation. Passenger demand is generated synthetically at active stops; realistic population-based trip choice, dwell-time calibration, timetable reliability, transfers, line editing/deletion and save/load are not complete.

## Publication

GitHub Pages is deployed from `main` after a successful GitHub Actions verification job. The currently published build is KT-004. KT-005 is being developed separately and will be published after its checks and review.

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
