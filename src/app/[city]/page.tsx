// // // // src/app/[city]/page.tsx
// // // // import { Suspense } from 'react';
// // // // import { notFound } from 'next/navigation';
// // // // import CityLayout from '@/components/CityLayout';
// // // // // import fs from 'fs';
// // // // import path from 'path';
// // // // import { parse } from 'csv-parse/sync';

// // // // CSVからデータを読み込む関数
// // // function getCityData() {
// // //   try {
// // //     const csvPath = path.join(process.cwd(), 'public', 'city_data.csv');
// // //     if (!fs.existsSync(csvPath)) {
// // //       console.error('CSV file not found:', csvPath);
// // //       return [];
// // //     }

// // //     const fileContent = fs.readFileSync(csvPath, 'utf8');
// // //     const records = parse(fileContent, {
// // //       columns: true,
// // //       skip_empty_lines: true,
// // //     });

// // //     return records;
// // //   } catch (error) {
// // //     console.error('Error reading CSV:', error);
// // //     return [];
// // //   }
// // // }

// // // // 都市ごとの追加データ（CSV にない項目はここで補完）
// // // const cityAdditionalData = {
// // //   'new-york-city': {
// // //     // CSV に値があればそちらを優先するので、ここは fallback として使う
// // //     // greenSpacePercentage: '0',
// // //   },
// // //   tokyo: {
// // //     greenSpacePercentage: '7.5',
// // //   },
// // //   sydney: {
// // //     greenSpacePercentage: '46',
// // //   },
// // // };

// // // // 都市ページのパラメータを生成
// // // export function generateStaticParams() {
// // //   const cities = getCityData();

// // //   // 空の場合はデフォルト値
// // //   if (!cities || cities.length === 0) {
// // //     return [{ city: 'new-york-city' }, { city: 'tokyo' }, { city: 'sydney' }];
// // //   }

// // //   return cities.map((city) => ({
// // //     city: city.Name.toLowerCase().replace(/\s+/g, '-'),
// // //   }));
// // // }

// // // export default function CityPage({ params }: { params: { city: string } }) {
// // //   const cities = getCityData();

// // //   // CSVが空の場合はハードコードされたデータを使用
// // //   if (!cities || cities.length === 0) {
// // //     const hardcodedData = {
// // //       'new-york-city': {
// // //         name: 'New York City',
// // //         latitude: '40.71427',
// // //         longitude: '-74.00597',
// // //         url: 'https://hugsi.green/cities/New_York_City',
// // //         radius: '100',
// // //         greenSpacePercentage: '0',
// // //         vegetationHealth: '0',
// // //         VegetationHealth_left: '0',
// // //         vegetationIndicatorColor: '#FDBA74',
// // //         greenSpaceDistribution: '0',
// // //         GreenSpaceDistribution_left: '0',
// // //         distributionIndicatorColor: '#b9c3ab',
// // //       },
// // //       tokyo: {
// // //         name: 'Tokyo',
// // //         latitude: '35.6895',
// // //         longitude: '139.69171',
// // //         url: 'https://hugsi.green/cities/Tokyo',
// // //         radius: '100',
// // //         greenSpacePercentage: '7.5',
// // //         vegetationHealth: '0.58',
// // //         VegetationHealth_left: '154',
// // //         vegetationIndicatorColor: '#d7bd51',
// // //         greenSpaceDistribution: '0.42',
// // //         GreenSpaceDistribution_left: '13',
// // //         distributionIndicatorColor: '#bec1b7',
// // //       },
// // //       sydney: {
// // //         name: 'Sydney',
// // //         latitude: '-33.865143',
// // //         longitude: '151.2099',
// // //         url: 'https://hugsi.green/cities/Sydney',
// // //         radius: '100',
// // //         greenSpacePercentage: '46',
// // //         vegetationHealth: '0.81',
// // //         VegetationHealth_left: '160',
// // //         vegetationIndicatorColor: '#d1bd4e',
// // //         greenSpaceDistribution: '0.75',
// // //         GreenSpaceDistribution_left: '85.8',
// // //         distributionIndicatorColor: '#9fc26b',
// // //       },
// // //     };

// // //     const cityData = hardcodedData[params.city];
// // //     if (!cityData) {
// // //       notFound();
// // //     }

// // //     return (
// // //       <Suspense fallback={<div>Loading...</div>}>
// // //         <CityLayout cityData={cityData} />
// // //       </Suspense>
// // //     );
// // //   }

// // //   // URLのスラッグから都市データを検索
// // //   const cityData = cities.find((city) => city.Name.toLowerCase().replace(/\s+/g, '-') === params.city);

// // //   if (!cityData) {
// // //     notFound();
// // //   }

// // //   // CSV から渡された各値をそのまま CityLayout 用に整形
// // //   const formattedCityData = {
// // //     // 追加データ（CSV にない項目の場合のみ）
// // //     ...cityAdditionalData[params.city],
// // //     name: cityData.Name,
// // //     latitude: cityData.Latitude,
// // //     longitude: cityData.Longitude,
// // //     url: cityData.URL,
// // //     radius: cityData.Radius,
// // //     greenSpacePercentage: cityData.GreenSpacePercentage,
// // //     vegetationHealth: cityData.VegetationHealth_value,
// // //     VegetationHealth_left: cityData.VegetationHealth_left,
// // //     vegetationIndicatorColor: cityData.VegetationHealth_color,
// // //     greenSpaceDistribution: cityData.GreenSpaceDistribution_value,
// // //     GreenSpaceDistribution_left: cityData.GreenSpaceDistribution_left,
// // //     distributionIndicatorColor: cityData.GreenSpaceDistribution_color,
// // //   };

// // //   return (
// // //     <Suspense fallback={<div>Loading...</div>}>
// // //       <CityLayout cityData={formattedCityData} />
// // //     </Suspense>
// // //   );
// // // }

// // // src/app/[city]/page.tsx

// // import { Suspense } from 'react';
// // import { notFound } from 'next/navigation';
// // import CityLayout from '@/components/CityLayout';
// // import fs from 'fs';
// // import path from 'path';
// // import { parse } from 'csv-parse/sync';

// // // CSVからデータを読み込む関数（これはサーバー専用）
// // function getCityData() {
// //   try {
// //     const csvPath = path.join(process.cwd(), 'public', 'city_data.csv');
// //     if (!fs.existsSync(csvPath)) {
// //       console.error('CSV file not found:', csvPath);
// //       return [];
// //     }
// //     const fileContent = fs.readFileSync(csvPath, 'utf8');
// //     const records = parse(fileContent, {
// //       columns: true,
// //       skip_empty_lines: true,
// //     });
// //     return records;
// //   } catch (error) {
// //     console.error('Error reading CSV:', error);
// //     return [];
// //   }
// // }

// // // 都市ごとの追加データ（CSVにない項目のfallback）
// // const cityAdditionalData = {
// //   'new-york-city': {
// //     greenSpacePercentage: '23',
// //     vegetationHealth: '0.64',
// //     greenSpaceDistribution: '9',
// //     vegetationIndicatorColor: '#FDBA74',
// //     distributionIndicatorColor: '#b9c3ab',
// //   },
// //   tokyo: {
// //     greenSpacePercentage: '20',
// //     vegetationHealth: '0.66',
// //     greenSpaceDistribution: '5',
// //     vegetationIndicatorColor: '#d7bd51',
// //     distributionIndicatorColor: '#bec1b7',
// //   },
// //   sydney: {
// //     greenSpacePercentage: '42',
// //     vegetationHealth: '0.69',
// //     greenSpaceDistribution: '33',
// //     vegetationIndicatorColor: '#d1bd4e',
// //     distributionIndicatorColor: '#9fc26b',
// //   },
// // };

// // export function generateStaticParams() {
// //   const cities = getCityData();
// //   if (!cities || cities.length === 0) {
// //     return [
// //       { city: 'new-york-city' },
// //       { city: 'tokyo' },
// //       { city: 'sydney' },
// //     ];
// //   }
// //   return cities.map((city) => ({
// //     city: city.Name.toLowerCase().replace(/\s+/g, '-'),
// //   }));
// // }

// // // ページをサーバーコンポーネント（async）として定義
// // export default async function CityPage({ params }: { params: { city: string } }) {
// //   const { city } = params;
// //   const cities = getCityData();

// //   if (!cities || cities.length === 0) {
// //     const hardcodedData = {
// //       'new-york-city': {
// //         name: 'New York City',
// //         latitude: '40.71427',
// //         longitude: '-74.00597',
// //         url: 'https://hugsi.green/cities/New_York_City',
// //         radius: '100',
// //         ...cityAdditionalData['new-york-city'],
// //       },
// //       tokyo: {
// //         name: 'Tokyo',
// //         latitude: '35.6895',
// //         longitude: '139.69171',
// //         url: 'https://hugsi.green/cities/Tokyo',
// //         radius: '100',
// //         ...cityAdditionalData['tokyo'],
// //       },
// //       sydney: {
// //         name: 'Sydney',
// //         latitude: '-33.865143',
// //         longitude: '151.2099',
// //         url: 'https://hugsi.green/cities/Sydney',
// //         radius: '100',
// //         ...cityAdditionalData['sydney'],
// //       },
// //     };

// //     const cityData = hardcodedData[city];
// //     if (!cityData) {
// //       notFound();
// //     }
// //     return (
// //       <Suspense fallback={<div>Loading...</div>}>
// //         <CityLayout cityData={cityData} />
// //       </Suspense>
// //     );
// //   }

// //   // URLのスラッグから都市データを検索
// //   const cityData = cities.find((c) => c.Name.toLowerCase().replace(/\s+/g, '-') === city);
// //   if (!cityData) {
// //     notFound();
// //   }

// //   const formattedCityData = {
// //     ...cityAdditionalData[city],
// //     name: cityData.Name,
// //     latitude: cityData.Latitude,
// //     longitude: cityData.Longitude,
// //     url: cityData.URL,
// //     radius: cityData.Radius,
// //     greenSpacePercentage: cityData.GreenSpacePercentage,
// //     vegetationHealth: cityData.VegetationHealth_value,
// //     greenSpaceDistribution: cityData.GreenSpaceDistribution_value,
// //     vegetationIndicatorColor: cityData.VegetationHealth_color,
// //     distributionIndicatorColor: cityData.GreenSpaceDistribution_color,
// //   };

// //   return (
// //     <Suspense fallback={<div>Loading...</div>}>
// //       <CityLayout cityData={formattedCityData} />
// //     </Suspense>
// //   );
// // }



// // src/app/[city]/page.tsx
// export const runtime = 'nodejs';

// import { Suspense } from 'react';
// import { notFound } from 'next/navigation';
// import CityLayout from '@/components/CityLayout';

// // 都市データの型定義
// type CityRecord = {
//   Name: string;
//   Latitude: string;
//   Longitude: string;
//   URL: string;
//   Radius: string;
//   GreenSpacePercentage: string;
//   VegetationHealth_value: string;
//   GreenSpaceDistribution_value: string;
//   VegetationHealth_color: string;
//   GreenSpaceDistribution_color: string;
// };

// // 追加データの型定義
// type CityAdditionalData = {
//   greenSpacePercentage: string;
//   vegetationHealth: string;
//   greenSpaceDistribution: string;
//   vegetationIndicatorColor: string;
//   distributionIndicatorColor: string;
// };

// // ハードコードされたデータの型定義
// type HardcodedCityData = {
//   name: string;
//   latitude: string;
//   longitude: string;
//   url: string;
//   radius: string;
// } & CityAdditionalData;

// // 都市キーの型定義
// type CityKey = 'new-york-city' | 'tokyo' | 'sydney';

// // 都市ごとの追加データ（CSVにない項目のfallback）
// const cityAdditionalData: Record<CityKey, CityAdditionalData> = {
//   'new-york-city': {
//     greenSpacePercentage: '23',
//     vegetationHealth: '0.64',
//     greenSpaceDistribution: '9',
//     vegetationIndicatorColor: '#FDBA74',
//     distributionIndicatorColor: '#b9c3ab',
//   },
//   tokyo: {
//     greenSpacePercentage: '20',
//     vegetationHealth: '0.66',
//     greenSpaceDistribution: '5',
//     vegetationIndicatorColor: '#d7bd51',
//     distributionIndicatorColor: '#bec1b7',
//   },
//   sydney: {
//     greenSpacePercentage: '42',
//     vegetationHealth: '0.69',
//     greenSpaceDistribution: '33',
//     vegetationIndicatorColor: '#d1bd4e',
//     distributionIndicatorColor: '#9fc26b',
//   },
// };

// // CSVデータを取得する関数
// async function getCityData(): Promise<CityRecord[]> {
//   try {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/cities`);
//     const data = await response.json();
//     return data.cities;
//   } catch (error) {
//     console.error('Error fetching city data:', error);
//     return [];
//   }
// }

// export async function generateStaticParams() {
//   const cities = await getCityData();
//   if (!cities || cities.length === 0) {
//     return [{ city: 'new-york-city' as const }, { city: 'tokyo' as const }, { city: 'sydney' as const }];
//   }
//   return cities.map((city: CityRecord) => ({
//     city: city.Name.toLowerCase().replace(/\s+/g, '-'),
//   }));
// }

// // ページをサーバーコンポーネント（async）として定義
// export default async function CityPage({ params }: { params: { city: string } }) {
//   const { city } = params;
//   const cities = await getCityData();

//   if (!cities || cities.length === 0) {
//     const hardcodedData: Record<CityKey, HardcodedCityData> = {
//       'new-york-city': {
//         name: 'New York City',
//         latitude: '40.71427',
//         longitude: '-74.00597',
//         url: 'https://hugsi.green/cities/New_York_City',
//         radius: '100',
//         ...cityAdditionalData['new-york-city'],
//       },
//       tokyo: {
//         name: 'Tokyo',
//         latitude: '35.6895',
//         longitude: '139.69171',
//         url: 'https://hugsi.green/cities/Tokyo',
//         radius: '100',
//         ...cityAdditionalData['tokyo'],
//       },
//       sydney: {
//         name: 'Sydney',
//         latitude: '-33.865143',
//         longitude: '151.2099',
//         url: 'https://hugsi.green/cities/Sydney',
//         radius: '100',
//         ...cityAdditionalData['sydney'],
//       },
//     };

//     const cityData = hardcodedData[city as CityKey];
//     if (!cityData) {
//       notFound();
//     }
//     return (
//       <Suspense fallback={<div>Loading...</div>}>
//         <CityLayout cityData={cityData} />
//       </Suspense>
//     );
//   }

//   // URLのスラッグから都市データを検索
//   const cityData = cities.find((c: CityRecord) => c.Name.toLowerCase().replace(/\s+/g, '-') === city);
//   if (!cityData) {
//     notFound();
//   }

//   const formattedCityData = {
//     ...(cityAdditionalData[city as CityKey] || {}),
//     name: cityData.Name,
//     latitude: cityData.Latitude,
//     longitude: cityData.Longitude,
//     url: cityData.URL,
//     radius: cityData.Radius,
//     greenSpacePercentage: cityData.GreenSpacePercentage,
//     vegetationHealth: cityData.VegetationHealth_value,
//     greenSpaceDistribution: cityData.GreenSpaceDistribution_value,
//     vegetationIndicatorColor: cityData.VegetationHealth_color,
//     distributionIndicatorColor: cityData.GreenSpaceDistribution_color,
//   };

//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <CityLayout cityData={formattedCityData} />
//     </Suspense>
//   );
// }


// src/app/[city]/page.tsx
export const runtime = 'nodejs';

import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import CityLayout from '@/components/CityLayout';


import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';


// 型定義（必要に応じて調整）
type CityRecord = {
  Name: string;
  Latitude: string;
  Longitude: string;
  URL: string;
  Radius: string;
  GreenSpacePercentage: string;
  VegetationHealth_value: string;
  GreenSpaceDistribution_value: string;
  VegetationHealth_color: string;
  GreenSpaceDistribution_color: string;
};

type CityAdditionalData = {
  greenSpacePercentage: string;
  vegetationHealth: string;
  greenSpaceDistribution: string;
  vegetationIndicatorColor: string;
  distributionIndicatorColor: string;
};

type HardcodedCityData = {
  name: string;
  latitude: string;
  longitude: string;
  url: string;
  radius: string;
} & CityAdditionalData;

type CityKey = 'new-york-city' | 'tokyo' | 'sydney';

// 追加データのfallback
const cityAdditionalData: Record<CityKey, CityAdditionalData> = {
  'new-york-city': {
    greenSpacePercentage: '23',
    vegetationHealth: '0.64',
    greenSpaceDistribution: '9',
    vegetationIndicatorColor: '#FDBA74',
    distributionIndicatorColor: '#b9c3ab',
  },
  tokyo: {
    greenSpacePercentage: '20',
    vegetationHealth: '0.66',
    greenSpaceDistribution: '5',
    vegetationIndicatorColor: '#d7bd51',
    distributionIndicatorColor: '#bec1b7',
  },
  sydney: {
    greenSpacePercentage: '42',
    vegetationHealth: '0.69',
    greenSpaceDistribution: '33',
    vegetationIndicatorColor: '#d1bd4e',
    distributionIndicatorColor: '#9fc26b',
  },
};

// CSVデータを取得する関数
// async function getCityData(): Promise<CityRecord[]> {
//   try {
//     // NEXT_PUBLIC_API_URL が設定されていなければ localhost を使う
//     const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://urban_greenness_visualization.vercel.app';
//     const url = new URL('/api/cities', baseUrl).toString();
//     const response = await fetch(url);
//     const data = await response.json();
//     return data.cities;
//   } catch (error) {
//     console.error('Error fetching city data:', error);
//     return [];
//   }
// }
// CSVデータを取得する関数
async function getCityData(): Promise<CityRecord[]> {
  try {
    // APIコールを試みる
    if (process.env.NEXT_PUBLIC_API_URL) {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const url = new URL('/api/cities', baseUrl).toString();
      const response = await fetch(url);
      const data = await response.json();
      return data.cities;
    }
    
    // ローカル環境ではCSVファイルを直接読み込む
    const filePath = path.join(process.cwd(), 'public', 'city_data.csv');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true
    });
    
    return records;
  } catch (error) {
    console.error('Error fetching city data:', error);
    return [];
  }
}

export async function generateStaticParams() {
  const cities = await getCityData();
  if (!cities || cities.length === 0) {
    return [
      { city: 'new-york-city' as const },
      { city: 'tokyo' as const },
      { city: 'sydney' as const },
    ];
  }
  return cities.map((city: CityRecord) => ({
    city: city.Name.toLowerCase().replace(/\s+/g, '-'),
  }));
}

// ページコンポーネント（サーバーコンポーネント）として定義
export default async function CityPage({ params }: { params: { city: string } }) {
  // params は非同期の API なので await してから使用
  const { city } = await Promise.resolve(params);
  const cities = await getCityData();

  if (!cities || cities.length === 0) {
    const hardcodedData: Record<CityKey, HardcodedCityData> = {
      'new-york-city': {
        name: 'New York City',
        latitude: '40.71427',
        longitude: '-74.00597',
        url: 'https://hugsi.green/cities/New_York_City',
        radius: '100',
        ...cityAdditionalData['new-york-city'],
      },
      tokyo: {
        name: 'Tokyo',
        latitude: '35.6895',
        longitude: '139.69171',
        url: 'https://hugsi.green/cities/Tokyo',
        radius: '100',
        ...cityAdditionalData['tokyo'],
      },
      sydney: {
        name: 'Sydney',
        latitude: '-33.865143',
        longitude: '151.2099',
        url: 'https://hugsi.green/cities/Sydney',
        radius: '100',
        ...cityAdditionalData['sydney'],
      },
    };

    const cityData = hardcodedData[city as CityKey];
    if (!cityData) {
      notFound();
    }
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <CityLayout cityData={cityData} />
      </Suspense>
    );
  }

  // URLのスラッグから都市データを検索
  const cityData = cities.find((c: CityRecord) => c.Name.toLowerCase().replace(/\s+/g, '-') === city);
  if (!cityData) {
    notFound();
  }

  const formattedCityData = {
    ...(cityAdditionalData[city as CityKey] || {}),
    name: cityData.Name,
    latitude: cityData.Latitude,
    longitude: cityData.Longitude,
    url: cityData.URL,
    radius: cityData.Radius,
    greenSpacePercentage: cityData.GreenSpacePercentage,
    vegetationHealth: cityData.VegetationHealth_value,
    greenSpaceDistribution: cityData.GreenSpaceDistribution_value,
    vegetationIndicatorColor: cityData.VegetationHealth_color,
    distributionIndicatorColor: cityData.GreenSpaceDistribution_color,
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CityLayout cityData={formattedCityData} />
    </Suspense>
  );
}
