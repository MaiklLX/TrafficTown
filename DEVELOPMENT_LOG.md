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
- GitHub Actions run `42865294592` completed successfully: inline JavaScript syntax, deterministic city connection gameplay tests and PWA file checks all passed.
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

1. Test the actual touch interaction, map readability, vehicle movement and bus-line setup in a real browser on phone-sized and desktop viewports.
2. Tune trip demand, vehicle spacing and congestion so road design has visible consequences.
3. Add level progression, new map scenarios and rewards after the first level loop is fun and reliable.
4. Rework the main menu and level selection around the puzzle-first game.
5. Only after browser checks and successful CI, open a PR and publish the combined milestone to Pages.

## Continue in a new chat

Paste this exact phrase:

**«Продолжай TrafficTown с КТ-006 в ветке feat/traffic-town-kt-006-city-connections. Прочитай DEVELOPMENT_LOG.md и README.md, проверь актуальный HEAD и GitHub Actions. Доведи мобильную механику соединения зданий и дорожную сеть в стиле Mini Motorways: строительство от объекта к объекту, ограниченный бюджет дорог, спрос на поездки, пробки и цели уровня. Проверь реальное поведение в браузере, не заявляй о тестах устройства без проверки. Сохраняй строго top-down 2D, держи main нетронутой до завершения этапа. После успешных проверок обнови журнал и опубликуй проверенную версию в GitHub Pages. Ежедневные проверки не создавать.»**
