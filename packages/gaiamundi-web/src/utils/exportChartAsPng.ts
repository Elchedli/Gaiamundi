const createImageCanvas = (
  image: HTMLImageElement,
  width: number,
  height: number
) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  context?.drawImage(image, 0, 0, canvas.width, canvas.height);
  console.log(canvas.toDataURL('image/png'));
  console.log('width : ', width, ' height : ', height);
  return canvas;
};

export const ExtractScreenshotBySvg = async (SvgScreenshot: SVGSVGElement) => {
  const img = new Image();
  const { width, height } = SvgScreenshot.getBoundingClientRect();
  const svgString = new XMLSerializer().serializeToString(SvgScreenshot);
  const dataUrl = 'data:image/svg+xml;base64,' + window.btoa(svgString);
  img.src = dataUrl;
  return await new Promise<File>((resolve) => {
    img.onload = async () => {
      const canvas = createImageCanvas(img, width + 1, height + 1);
      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, 'image/png')
      );
      resolve(blob as File);
    };
  });
};
