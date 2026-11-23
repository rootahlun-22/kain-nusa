import { describe, it, expect } from "vitest";
import { generateWhatsAppMessage, generateWhatsAppUrl } from "../whatsapp";

describe("generateWhatsAppMessage", () => {
  it("should fill template with product, color, and size", () => {
    const msg = generateWhatsAppMessage(
      { name: "Batik Tulis" },
      "Merah",
      "1.1m",
      "Halo, saya tanya {product} warna {color} ukuran {size}"
    );
    expect(msg).toBe("Halo, saya tanya Batik Tulis warna Merah ukuran 1.1m");
  });

  it("should use default template when none provided", () => {
    const msg = generateWhatsAppMessage({ name: "Kain A" }, "Biru", "2.5m");
    expect(msg).toContain("Kain A");
    expect(msg).toContain("Biru");
    expect(msg).toContain("2.5m");
  });

  it("should replace multiple occurrences", () => {
    const msg = generateWhatsAppMessage(
      { name: "X" },
      "Merah",
      "0.5m",
      "{product} {product} {color} {size}"
    );
    expect(msg).toBe("X X Merah 0.5m");
  });
});

describe("generateWhatsAppUrl", () => {
  it("should produce a valid wa.me URL", () => {
    const url = generateWhatsAppUrl(
      { name: "Test" },
      "Merah",
      "1.1m",
      "6281234567890",
      "Halo, {product} {color} {size}"
    );
    expect(url).toBe(
      "https://wa.me/6281234567890?text=" +
        encodeURIComponent("Halo, Test Merah 1.1m")
    );
  });

  it("should URL-encode the message", () => {
    const url = generateWhatsAppUrl(
      { name: "Kain & Test" },
      "Merah",
      "1.1m",
      "628",
      "Q: {product}?"
    );
    expect(url).toContain("Kain%20%26%20Test");
  });
});
