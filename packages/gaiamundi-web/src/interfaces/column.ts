export interface Column {
  name: string;
  sample: number;
  source: string;
  validity: string;
  isGeoCode: boolean;
}

export interface DatasetColumn extends Column {
  dataset: string;
}
