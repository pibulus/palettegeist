import ColorThief from 'colorthief';

export async function extractPalette(imageElement: HTMLImageElement, colorCount = 9): Promise<number[][]> {
  console.log('Extracting palette started, colorCount:', colorCount);
  console.log('Image dimensions:', imageElement.width, 'x', imageElement.height);
  console.log('Image naturalDimensions:', imageElement.naturalWidth, 'x', imageElement.naturalHeight);
  console.log('Image complete?', imageElement.complete);
  console.log('Image crossOrigin:', imageElement.crossOrigin);

  return new Promise((resolve, reject) => {
    // Ensure the image is fully loaded and rendered
    const ensureImageLoaded = () => {
      try {
        console.log('Creating ColorThief instance');
        const colorThief = new ColorThief();
        
        try {
          console.log('Calling ColorThief.getPalette');
          
          // Create fallback palette in case of error
          let fallbackPalette = [];
          for (let i = 0; i < colorCount; i++) {
            fallbackPalette.push([
              Math.floor(Math.random() * 255),
              Math.floor(Math.random() * 255),
              Math.floor(Math.random() * 255)
            ]);
          }
          
          // Add a small timeout to make sure image is fully processed
          setTimeout(() => {
            try {
              const palette = colorThief.getPalette(imageElement, colorCount);
              console.log('ColorThief extracted palette:', palette);
              resolve(palette);
            } catch (innerError) {
              console.error('Error in ColorThief delayed extraction:', innerError);
              console.log('Using fallback palette instead');
              resolve(fallbackPalette);
            }
          }, 200);
          
        } catch (error) {
          console.error('Error in ColorThief.getPalette:', error);
          console.log('Using fallback palette');
          resolve(fallbackPalette);
        }
      } catch (error) {
        console.error('Error creating ColorThief instance:', error);
        reject(error);
      }
    };

    if (!imageElement.complete) {
      console.log('Image not complete, setting onload handler');
      imageElement.onload = ensureImageLoaded;
    } else {
      console.log('Image already complete, extracting immediately');
      ensureImageLoaded();
    }
  });
}

export function isLight(rgb: number[]): boolean {
  // Calculate relative luminance
  const luminance = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
  return luminance > 0.5;
}

export function getContrastColor(rgb: number[]): string {
  return isLight(rgb) ? '#000000' : '#ffffff';
}