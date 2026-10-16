export interface City {
  name: string;
  href: string;
  geo?: {
    lat: number;
    lng: number;
  };
  pointPosition: {
    x: number;
    y: number;
  };
  textPosition: {
    x: number;
    y: number;
  };
  status: 'active' | 'paused' | 'coming-soon' | 'new';
}

export const CITIES: City[] = [
  {
    name: 'Białystok',
    href: '/bialystok',
    geo: { lat: 53.1325, lng: 23.1688 },
    pointPosition: {
      x: 220,
      y: 80,
    },
    textPosition: {
      x: 170,
      y: 80,
    },
    status: 'active',
  },
  {
    name: 'Bielsko-Biała',
    href: '/bielsko-biala',
    geo: { lat: 49.8224, lng: 19.0444 },
    pointPosition: {
      x: 120,
      y: 210,
    },
    textPosition: {
      x: 120,
      y: 222,
    },
    status: 'active',
  },
  {
    name: 'Gdańsk',
    href: '/gdansk',
    geo: { lat: 54.352, lng: 18.6466 },
    pointPosition: {
      x: 110,
      y: 25,
    },
    textPosition: {
      x: 70,
      y: 34,
    },
    status: 'active',
  },
  {
    name: 'Katowice',
    href: '/katowice',
    geo: { lat: 50.2649, lng: 19.0238 },
    pointPosition: {
      x: 130,
      y: 200,
    },
    textPosition: {
      x: 134,
      y: 200,
    },
    status: 'new',
  },
  {
    name: 'Kielce',
    href: '/kielce',
    geo: { lat: 50.8661, lng: 20.6286 },
    pointPosition: {
      x: 150,
      y: 164,
    },
    textPosition: {
      x: 154,
      y: 164,
    },
    status: 'paused',
  },
  {
    name: 'Kraków',
    href: '/krakow',
    geo: { lat: 50.0647, lng: 19.945 },
    pointPosition: {
      x: 150,
      y: 210,
    },
    textPosition: {
      x: 154,
      y: 210,
    },
    status: 'active',
  },
  {
    name: 'Łódź',
    href: '/lodz',
    geo: { lat: 51.7592, lng: 19.456 },
    pointPosition: {
      x: 130,
      y: 130,
    },
    textPosition: {
      x: 134,
      y: 130,
    },
    status: 'active',
  },
  {
    name: 'Lublin',
    href: '/lublin',
    geo: { lat: 51.2465, lng: 22.5684 },
    pointPosition: {
      x: 190,
      y: 160,
    },
    textPosition: {
      x: 194,
      y: 160,
    },
    status: 'active',
  },
  {
    name: 'Poznań',
    href: '/poznan',
    geo: { lat: 52.4064, lng: 16.9252 },
    pointPosition: {
      x: 60,
      y: 110,
    },
    textPosition: {
      x: 64,
      y: 110,
    },
    status: 'active',
  },
  {
    name: 'Warszawa',
    href: '/warszawa',
    geo: { lat: 52.2297, lng: 21.0122 },
    pointPosition: {
      x: 160,
      y: 110,
    },
    textPosition: {
      x: 164,
      y: 110,
    },
    status: 'active',
  },
  {
    name: 'Wrocław',
    href: '/wroclaw',
    geo: { lat: 51.1079, lng: 17.0385 },
    pointPosition: {
      x: 70,
      y: 170,
    },
    textPosition: {
      x: 74,
      y: 170,
    },
    status: 'active',
  },
  {
    name: 'Szczecin',
    href: '/szczecin',
    geo: { lat: 53.4285, lng: 14.5528 },
    pointPosition: {
      x: 20,
      y: 50,
    },
    textPosition: {
      x: 24,
      y: 50,
    },
    status: 'paused',
  },
  {
    name: 'Toruń',
    href: '/torun',
    geo: { lat: 53.0138, lng: 18.5984 },
    pointPosition: {
      x: 100,
      y: 80,
    },
    textPosition: {
      x: 104,
      y: 80,
    },
    status: 'paused',
  },
];

interface GeoCity {
  name: string;
  href: string;
  lat: number;
  lng: number;
}

export const UNMAPPED_CITY_PAGES: GeoCity[] = [
  { name: 'Gliwice', href: '/gliwice', lat: 50.2945, lng: 18.6714 },
  { name: 'Olsztyn', href: '/olsztyn', lat: 53.7784, lng: 20.4801 },
  { name: 'Opole', href: '/opole', lat: 50.6751, lng: 17.9213 },
  { name: 'Rzeszów', href: '/rzeszow', lat: 50.0412, lng: 21.9991 },
  { name: 'Zielona Góra', href: '/zielona-gora', lat: 51.9356, lng: 15.5062 },
];

export default CITIES;
