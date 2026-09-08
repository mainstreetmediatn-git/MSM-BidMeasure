<!--
Modified by Main Street Media Co. on 2026-09-08 for the MSM-BidMeasure derivative work.
Original project: OpenTakeoff by Kentucky AI and the OpenTakeoff contributors.
Apache-2.0 license and upstream attribution are preserved in LICENSE and NOTICE.
-->

<div align="center">

# MSM-BidMeasure

**AI-native construction takeoff, bid measurement, and auditable quantity extraction.**

MSM-BidMeasure is Main Street Media Co.'s maintained derivative of
[OpenTakeoff](https://github.com/Kentucky-ai/opentakeoff). It keeps the same
client-side measurement engine and MCP-compatible workflow while giving the fork
its own product identity, deployment pipeline, release safeguards, and modification record.

[![License: Apache 2.0](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
[![Fork](https://img.shields.io/badge/fork-MSM--BidMeasure-111827.svg)](https://github.com/mainstreetmediatn-git/MSM-BidMeasure)
[![Upstream engine demo](https://img.shields.io/badge/live%20engine%20demo-OpenTakeoff-2ea44f.svg)](https://opentakeoff.kentucky-ai.com)

</div>

## What MSM-BidMeasure does

MSM-BidMeasure turns construction plans into measurable, reviewable bid data. The browser
canvas and the MCP server use the same geometry and quantity logic, so a measurement created
by a person and one proposed by an AI agent can be compared on the same underlying record.

Core capabilities inherited from OpenTakeoff include:

- PDF plan loading, calibration, area/line/count measurement, markups, and exports.
- Construction conditions, quantities, waste factors, roll-goods layout, schedules, RFIs,
  and marked plan-set output.
- Agent operation through the OpenTakeoff-compatible MCP server.
- Local-first browser operation for the primary canvas; no account is required for the
  basic local workflow.
- Measurement provenance and review state for auditable human/agent collaboration.
- A default build exposing <!--tool-count-->52<!--/tool-count--> MCP tools at the current upstream baseline.

Detailed engine documentation remains in [`docs/`](docs/) and the MCP reference remains in
[`mcp/README.md`](mcp/README.md).

## Live demo and deployment

**Current live engine demo:** https://opentakeoff.kentucky-ai.com

That URL is the upstream OpenTakeoff deployment and is retained as a working compatibility
reference while the MSM fork is deployed under its own host.

**MSM fork deployment target:** `https://mainstreetmediatn-git.github.io/MSM-BidMeasure/`

The repository includes a dedicated GitHub Pages workflow for the real Vite application.
Once GitHub Pages is enabled for this repository with **GitHub Actions** as the publishing
source, pushes to `main` build and publish the MSM-branded fork automatically.

## Local development

Requirements:

- Node.js 24+ for the browser application.
- Node.js 20+ for the MCP server.

Run the browser app:

```bash
git clone https://github.com/mainstreetmediatn-git/MSM-BidMeasure.git
cd MSM-BidMeasure/web
npm ci
npm run dev
```

Run the full browser validation:

```bash
cd web
npm run check
```

Build and test the MCP compatibility server:

```bash
cd mcp
npm ci
npm run typecheck
npm test
npm run build
npm run smoke:dist
```

## Package identity

The fork-level product identity is **MSM-BidMeasure** and the browser package is
**`msm-bidmeasure-web`**.

The MCP package keeps the upstream **`opentakeoff-mcp`** package/binary identity for compatibility.
MSM does **not** republish Kentucky AI's npm package or MCP Registry identity from this fork.
The fork release workflow validates and packages MCP artifacts without publishing them into
upstream-owned namespaces.

This distinction prevents the rebrand from implying ownership of an upstream registry identity
while still allowing MSM-BidMeasure to consume and extend the same Apache-licensed engine.

## Repository workflow

The fork uses three separate concerns:

1. **CI** — validates the web app, MCP server, docs, capture server, and optional sandbox.
2. **MSM Pages deployment** — builds the Vite app and publishes the static `web/dist` artifact.
3. **MCP fork packaging** — validates tagged MCP artifacts but deliberately does not publish to
   npm or the upstream MCP Registry identity.

The original fork snapshot before this rebrand is preserved on
`backup/pre-msm-rebrand-20260908`.

## Upstream relationship

MSM-BidMeasure is derived from:

- **Project:** OpenTakeoff
- **Upstream:** https://github.com/Kentucky-ai/opentakeoff
- **Original copyright:** Copyright 2026 Kentucky AI and the OpenTakeoff contributors
- **License:** Apache License 2.0

MSM maintains its modifications separately from upstream ownership. Upstream copyright,
license text, attribution, and relevant notices are preserved. See [`NOTICE`](NOTICE) and
[`MODIFICATIONS.md`](MODIFICATIONS.md).

## License and attribution

Licensed under the Apache License, Version 2.0. See [`LICENSE`](LICENSE).

Copyright 2026 Main Street Media Co. for MSM-authored modifications.

OpenTakeoff portions remain Copyright 2026 Kentucky AI and the OpenTakeoff contributors.
Nothing in the MSM rebrand removes or replaces upstream copyright, attribution, trademark,
or license notices. OpenTakeoff and Kentucky AI names are used only to identify the origin
and compatibility relationship of this derivative work.

## Modification policy

When MSM changes an upstream file, the change should be identifiable in the file itself where
the format reasonably permits it and recorded in [`MODIFICATIONS.md`](MODIFICATIONS.md).
New MSM-authored files should identify the fork and retain Apache-2.0 licensing where applicable.

For upstream engine history and original project documentation, see the
[OpenTakeoff repository](https://github.com/Kentucky-ai/opentakeoff).
