// src/app/page.tsx
'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

import NextImage from 'next/image';

// 環境変数からMapboxアクセストークンを取得
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

export default function Home() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // 地図の初期化
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [139.69171, 35.6895], // 東京を中心に設定
      zoom: 1,
      renderWorldCopies: false,
    });

    map.current.on('load', () => {
      if (!map.current) return;

      map.current.setProjection('mercator'); // 投影方法

      // SVGアイコンとして使用するデータ
      const svgIcon = `
        <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="19" fill="#186000" fill-opacity="0.2" stroke="#186000" stroke-width="4"/>
        </svg>
      `;

      // const img = new Image();
      // img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgIcon)}`;
      const img = new window.Image();
      img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgIcon)}`;

      img.onload = () => {
        if (!map.current) return;

        map.current.addImage('custom-icon', img);

        // src/app/page.tsx の一部を修正
        // 各都市のデータ（背景画像とリンク情報）
        const cityData = {
          'New York City': {
            image: '/image-new-york.svg', // サンプル画像
            link: '/new-york-city', // ハイフン付きに修正
          },
          Tokyo: {
            image: '/image-tokyo.svg',
            link: '/tokyo',
          },
          Sydney: {
            image: '/image-sydney.svg', // サンプル画像
            link: '/sydney',
          },
        };

        // GeoJSONデータ
        // const cities = {
        //   type: 'FeatureCollection',
        //   features: [
        //     {
        //       type: 'Feature',
        //       geometry: {
        //         type: 'Point',
        //         coordinates: [-74.00597, 40.71427], // New York City
        //       },
        //       properties: { description: 'New York City' },
        //     },
        //     {
        //       type: 'Feature',
        //       geometry: {
        //         type: 'Point',
        //         coordinates: [139.69171, 35.6895], // Tokyo
        //       },
        //       properties: { description: 'Tokyo' },
        //     },
        //     {
        //       type: 'Feature',
        //       geometry: {
        //         type: 'Point',
        //         coordinates: [151.2099, -33.865143], // Sydney
        //       },
        //       properties: { description: 'Sydney' },
        //     },
        //   ],
        // };

        // map.current.addSource('cities', {
        //   type: 'geojson',
        //   data: cities,
        // });
        // GeoJSONデータを明示的に型付け
        const cities: FeatureCollection<Geometry, GeoJsonProperties> = {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [-74.00597, 40.71427],
              },
              properties: { description: 'New York City' },
            },
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [139.69171, 35.6895],
              },
              properties: { description: 'Tokyo' },
            },
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [151.2099, -33.865143],
              },
              properties: { description: 'Sydney' },
            },
          ],
        };

        map.current.addSource('cities', {
          type: 'geojson',
          data: cities, // ここで cities が正しくFeatureCollectionと認識される
        });

        map.current.addLayer({
          id: 'city-symbols',
          type: 'symbol',
          source: 'cities',
          layout: {
            'icon-image': 'custom-icon', // SVGアイコン名
            'icon-size': 1, // アイコンサイズ調整
            'icon-allow-overlap': true, // 重なり許可
          },
        });

        map.current.on('click', 'city-symbols', (e) => {
          if (!e.features || e.features.length === 0 || !map.current) return;

          const coordinates = e.features[0].geometry.coordinates.slice();
          const description = e.features[0].properties.description;

          const cityInfo = cityData[description as keyof typeof cityData];
          const popupContent = `
            <div class="popup-content">
              <img class="popup-image" src="${cityInfo.image}" alt="${description}" />
              <a class="popup-link" href="${cityInfo.link}">
                ${description}
              </a>
            </div>
          `;

          new mapboxgl.Popup({
            closeButton: true,
            closeOnClick: true,
          })
            .setLngLat(coordinates as [number, number])
            .setHTML(popupContent)
            .addTo(map.current);
        });

        setLoaded(true);
      };
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen my-2">
      <div className="heading mb-8 ">
        <div className="flex flex-row gap-1 items-center mb-1">
          <NextImage src="icon256.svg" alt="icon256 " width={40} height={40} />
          <h1 className="text-xl md:text-3xl" id="title">
            Urban <span className="text-[#186000]">Greenness</span> Visualization
          </h1>
        </div>
        <div className="flex flex-col items-start gap-0">
          <p>Visualization of major cities in the world</p>
          <div className="hugsi-link-container">
            <p className=" data-credit">Data credit: </p>
            <a href="https://hugsi.green/" target="_blank" className="hugsi-link">
              <p className=" ">hugsi.green</p>
            </a>
          </div>
        </div>
      </div>

      <div ref={mapContainer} className="w-full aspect-3/4 md:w-4/5 md:aspect-16/9 md:min-w-6xl" />

      {/* スタイル定義 */}
      <style jsx global>{`
        .popup-content {
          display: flex;
          align-items: center;
          flex-direction: column;
        }
        .popup-image {
          width: 20vw;
          height: auto;
          // margin-right: 10px;
        }
        .popup-link {
          display: flex;
          align-items: center;
          text-decoration: none;
          // color: #186000;
          font-size: 1rem;
          // font-weight: 500;
          margin-top: 0.5rem;
          text-decoration: underline;
        }
        .mapboxgl-popup-close-button {
          font-size: 1.2rem;
          width: 1.5rem;
          height: 1.5rem;
          line-height: 1.5rem;
          transition: all 0.2s;
          border-radius: 2px;
          margin-top: 0.2rem;
          margin-right: 0.2rem;
        }
        .mapboxgl-popup-close-button:hover {
          background-color: #186000;
          opacity: 0.2;
          color: white;
        }
      `}</style>
    </main>
  );
}
