# TrafficTown — development journal

## Current checkpoint: KT-004 (in progress / playable foundation)

- Repository: `MaiklLX/TrafficTown`
- Active branch: `feat/traffic-town-foundation-001`
- Draft PR: https://github.com/MaiklLX/TrafficTown/pull/1
- Public `main`: untouched; no deployment or merge authorized.
- User preference: mobile-first; strict top-down 2D; no daily checks or recurring reminders.

### Completed checkpoints
- KT-001 — playable responsive city, roads, cars, PWA shell and basic simulation.
- KT-002 — directional one-way road routing.
- KT-003 — individual turn restrictions, rerouting and configurable alternating signal phases.
- KT-004 — first playable bus-line loop:
  - tap road cells with the Bus tool to add ordered stops;
  - launch after at least two stops;
  - route segments validated with the normal pathfinder;
  - buses circulate by reversing at the end of the route;
  - buses dwell at stops, board from generated passenger queues and let passengers off;
  - route and numbered stop markers are drawn on the map.

### Latest known commits
- KT-003 baseline: `3ec9433f9095effb8611f585bab7007b73452ffe`
- KT-004 bus route + stops: `97961f9e69127fa17041b922b4632915f718648b`
- KT-004 visible stop markers + passenger queues: `ab48a2d0e6188a48128962dada6a9f48b629f7c0`
- README checkpoint update follows the latter commit.

### Verification notes
- Inline JavaScript syntax passed after the KT-004 gameplay changes.
- No browser/device playtest was performed in this chat.
- CI status has not yet been confirmed for the latest commit; do not report CI as passing without checking.
- Passenger behavior is deliberately simplified: no destination-aware boarding/alighting, schedules/headways, transfers or line editing yet.

### Next work
KT-005 should make the bus system legible and robust before adding more transport modes:
1. Show line name, active bus, passenger load and waiting counts in a compact mobile-friendly transit panel.
2. Prevent duplicate/overlapping stops and give clear feedback for unreachable stop pairs.
3. Add a sensible departure interval / multiple buses per line.
4. Improve passenger origin-destination logic so buses actually substitute for private trips rather than only adding random occupancy.
5. Test narrow mobile layout and ensure bus selection does not break car selection.

### Continue in a new chat
Paste this exact phrase:

**«Продолжай TrafficTown с контрольной точки KT-004. Сначала прочитай DEVELOPMENT_LOG.md и README.md в ветке feat/traffic-town-foundation-001, проверь актуальный HEAD и состояние PR #1. Продолжай с KT-005: улучши мобильную панель автобусных линий, интервалы движения и осмысленную логику пассажиропотока. Сохраняй журнал и добавляй фразу продолжения для следующего чата. main не менять, не публиковать, ежедневные проверки не создавать.»**
