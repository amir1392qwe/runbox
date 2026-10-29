import crypto from "node:crypto";

export const SESSION_COOKIE = "runbox_session";
export const USER_SESSION_COOKIE = "runbox_user_session";

const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 7; // یک هفته

function getSecret() {
  const secret = process.env.SESSION_SECRET;

  if (secret) return secret;

  if (process.env.NODE_ENV === "production") {
    throw new Error("SESSION_SECRET باید در محیط production تنظیم شود.");
  }

  return "runbox-dev-secret-change-me";
}

function sign(base: string) {
  return crypto
    .createHmac("sha256", getSecret())
    .update(base)
    .digest("base64url");
}

export function createSessionValue(username: string) {
  const payload = JSON.stringify({ u: username, t: Date.now() });
  const base = Buffer.from(payload).toString("base64url");

  return `${base}.${sign(base)}`;
}

export function verifySessionValue(
  value?: string | null
): { username: string } | null {
  if (!value) return null;

  const [base, sig] = value.split(".");
  if (!base || !sig) return null;

  const expected = Buffer.from(sign(base));
  const given = Buffer.from(sig);

  if (
    expected.length !== given.length ||
    !crypto.timingSafeEqual(expected, given)
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(base, "base64url").toString());

    if (typeof payload.t !== "number" || Date.now() - payload.t > MAX_AGE_MS) {
      return null;
    }

    return { username: payload.u };
  } catch {
    return null;
  }
}
