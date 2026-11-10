# TrafficTown — development journal

## Current checkpoint: KT-005 (development in progress)

- Repository: `MaiklLX/TrafficTown`
- Public branch: `main`
- Active development branch: `feat/traffic-town-kt-005-transit`
- Published KT-004 merge commit: `78da07b2724ea98a92c91b00c0ce538696257eb6`
- Published browser build: https://maikllx.github.io/TrafficTown/
- GitHub Actions publish run: https://github.com/MaiklLX/TrafficTown/actions/runs/42859247929 — verify and deploy jobs succeeded.
- PR #1 (KT-001…KT-004): merged.
- User preference: mobile-first; strict top-down 2D; no daily checks or recurring reminders. User has authorized publishing tested milestones to Pages; keep active work on feature branches until ready.

## Completed checkpoints

- KT-001 — responsive playable city, roads, cars, PWA shell and basic simulation.
- KT-002 — one-way roads and direction-aware pathfinding.
- KT-003 — individual intersection turn restrictions, route recalculation and configurable alternating signal phases.
- KT-004 — operational first bus loop:
  - ordered stops placed on existing road tiles;
  - stop-to-stop paths validated using the normal route finder;
  - buses circulate and dwell at stops;
  - simplified passenger queues, boarding and alighting;
  - route and numbered stop markers drawn on the map.
- KT-004 was published to GitHub Pages after PR #1 was merged. GitHub Actions run #16 / ID `42859247929` completed successfully, including both `verify` and `deploy`.

## KT-005 implementation so far

Branch: `feat/traffic-town-kt-005-transit`

- Transit manager button added to the map overlay, accessible on mobile and desktop.
- Manager shows each line's active bus count, passengers onboard and waiting queue.
- Headway can be adjusted from 8 to 40 simulation seconds.
- Additional buses dispatch on schedule when the line origin has sufficient spacing.
- Passenger queues carry a destination stop index and line ID; buses board only passengers assigned to their line and unload at their destination stop.
- Private-car congestion/load calculation now excludes buses; header separates private cars and bus vehicles.
- Transit manager and editor overlay adjusted for narrow mobile screens.
- The JS syntax check passed after the KT-005 code change.

### Latest KT-005 commits
- `96ab7a92ead8e1e71c8d911867c5a828ab0711eb` — transit manager, dispatch headways and destination-aware passenger queues.
- `9e5a27401a5e13acc3ce5793d3f2e405fc970589` — mobile overlay refinements and adaptive bus spacing.
- README and journal updates are being committed after these changes.

### Remaining KT-005 verification and polish
1. Verify the current feature-branch GitHub Actions run; do not call it passing until confirmed.
2. Validate the manager interactions and dispatch/boarding behavior with a browser or a deterministic test harness if available.
3. Check phone-width toolbar overflow and panel scroll behavior.
4. Ensure selected bus details are readable and passenger counts remain consistent.
5. Once complete, update PR summary, mark ready, merge to main and verify Pages deployment success.

## Next checkpoint: KT-006
After KT-005 is stable, begin transport infrastructure: realistic bridge/tunnel/grade-separated crossings only after designing clear rules for crossings, pathfinding and mobile construction UX. Do not jump to rail/metro before the road network is robust.

## Continue in a new chat

Paste this exact phrase:

**«Продолжай TrafficTown с контрольной точки KT-005. Сначала прочитай DEVELOPMENT_LOG.md и README.md в ветке feat/traffic-town-kt-005-transit, проверь актуальный HEAD, GitHub Actions и опубликованную версию Pages. Доведи до конца панель автобусных линий, интервалы, несколько автобусов и пассажиров с пунктами назначения; проверь мобильную версию. После проверок обнови журнал, создай следующую КТ и фразу для нового чата. Публиковать проверенные этапы в GitHub Pages можно, но сначала держи работу в feature-ветке. Ежедневные проверки не создавать.»**
