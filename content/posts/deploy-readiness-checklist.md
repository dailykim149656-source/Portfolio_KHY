# Deployment Readiness Checklist

A small deployment checklist prevents production work from depending on memory.

## Minimum checks

- Build succeeds from a clean checkout.
- Environment variables are documented.
- External services have a failure path.
- Smoke tests cover the primary user route.
- Logs can answer what failed, where, and for whom.

```text
ready = build + config + smoke + rollback + observability
```

The checklist should stay short. If it becomes a second project, nobody will use it.
