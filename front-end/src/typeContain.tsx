export type dataTable = {
  POS: string;
  NO: string;
  DRIVER: string;
  CAR: string;
  LAPS: string;
  TIME: string;
  PTS: string;
};

export type DetailGrandPrix = {
  title: string;
  startDate: string;
  fullDate: string;
  info: string;
  dataTable: dataTable[];
  parentId: string;
};

export type AllLocation = {
  id: string;
  GRAND_PRIX: string;
  link: string;
  DATE: string;
  WINNER: string;
  CAR: string;
  LAPS: string;
  TIME: string;
};

export type year = {
  link: string;
  year: string;
};

export type result = {
  year: string;
  allLocation: AllLocation[];
  dataTable: any[];
};

export type TypeData = {
  years: year[];
  result: result[];
};
