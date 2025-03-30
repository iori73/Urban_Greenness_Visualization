// src/app/[city]/page.tsx
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import CityLayout from '@/components/CityLayout';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

// CSVからデータを読み込む関数
function getCityData() {
  try {
    const csvPath = path.join(process.cwd(), 'public', 'city_data.csv');
    if (!fs.existsSync(csvPath)) {
      console.error('CSV file not found:', csvPath);
      return [];
    }

    const fileContent = fs.readFileSync(csvPath, 'utf8');
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    });

    return records;
  } catch (error) {
    console.error('Error reading CSV:', error);
    return [];
  }
}

// 都市ごとの追加データ（CSV にない項目はここで補完）
const cityAdditionalData = {
  'new-york-city': {
    // CSV に値があればそちらを優先するので、ここは fallback として使う
    // greenSpacePercentage: '0',
  },
  tokyo: {
    greenSpacePercentage: '7.5',
  },
  sydney: {
    greenSpacePercentage: '46',
  },
};

// 都市ページのパラメータを生成
export function generateStaticParams() {
  const cities = getCityData();

  // 空の場合はデフォルト値
  if (!cities || cities.length === 0) {
    return [{ city: 'new-york-city' }, { city: 'tokyo' }, { city: 'sydney' }];
  }

  return cities.map((city) => ({
    city: city.Name.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export default function CityPage({ params }: { params: { city: string } }) {
  const cities = getCityData();

  // CSVが空の場合はハードコードされたデータを使用
  if (!cities || cities.length === 0) {
    const hardcodedData = {
      'new-york-city': {
        name: 'New York City',
        latitude: '40.71427',
        longitude: '-74.00597',
        url: 'https://hugsi.green/cities/New_York_City',
        radius: '100',
        greenSpacePercentage: '0',
        vegetationHealth: '0',
        VegetationHealth_left: '0',
        vegetationIndicatorColor: '#FDBA74',
        greenSpaceDistribution: '0',
        GreenSpaceDistribution_left: '0',
        distributionIndicatorColor: '#b9c3ab',
      },
      tokyo: {
        name: 'Tokyo',
        latitude: '35.6895',
        longitude: '139.69171',
        url: 'https://hugsi.green/cities/Tokyo',
        radius: '100',
        greenSpacePercentage: '7.5',
        vegetationHealth: '0.58',
        VegetationHealth_left: '154',
        vegetationIndicatorColor: '#d7bd51',
        greenSpaceDistribution: '0.42',
        GreenSpaceDistribution_left: '13',
        distributionIndicatorColor: '#bec1b7',
      },
      sydney: {
        name: 'Sydney',
        latitude: '-33.865143',
        longitude: '151.2099',
        url: 'https://hugsi.green/cities/Sydney',
        radius: '100',
        greenSpacePercentage: '46',
        vegetationHealth: '0.81',
        VegetationHealth_left: '160',
        vegetationIndicatorColor: '#d1bd4e',
        greenSpaceDistribution: '0.75',
        GreenSpaceDistribution_left: '85.8',
        distributionIndicatorColor: '#9fc26b',
      },
    };

    const cityData = hardcodedData[params.city];
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
  const cityData = cities.find((city) => city.Name.toLowerCase().replace(/\s+/g, '-') === params.city);

  if (!cityData) {
    notFound();
  }

  // CSV から渡された各値をそのまま CityLayout 用に整形
  const formattedCityData = {
    // 追加データ（CSV にない項目の場合のみ）
    ...cityAdditionalData[params.city],
    name: cityData.Name,
    latitude: cityData.Latitude,
    longitude: cityData.Longitude,
    url: cityData.URL,
    radius: cityData.Radius,
    greenSpacePercentage: cityData.GreenSpacePercentage,
    vegetationHealth: cityData.VegetationHealth_value,
    VegetationHealth_left: cityData.VegetationHealth_left,
    vegetationIndicatorColor: cityData.VegetationHealth_color,
    greenSpaceDistribution: cityData.GreenSpaceDistribution_value,
    GreenSpaceDistribution_left: cityData.GreenSpaceDistribution_left,
    distributionIndicatorColor: cityData.GreenSpaceDistribution_color,
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CityLayout cityData={formattedCityData} />
    </Suspense>
  );
}
