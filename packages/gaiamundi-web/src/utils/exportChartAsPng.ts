//create canvas to extract the image from it
const createImageCanvas = (image: HTMLImageElement) => {
  const canvas = document.createElement('canvas');
  canvas.width = 384;
  canvas.height = 192;
  const context = canvas.getContext('2d');
  context?.drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas;
};

//Take an svg DOM and turn it into an image file.
export const extractScreenshotBySvg = async (svgScreenshot: SVGSVGElement) => {
  const img = new Image();
  //this conversion makes svg to an image using data base64 link
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
