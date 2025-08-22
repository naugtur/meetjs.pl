export interface City {
  name: string;
  href: string;
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
    pointPosition: {
      x: 130,
      y: 200,
    },
    textPosition: {
      x: 134,
      y: 200,
    },
    status: 'coming-soon',
  },
  {
    name: 'Kielce',
    href: '/kielce',
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

export default CITIES;
