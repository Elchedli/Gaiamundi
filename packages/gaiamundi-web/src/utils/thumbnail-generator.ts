const PAGECARTO_THUMBNAIL_SIZE = 512;

/**
 * create canvas to extract the image from it
 */
const createImageCanvas = (image: HTMLImageElement, ratio: number) => {
  const canvas = document.createElement('canvas');
  canvas.width = PAGECARTO_THUMBNAIL_SIZE;
  canvas.height = PAGECARTO_THUMBNAIL_SIZE / ratio;
  const context = canvas.getContext('2d');
  context?.drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas;
};

/**
 * The task of taking an image described in a vector graphics format (shapes) and converting it into a raster image
 * @param svgElement
 * @returns png image File object
 */
export const rasterizeSvg = async (svgElement: SVGSVGElement) => {
  // Clone the svg dom so i can reset the place to it's initial position and size for the perfect picture
  const svgClone = svgElement.cloneNode(true) as SVGSVGElement;
  const bbox = svgElement.getBBox();
  const ratio = bbox.width / bbox.height;
  // svg container width and height
  svgClone.setAttribute('width', bbox.width.toString());
  svgClone.setAttribute('height', bbox.height.toString());
  // This line resets the size and place to the default placement
  svgClone.style.transform = 'none';
  svgClone.setAttribute(
    'viewBox',
    `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`
  );
  const img = new Image();
  // This conversion makes svg to an image using data base64 link
  const svg = new XMLSerializer().serializeToString(svgClone);
  const dataUrl = 'data:image/svg+xml;base64,' + window.btoa(svg);
  img.src = dataUrl;
  return await new Promise<File>((resolve) => {
    img.onload = async () => {
      const canvas = createImageCanvas(img, ratio);
      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, 'image/png')
      );
      resolve(blob as File);
    };
  });
};
