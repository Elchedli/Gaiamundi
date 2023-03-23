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
  return canvas;
};

export const ExtractScreenshotBySvg = async (SvgScreenshot: SVGSVGElement) => {
  const img = new Image();
  const { width, height } = SvgScreenshot.getBBox();
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

export const Svg2Base64 = (SvgScreenshot: SVGSVGElement) => {
  // const svg = document.querySelector('svg');
  const xml = new XMLSerializer().serializeToString(SvgScreenshot);
  const svg64 = window.btoa(xml); //for utf8: btoa(unescape(encodeURIComponent(xml)))
  const b64start = 'data:image/svg+xml;base64,';
  const image64 = b64start + svg64;
  return image64;
};

export const SvgtoPng = (SvgScreenshot: SVGSVGElement, filename: string) => {
  const imageBase64 = Svg2Base64(SvgScreenshot);
  return fetch(imageBase64)
    .then(function (res) {
      return res.arrayBuffer();
    })
    .then((buf) => {
      return new File([buf], filename, { type: 'image/png' });
    });
};
