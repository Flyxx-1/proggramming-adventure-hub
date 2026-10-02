import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const EVENTS = ["9.2", "9.3", "9.4"] as const;
const MAX = 5 * 1024 * 1024;
const TYPES = ["image/png", "image/jpeg", "image/webp", "application/pdf"];

export const submitRegistration = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => {
    if (!(data instanceof FormData)) throw new Error("Invalid form");
    const event = z.enum(EVENTS).parse(data.get("event"));
    const raw = JSON.parse(String(data.get("details") ?? "{}"));
    const details = z.record(z.string().max(60), z.string().trim().max(200)).parse(raw);
    if (Object.keys(details).length > 30) throw new Error("Too many fields");
    const file = data.get("proof");
    if (!(file instanceof File) || file.size === 0 || file.size > MAX || !TYPES.includes(file.type)) {
      throw new Error("Bukti pembayaran harus gambar atau PDF, maksimal 5MB.");
    }
    return { event, details, file };
  })
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const ext = data.file.type === "application/pdf" ? "pdf" : data.file.type.split("/")[1];
    const path = `${data.event}/${crypto.randomUUID()}.${ext}`;
    const up = await supabaseAdmin.storage.from("payment-proofs").upload(path, data.file, { contentType: data.file.type });
    if (up.error) { console.error(up.error); throw new Error("Upload gagal, coba lagi."); }
    const { error } = await supabaseAdmin.from("registrations").insert({ event_key: data.event, details: data.details, payment_proof_path: path });
    if (error) { console.error(error); throw new Error("Gagal menyimpan, coba lagi."); }
    return { ok: true };
  });
