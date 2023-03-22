import { uploadCover } from 'services/page-carto';

export const downloadImage = (
  url: string,
  fileName: string,
  fileType: 'svg' | 'png'
) => {
  const a = document.createElement('a');
  a.download = `${fileName}.${fileType}`;
  document.body.appendChild(a);
  a.href = url;
  a.click();
  a.remove();
};

export const createImageCanvas = (
  image: HTMLImageElement,
  width: number,
  height: number
) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  context?.drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas;
};

export const ExtractionByScreenshot = (
  width: number,
  height: number,
  name: string,
  SvgScreenshot: SVGSVGElement
) => {
  const img = new Image();
  img.addEventListener('load', () => {
    const canvas = createImageCanvas(img, width, height);
    canvas.toBlob(function (blob: any) {
      uploadCover(blob);
    }, 'image/png');
  });
  const svgString = new XMLSerializer().serializeToString(SvgScreenshot);
  const dataUrl = 'data:image/svg+xml;base64,' + window.btoa(svgString);
  img.src = dataUrl;
};
