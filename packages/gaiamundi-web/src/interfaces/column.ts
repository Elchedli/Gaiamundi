export interface Column {
  name: string;
  source: string;
  validity: string;
  isGeoCode: boolean;
}

export interface DatasetColumn extends Column {
  dataset: string;
}
