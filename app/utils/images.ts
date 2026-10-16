// Image widths and srcset rules of next/image, reused by <AppImage> so the
// Nuxt port requests the same image sizes the Next.js site did.

/** next/image `deviceSizes` (used for `fill` and `sizes` images). */
export const DEVICE_SIZES = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

/** next/image `imageSizes`. */
export const IMAGE_SIZES = [32, 48, 64, 96, 128, 256, 384];

/** Every width the image optimizer may be asked for (also `image.screens`). */
export const IMAGE_WIDTHS = [...IMAGE_SIZES, ...DEVICE_SIZES];

const nearestWidth = (width: number) =>
  IMAGE_WIDTHS.find((candidate) => candidate >= width) ??
  IMAGE_WIDTHS[IMAGE_WIDTHS.length - 1]!;

/**
 * Port of next/image `getWidths`: density descriptors (1x, 2x) for fixed-width
 * images, width descriptors for responsive (`sizes`/`fill`) images.
 */
export const getImageWidths = (
  width: number | undefined,
  sizes: string | undefined,
): { widths: number[]; kind: 'w' | 'x' } => {
  if (sizes) {
    const percentSizes = [...sizes.matchAll(/(^|\s)(1?\d?\d)vw/g)].map(
      (match) => Number(match[2]),
    );
    if (percentSizes.length > 0) {
      const smallestRatio = Math.min(...percentSizes) * 0.01;
      return {
        widths: IMAGE_WIDTHS.filter(
          (candidate) => candidate >= DEVICE_SIZES[0]! * smallestRatio,
        ),
        kind: 'w',
      };
    }
    return { widths: IMAGE_WIDTHS, kind: 'w' };
  }
  if (typeof width !== 'number') {
    return { widths: DEVICE_SIZES, kind: 'w' };
  }
  return {
    widths: [...new Set([width, width * 2].map(nearestWidth))],
    kind: 'x',
  };
};
