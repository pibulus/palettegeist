import ColorThief from 'colorthief';

export async function extractPalette(imageElement: HTMLImageElement, colorCount = 9): Promise<number[][]> {
  return new Promise((resolve, reject) => {
    if (!imageElement.complete) {
      imageElement.onload = () => {
        try {
          const colorThief = new ColorThief();
          const palette = colorThief.getPalette(imageElement, colorCount);
          resolve(palette);
        } catch (error) {
          reject(error);
        }
      };
    } else {
      try {
        const colorThief = new ColorThief();
        const palette = colorThief.getPalette(imageElement, colorCount);
        resolve(palette);
      } catch (error) {
        reject(error);
      }
    }
  });
}

export function isLight(rgb: number[]): boolean {
  // Calculate relative luminance
  const luminance = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
  return luminance > 0.5;
}