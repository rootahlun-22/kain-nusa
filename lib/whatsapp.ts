import type { Product } from "./types";

export function generateWhatsAppMessage(
  product: Pick<Product, "name">,
  color: string,
  size: string,
  template?: string
): string {
  const tpl =
    template ??
    process.env.WHATSAPP_MESSAGE_TEMPLATE ??
    "Halo Admin KainNusa, saya tertarik dengan {product} berwarna {color} dan ukuran {size}.";
  return tpl
    .replace(/\{product\}/g, product.name)
    .replace(/\{color\}/g, color)
    .replace(/\{size\}/g, size);
}

export function generateWhatsAppUrl(
  product: Pick<Product, "name">,
  color: string,
  size: string,
  number?: string,
  template?: string
): string {
  const num = number ?? process.env.WHATSAPP_NUMBER ?? "6281234567890";
  const msg = generateWhatsAppMessage(product, color, size, template);
  return `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
}
