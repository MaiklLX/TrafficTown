# TrafficTown

A top-down, living-city traffic simulation for mobile and desktop browsers.

## Current checkpoint — KT-002: directional road routing

Branch: `feat/traffic-town-foundation-001`

The playable browser foundation now includes:
- Responsive 2D canvas city view for desktop and mobile.
- A starter city with residential, work, retail and park districts.
- Autonomous car trips on a connected road grid.
- Road drawing, road widening, road removal and signal placement.
- **Functional one-way road directions:** each marked tile cycles through two-way, positive-axis and negative-axis traffic; the pathfinder rejects travel against the marked direction.
- Route search prefers shorter paths and applies small turn/congestion costs.
- Vehicle selection with its planned route and accumulated waiting time.
- Simulation pause and speed controls, traffic indicators and autonomous population growth.
- Installable PWA shell and offline caching for the app shell.

One-way marking is a first directional-network step. Explicit prohibited-turn rules, lane-level routing and editable signal phases are not implemented yet.

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

1. KT-003 — robust intersection rules, prohibited turns and signal phase editor.
2. KT-003 — signal phase editor and congestion diagnostics.
3. KT-004 — buses with stops, route planning and passenger demand.
4. KT-005 — bridges, elevated roads, tunnels and grade-separated crossings.
5. KT-006 — rail and metro lines, stations and mode choice.
6. KT-007 — richer city growth, scenarios, save/load and mobile usability pass.

This is an early playable foundation, not the complete feature set. Explicit turn restrictions, full signal phase control, real bus operations, rail/metro, bridges and tunnels remain future milestones.
