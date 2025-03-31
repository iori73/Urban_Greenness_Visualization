import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

// 都市データの型定義
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

// CSVからデータを読み込む関数
function getCityData(): CityRecord[] {
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
    }) as CityRecord[];
    return records;
  } catch (error) {
    console.error('Error reading CSV:', error);
    return [];
  }
}

export async function GET() {
  const cities = getCityData();
  return NextResponse.json({ cities });
}
