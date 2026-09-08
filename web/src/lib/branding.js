// Modified by Main Street Media Co. on 2026-09-08 for MSM-BidMeasure.
// Derived from OpenTakeoff by Kentucky AI and the OpenTakeoff contributors.
// Apache-2.0 license and upstream attribution are preserved in LICENSE and NOTICE.
//
// Branding mode — how a deliverable presents itself. Two modes:
//   • "default"    — MSM-BidMeasure-branded; the OpenTakeoff engine credit remains visible.
//   • "clearlabel" — a saved trade-name profile brands the document as the firm
//                    presenting it; MSM-BidMeasure and OpenTakeoff remain credited.
//
// resolveBranding() is PURE — given the per-project selection + the global
// profiles list it tells every render point (report masthead, marked-set cover,
// the CSV/MD export titles) what to show. Storage is a separate, swappable edge:
// the selection lives in the per-project meta KV, keyed on the project id so it
// degrades to a single global setting in the browser-only build (folderId "").
import { metaGet, metaPut } from "./store.js";
import { activeProfile } from "./identity.js";

export const MSM_NAME = "MSM-BidMeasure";
export const OT_NAME = "OpenTakeoff";
export const OT_CREDIT = "OpenTakeoff engine";
export const MSM_CREDIT = `${OT_CREDIT} · Apache-2.0 derivative`;

/**
 * @param {{mode?: string, profileId?: string|null,
 *   profiles?: Array<{id:string,name?:string,address?:string,logo?:string}>}} [sel]
 * @returns {{clear:boolean, company:{name?:string,address?:string,logo?:string}|null,
 *   brandName:string, credit:string|null, coverTitle:string}}
 */
export function resolveBranding(sel) {
  const profiles = sel?.profiles || [];
  // Clear-label only takes effect when a real profile resolves. A stale id with
  // other profiles present rides the first one. activeProfile() is the one place
  // that fallback rule lives, shared with the modal chip highlight.
  const profile = sel?.mode === "clearlabel"
    ? activeProfile({ profiles, activeId: sel?.profileId })
    : null;
  const clear = Boolean(profile);
  return {
    clear,
    company: clear ? { name: profile.name, address: profile.address, logo: profile.logo } : null,
    brandName: (clear && profile.name) ? profile.name : MSM_NAME,
    // The upstream engine credit is intentionally retained in both modes. This
    // is product provenance in addition to the Apache-2.0 LICENSE/NOTICE files.
    credit: clear ? `Prepared with ${MSM_NAME} · ${OT_CREDIT}` : MSM_CREDIT,
    coverTitle: clear ? "Marked Set" : `${MSM_NAME} · Marked Set`,
  };
}

// ── per-project persistence (browser-only; the meta KV is IndexedDB) ──────────
const selKey = (projectId) => `branding:${projectId || ""}`;

/** @param {string} [projectId] @returns {Promise<{mode:string, profileId:string|null}>} */
export async function loadBrandingSelection(projectId) {
  try {
    const v = await metaGet(selKey(projectId));
    if (v && typeof v === "object") {
      return { mode: v.mode === "clearlabel" ? "clearlabel" : "default", profileId: v.profileId ?? null };
    }
  } catch {
    /* DB blocked/unavailable — fall through to the MSM-BidMeasure default */
  }
  return { mode: "default", profileId: null };
}

/** @param {string} projectId @param {{mode?:string, profileId?:string|null}} sel @returns {Promise<boolean>} saved ok */
export async function saveBrandingSelection(projectId, sel) {
  try {
    await metaPut(selKey(projectId), {
      mode: sel?.mode === "clearlabel" ? "clearlabel" : "default",
      profileId: sel?.profileId ?? null,
    });
    return true;
  } catch {
    return false;
  }
}
