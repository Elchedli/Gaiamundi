const readFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsText(file);

    reader.onload = function () {
      if (!reader.result) {
        return reject(new Error('Unable to read the file!'));
      }
      resolve(reader.result.toString());
    };

    reader.onerror = function () {
      reject(reader.error);
    };
  });
};

export const GEOJSON_ALLOWED_MIME_TYPES = [
  'application/geo+json',
  'application/json',
];
export const GEOJSON_MAX_FILE_SIZE_MB = 10;

export const validateGeoJsonFile = async (file: File) => {
  if (!GEOJSON_ALLOWED_MIME_TYPES.includes(file.type)) {
    throw new Error(
      `Le type de fichier est invalide ! Les types autorisés sont : ${GEOJSON_ALLOWED_MIME_TYPES.join(
        ','
      )}`
    );
  }
  if (file.size > GEOJSON_MAX_FILE_SIZE_MB * 1024 ** 2) {
    throw new Error(
      `La taille maximale de fichier est dépassée : ${GEOJSON_MAX_FILE_SIZE_MB} Mo.`
    );
  }
  try {
    const content = await readFile(file);
    const json = JSON.parse(content);
    if (json.type !== 'FeatureCollection' || !Array.isArray(json.features)) {
      throw new Error(
        `Le format GeoJSON est invalide (FeatureCollection, features).`
      );
    }
    return true;
  } catch (e) {
    throw new Error(`Impossible de valider le format GeoJSON du fichier.`);
  }
};
