// PNG helpers for the visual comparison (pngjs + pixelmatch).

import { readFileSync, writeFileSync } from 'node:fs';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const MASK_COLOR = [255, 0, 255, 255];
const PAD_COLOR = [255, 255, 0, 255];

export const readPng = (path) => PNG.sync.read(readFileSync(path));

export const writePng = (image, path) =>
  writeFileSync(path, PNG.sync.write(image));

const blank = (width, height, color) => {
  const image = new PNG({ width, height });
  for (let i = 0; i < image.data.length; i += 4) {
    image.data[i] = color[0];
    image.data[i + 1] = color[1];
    image.data[i + 2] = color[2];
    image.data[i + 3] = color[3];
  }
  return image;
};

/** Composites the image onto an opaque background color. */
export const flatten = (image, [r, g, b]) => {
  const out = new PNG({ width: image.width, height: image.height });
  for (let i = 0; i < image.data.length; i += 4) {
    const alpha = image.data[i + 3] / 255;
    out.data[i] = Math.round(image.data[i] * alpha + r * (1 - alpha));
    out.data[i + 1] = Math.round(image.data[i + 1] * alpha + g * (1 - alpha));
    out.data[i + 2] = Math.round(image.data[i + 2] * alpha + b * (1 - alpha));
    out.data[i + 3] = 255;
  }
  return out;
};

/** Copies a region (clamped to the image) into a new PNG. */
export const crop = (image, { x, y, width, height }) => {
  const left = Math.max(0, Math.floor(x));
  const top = Math.max(0, Math.floor(y));
  const right = Math.min(image.width, Math.ceil(x + width));
  const bottom = Math.min(image.height, Math.ceil(y + height));
  const out = new PNG({
    width: Math.max(1, right - left),
    height: Math.max(1, bottom - top),
  });
  if (right <= left || bottom <= top) return out;
  PNG.bitblt(image, out, left, top, right - left, bottom - top, 0, 0);
  return out;
};

/** Returns the image padded (bottom/right) to the given size. */
export const padTo = (image, width, height) => {
  if (image.width === width && image.height === height) return image;
  const out = blank(width, height, PAD_COLOR);
  PNG.bitblt(image, out, 0, 0, image.width, image.height, 0, 0);
  return out;
};

/** Paints rectangles (page coordinates) in the mask color, in place. */
export const paintRects = (image, rects) => {
  for (const rect of rects) {
    const left = Math.max(0, Math.floor(rect.x));
    const top = Math.max(0, Math.floor(rect.y));
    const right = Math.min(image.width, Math.ceil(rect.x + rect.width));
    const bottom = Math.min(image.height, Math.ceil(rect.y + rect.height));
    for (let row = top; row < bottom; row++) {
      for (let col = left; col < right; col++) {
        const i = (row * image.width + col) * 4;
        image.data[i] = MASK_COLOR[0];
        image.data[i + 1] = MASK_COLOR[1];
        image.data[i + 2] = MASK_COLOR[2];
        image.data[i + 3] = MASK_COLOR[3];
      }
    }
  }
  return image;
};

/**
 * Compares two images of possibly different size. The smaller one is padded,
 * so a height difference counts as mismatched pixels.
 */
export const diffImages = (a, b, { threshold }) => {
  const width = Math.max(a.width, b.width);
  const height = Math.max(a.height, b.height);
  const left = padTo(a, width, height);
  const right = padTo(b, width, height);
  const diff = new PNG({ width, height });
  const mismatched = pixelmatch(
    left.data,
    right.data,
    diff.data,
    width,
    height,
    { threshold, includeAA: false, alpha: 0.2 },
  );
  const total = width * height;
  return {
    mismatched,
    total,
    percent: total === 0 ? 0 : (mismatched / total) * 100,
    diff,
  };
};
