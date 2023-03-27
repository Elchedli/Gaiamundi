const createImageCanvas = (image: HTMLImageElement) => {
  const canvas = document.createElement('canvas');
  canvas.width = 384;
  canvas.height = 192;
  const context = canvas.getContext('2d');
  context?.drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas;
};

export const extractScreenshotBySvg = async (svgScreenshot: SVGSVGElement) => {
  const img = new Image();
  const svgString = new XMLSerializer().serializeToString(svgScreenshot);
  const dataUrl = 'data:image/svg+xml;base64,' + window.btoa(svgString);
  img.src = dataUrl;
  return await new Promise<File>((resolve) => {
    img.onload = async () => {
      const canvas = createImageCanvas(img);
      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, 'image/png')
      );
      resolve(blob as File);
    };
  });
};
