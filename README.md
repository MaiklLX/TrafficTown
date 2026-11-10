# TrafficTown

A top-down, living-city traffic simulation for mobile and desktop browsers.

## Current checkpoint — KT-003: intersections and traffic control

Branch: `feat/traffic-town-foundation-001`

The playable browser prototype currently includes:
- Responsive 2D canvas city view, designed mobile-first.
- Starter city with residential, work, retail and park districts.
- Autonomous car trips on a connected road grid.
- Road drawing, widening, removal and functional one-way directions.
- Route finding that respects one-way streets and individual prohibited turns.
- Intersection editor: toggle specific movements on or off; affected vehicle routes are recalculated.
- Configurable traffic signals: choose the active green-flow axis and adjust alternating phase duration.
- Vehicle selection with its route and accumulated delay.
- Pause/speed controls, traffic indicators and autonomous population growth.
- Installable PWA shell with offline caching of the app shell.

## Current limitations

This is an early playable foundation, not the full simulation. Lane-level routing, realistic multi-lane intersections, adaptive signal timing, operational buses and passenger demand, rail/metro, bridges/tunnels, save/load and a full mobile usability pass are still future work. The current bus tool is only a placeholder and does not run vehicles.

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
