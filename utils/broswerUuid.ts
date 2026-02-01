// utils/browserUuid.ts
import { v4 as uuidv4 } from "uuid";

export function getBrowserUuid(): string {
  if (typeof window === "undefined") return "";

  let uuid = localStorage.getItem("browser_uuid");

  if (!uuid) {
    uuid = uuidv4();
    localStorage.setItem("browser_uuid", uuid);
  }

  return uuid;
}
