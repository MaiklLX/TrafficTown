# TrafficTown — development journal

## Current checkpoint: KT-006 — meaningful city connections (in progress)

- Repository: `MaiklLX/TrafficTown`
- Public branch: `main`
- Active branch: `feat/traffic-town-kt-006-city-connections`
- Parent development branch: `feat/traffic-town-kt-005-transit`
- Published build: KT-004 at https://maikllx.github.io/TrafficTown/
- Published merge commit: `78da07b2724ea98a92c91b00c0ce538696257eb6`
- KT-005 workflow run #25 / ID `42859680783` completed successfully (verify and deploy workflow checks for that feature-branch push; this does not publish it to Pages).
- PR #1 (KT-001…KT-004) is merged.
- User wants a mobile-first game with the clarity and feel of Mini Motorways, but original TrafficTown mechanics. Keep strict top-down 2D.
- User has authorized publishing verified milestones. Keep new work on feature branches until ready.
- Do not create daily checks or recurring reminders.

## Completed checkpoints

- KT-001 — responsive playable city, roads, cars, PWA shell and basic simulation.
- KT-002 — one-way roads and direction-aware pathfinding.
- KT-003 — individual intersection turn restrictions, route recalculation and configurable alternating signal phases.
- KT-004 — first bus loop with ordered stops, route validation, dwell, passenger queues, boarding/alighting and route markers. KT-004 is public on Pages.
- KT-005 — transit manager, per-line live status, adjustable 8–40 second headways, multiple buses, destination-aware passenger queues, private-car congestion metrics and responsive panel. The branch's latest recorded workflow run succeeded; browser/device verification is still outstanding.

## KT-006 implementation so far

Branch: `feat/traffic-town-kt-006-city-connections`

- Started from the KT-005 feature branch, preserving transit work without changing `main`.
- Removed the pre-painted starter road grid. The player now starts with city objects and must build the network.
- Replaced free-form road painting in the primary tool with a two-point connection flow: select a building, then a destination building or an existing road.
- Building entrances are defined as explicit access points just outside each footprint.
- A grid route planner finds a path between selected points and avoids building footprints and the park.
- Construction consumes a finite road budget (90 pieces at start); existing roads can be reused.
- Added a first mission counter: three distinct residential districts must reach at least one workplace or shop. Multiple destinations from one home do not count as multiple districts.
- Mission progress is based on live road-network connected components, not historical connection records; removing a critical road removes progress when a district becomes disconnected.
- New connections are checked with the live pathfinder after proposed road cells are placed. One-way and turn restrictions are respected; invalid routes roll back their newly added road cells and do not spend budget.
- Trip demand now accumulates at homes and destinations. Departure selection is weighted by both demand and route length, so busy districts generate more traffic.
- The trip counter now records completed deliveries, not just departures. The starter level has two stages: connect three different homes, then deliver 12 trips.
- Each residential, workplace and shop building now displays a demand meter that grows and falls with simulated demand.
- Live blocked vehicles are marked on the road network with amber/red pressure halos. The city dashboard combines vehicle density and actual waiting time, and reports average vehicle delay.
- Park details are now deterministic instead of randomly moving on every render frame.
- Simplified the starter-level toolset to a single primary action: connect two meaningful city objects. Bus management, road widening, signals, turn restrictions, one-way roads and erase tools are temporarily hidden; they will return as unlockable mechanics when levels teach them.
- Fixed the artificial gridlock bug: a car yields only to a vehicle ahead in the same direction and lane, not to a car behind it, crossing its path or approaching from the opposite direction.
- Removed legacy signal/turn blocking from the starter level and stopped rendering saved signal markers, so invisible old traffic controls cannot freeze cars.
- Reduced random traffic generation and capped active cars based on built road length. Removed surprise automatic district spawns from the first level so the player can understand the initial city and objective.
- Reworked the road palette and grid contrast: softer ground grid, broader muted road surface, cleaner shoulders and lighter centre markings.
- Simplified map controls to simulation speed only; removed unused zoom and bus-manager buttons from the primary game HUD.
- Congestion now uses active vehicle density and the number of currently blocked cars; average delay is measured from accumulated trip delay rather than historical blocked-state counts.
- PWA cache key advanced to `traffictown-shell-v6` to ensure mobile clients request the updated interface.
- Added versioned local autosave (`traffictown-save-v1`): the simulation stores roads, vehicles, buildings and demand, budget, bus routes/queues, traffic controls, trip count and population every three seconds and on page exit. On reload, a valid save is restored and the player receives a confirmation in the dispatcher tip.
- PWA shell cache bumped to `traffictown-shell-v5` so the updated build replaces the older cached UI.
- Mobile HUD no longer crowds the action buttons; the initial hint describes the actual tap-to-connect interaction.
- Added visual selection/access markers to buildings.
- Reworked road rendering into continuous rounded road segments with shoulders and lane markings.
- Reduced the map grid from 38×28 to 28×22 so buildings and roads occupy more usable screen space on phones.
- Added a compact in-map mission goal and live road-budget HUD so the objective remains visible when the desktop side panel is hidden on mobile.
- The route planner now gives existing road cells a lower traversal cost, encouraging shared corridors instead of parallel duplicate roads.
- Added `tests/city-connections.test.cjs` and wired it into the Pages verification workflow.
- Car spawning now requires both endpoint buildings to have direct road access; unconnected buildings cannot create phantom traffic.
- Retained the bus manager and route tools for later use once roads are built.

### KT-006 checks performed
- JavaScript syntax parse passed after the latest code changes.
- GitHub Actions run `42868280577` completed successfully: inline JavaScript syntax, deterministic gameplay tests (including demand growth, traffic delay and local save/restore) and PWA file checks all passed. Deploy was correctly skipped because this is still a feature branch.
- Deterministic logic harness:
  - initial road count = 0;
  - initial road budget = 90;
  - created connections from three distinct homes, including an alternate destination from the first home;
  - all three links succeeded;
  - mission progress reached 3/3;
  - resulting road count = 52;
  - remaining budget = 38;
  - all recorded building-to-building links remain traversable through the live pathfinder.
- 12 simulated car spawns produced no trips from the unconnected “Новый берег” district.
- A completed route increments the delivery counter only after the vehicle reaches its destination.
- Demand grows during simulation and the UI reports the delay of an actively blocked vehicle.
- Save/restore test confirms that the road network and remaining road budget survive a reload.
- Adding multiple destinations to one home still counts as one residential district; erasing the road network resets live mission progress to zero.
- This is a code-level logic test with a stubbed canvas/DOM, not a real browser/device test.
- Need test actual tap/click behavior, map readability, touch targets, car movement, bus line creation and PWA cache behavior in a browser before publishing.

## Design rules for the new game loop

- The player is a transport-network designer, not a tile painter.
- Every road connection should have a reason: homes to jobs, homes to shops, later schools, parks, stations and services.
- Shorter/connected routes conserve the road budget; disconnected buildings should not generate trips.
- Network quality should be visible through completed trips, waiting time, traffic density and resident satisfaction.
- Introduce missions gradually; avoid overwhelming the player with every traffic tool at once.
- Mobile layout and touch interaction are the primary acceptance criteria.

## Next steps

1. Confirm the latest GitHub Actions run passes, including the new same-lane / behind / crossing / oncoming vehicle tests.
2. Run a longer deterministic simulation with several connected routes to confirm that vehicles continue moving without artificial standstills and that congestion rises only under genuine following pressure.
3. Inspect the map and tap flow in a real browser at phone and desktop sizes; no browser automation is currently available in this workflow, so do not claim device verification.
4. Add an undo/redo or route removal flow only after the basic connection experience is stable.
5. Build a proper level start / completion / next-level flow, then unlock transit and intersection controls gradually.
6. Only after browser checks and successful CI, open a PR and publish the combined milestone to Pages.

## Continue in a new chat

Paste this exact phrase:

**«Продолжай TrafficTown с КТ-006 в ветке feat/traffic-town-kt-006-city-connections. Прочитай DEVELOPMENT_LOG.md и README.md, проверь актуальный HEAD и GitHub Actions. Упрости первый уровень до соединения объектов, ограниченного бюджета и понятной цели; исправь пробки (машины уступают только впереди идущим в том же направлении), убери преждевременные светофоры/автобусы/ограничения из основного интерфейса, улучши дорожную графику и мобильный HUD. Затем проверь логику и реальный браузер, не заявляй о тестах устройства без проверки. Проверь реальное поведение в браузере, не заявляй о тестах устройства без проверки. Сохраняй строго top-down 2D, держи main нетронутой до завершения этапа. После успешных проверок обнови журнал и опубликуй проверенную версию в GitHub Pages. Ежедневные проверки не создавать.»**


## KT-006 refinement — traffic rules and focus

- User feedback: the prototype exposed too many tools at once, jams were hard to understand, signals could be placed on arbitrary map cells, road art was too grid-like, and panels were intrusive.
- Design decision: the first level teaches one verb only — connect buildings. Advanced transit and traffic-control features are retained in code but hidden until a later unlock. This is deliberate scope reduction, not removal of the future roadmap.
- Vehicle following now checks direction, forward distance and lateral alignment. A following vehicle behind, a perpendicular crossing vehicle, or an oncoming vehicle no longer blocks movement. A vehicle ahead in the same lane still creates a safe following gap.
- Random district growth was removed from the starter level; the map and objective remain stable while the player learns the network.
- Vehicle generation is capped against available road length and runs at a lower base rate, preventing speed settings from flooding the map.
- Traffic pressure is computed from active vehicle density and currently blocked cars. The average delay indicator uses accumulated delay on active trips.
- Road surfaces now have a quieter grid, wider muted asphalt and clearer soft edges / centre markings. Mobile HUD retains the objective and road budget without experimental control clutter.
- PWA cache is `traffictown-shell-v6`.
- Latest test fix aligns the CI delay assertion with the actual trip-delay field. Latest Actions run is being checked; do not publish until it is green.
