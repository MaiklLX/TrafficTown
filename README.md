# TrafficTown

A top-down, living-city traffic simulation for mobile and desktop browsers.

## Current checkpoint — KT-001: playable foundation

Branch: `feat/traffic-town-foundation-001`

The first playable browser slice includes:
- Responsive canvas city view for desktop and mobile layouts.
- A starter city with residential, work, retail and park districts.
- Autonomous car trips using a road-grid pathfinder.
- Road drawing, road widening, one-way marking, signal placement and road removal tools.
- Vehicle selection with its route and accumulated waiting time.
- Simulation pause and speed controls, city traffic indicators and autonomous population growth.
- Installable PWA shell and offline caching for the app shell.

## Development and verification

The GitHub Actions workflow checks the inline JavaScript syntax and required PWA files on feature branches. GitHub Pages deployment is intentionally restricted to `main`; this prototype is not published from the feature branch.

## Product direction

- Strict 2D top-down presentation; no isometric or 3D view.
- The player designs and improves the road network.
- Residents, workplaces and traffic demand evolve autonomously.
- Diagnose congestion by following individual vehicles and inspecting delays.
- Public transport should reduce private-car demand.
- Responsive browser-first architecture for Android, iOS and desktop.

## Next milestones

1. KT-002 — robust road graph, intersections, directional lanes and turn restrictions.
2. KT-003 — signal phase editor and congestion diagnostics.
3. KT-004 — buses with stops, route planning and passenger demand.
4. KT-005 — bridges, elevated roads, tunnels and grade-separated crossings.
5. KT-006 — rail and metro lines, stations and mode choice.
6. KT-007 — richer city growth, scenarios, save/load and mobile usability pass.

This is an early playable foundation, not the complete feature set. One-way routing, full signal phase control, real bus operations, rail/metro, bridges and tunnels remain future milestones.
