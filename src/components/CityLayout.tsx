// src/components/CityLayout.tsx
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './CityLayout.css';

type CityProps = {
  name: string;
  latitude: string;
  longitude: string;
  url: string;
  radius: string;
  greenSpacePercentage?: string;
  vegetationHealth?: string; // VegetationHealth_value (例: "0.64")
  greenSpaceDistribution?: string; // GreenSpaceDistribution_value (例: "9")
  vegetationIndicatorColor?: string; // (例: "#FDBA74")
  distributionIndicatorColor?: string; // (例: "#b9c3ab")
};

export default function CityLayout({ cityData }: { cityData: CityProps }) {
  // CSV から渡された値がない場合はデフォルト値を使用
  const greenSpacePercentage = cityData.greenSpacePercentage || '23';
  const vegetationHealth = cityData.vegetationHealth || '0.64';
  const greenSpaceDistribution = cityData.greenSpaceDistribution || '0.64';
  // const vegetationIndicatorColor = cityData.vegetationIndicatorColor || '#FDBA74';
  // const distributionIndicatorColor = cityData.distributionIndicatorColor || '#b9c3ab';

  useEffect(() => {
    const layers = [
      { id: 'layer1', delay: 0 },
      { id: 'layer2', delay: 1000 },
      { id: 'layer3', delay: 1500 },
      { id: 'layer4', delay: 2000 },
    ];

    const labels = [
      { id: 'label1', delay: 3000 },
      { id: 'label2', delay: 3500 },
      { id: 'label3', delay: 4000 },
    ];

    function animateElement(id: string, delay: number, duration = 1500) {
      const el = document.getElementById(id);
      if (!el) return;
      el.style.display = 'block';
      el.style.opacity = '0';
      el.style.minWidth = '5rem';
      el.style.transform = 'translateY(-50px)';
      el.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, delay);
    }

    layers.forEach((layer) => animateElement(layer.id, layer.delay));
    labels.forEach((label) => animateElement(label.id, label.delay, 1000));
  }, []);

  const cityName = cityData.name || 'Unknown City';
  const citySlug = cityName.toLowerCase().replace(/\s+/g, '-');

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/images/placeholder.svg';
  };

  return (
    <div>
      <div className="breadcrumb-heading-wrapper">
        <div className="breadcrumb md:text-xl">
          <Link href="/" className="breadcrumb-link">
            Home
          </Link>
          <span className="breadcrumb-separator">&gt;</span>
          <span className="breadcrumb-current">{cityName}</span>
        </div>
        <div className="heading">
          <h1 id="title" className="text-5xl">
            {cityName}
          </h1>
          <div className="hugsi-link-container">
            <img
              src="/images/husqvarna_logo.svg"
              alt="Husqvarna Logo"
              className="hugsi-logo"
              onError={handleImageError}
            />
            <a href={cityData.url} target="_blank" className="hugsi-link">
              <p className="md:text-xl">hugsi.green page</p>
              <img
                src="/images/icons8-external-link.svg"
                alt="External Link"
                className="external-logo"
                onError={handleImageError}
              />
            </a>
          </div>
        </div>
      </div>

      <div className="container">
        <img
          id="layer1"
          className="tile"
          src={`/images/${citySlug}/layer1.svg`}
          alt="Layer 1"
          onError={handleImageError}
        />
        <img
          id="layer2"
          className="tile"
          src={`/images/${citySlug}/layer2.svg`}
          alt="Layer 2"
          onError={handleImageError}
        />
        <img
          id="layer3"
          className="tile"
          src={`/images/${citySlug}/layer3.svg`}
          alt="Layer 3"
          onError={handleImageError}
        />
        <img
          id="layer4"
          className="tile"
          src={`/images/${citySlug}/layer4.svg`}
          alt="Layer 4"
          onError={handleImageError}
        />

        {/* label1: 緑地面積 */}
        <div id="label1" className="tile label label1 flex gap-2 w-72">
          <div className="flex items-center gap-1 md:gap-4">
            <div className="text-lg md:text-5xl font-medium">{greenSpacePercentage}%</div>
            <div className="text-opacity-50 text-xs md:text-xl w-full leading-none space-mono-regular">
              Percentage of urban green space
            </div>
          </div>
          <div className="flex items-center gap-1 md:gap-4 mt-3">
            <div className="flex flex-col items-center">
              <div className="relative overflow-hidden">
                <Image
                  src="/images/icons/trees.svg"
                  alt="Trees"
                  width={48}
                  height={48}
                  className="w-6 h-6 md:w-12 md:h-12"
                />
              </div>
              <div className="text-[9px] md:text-sm leading-7 space-mono-regular">Trees</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="relative overflow-hidden">
                <Image
                  src="/images/icons/grass.svg"
                  alt="Grass"
                  width={48}
                  height={48}
                  className="w-6 h-6 md:w-12 md:h-12"
                />
              </div>
              <div className="text-[9px] md:text-sm leading-7 space-mono-regular">Grass</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="relative overflow-hidden">
                <Image
                  src="/images/icons/water.svg"
                  alt="Water"
                  width={48}
                  height={48}
                  className="w-6 h-6 md:w-12 md:h-12"
                />
              </div>
              <div className="text-[9px] md:text-sm leading-7 space-mono-regular">Water</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="relative overflow-hidden">
                <Image
                  src="/images/icons/other.svg"
                  alt="Other"
                  width={48}
                  height={48}
                  className="w-6 h-6 md:w-12 md:h-12"
                />
              </div>
              <div className="text-[9px] md:text-sm leading-7 space-mono-regular">Other</div>
            </div>
          </div>
        </div>

        {/* label2: Average health */}
        <div id="label2" className="tile label label2 flex gap-2 w-72">
          <div className="flex items-center gap-1 md:gap-4">
            <div className="text-lg md:text-5xl font-medium">{vegetationHealth}</div>
            <div className=" text-opacity-50 text-xs md:text-xl w-fill leading-none space-mono-regular ">
              Average health of urban vegetation
            </div>
          </div>
          <div className="w-28 h-6 md:w-64 md:h-8 mt-3 relative bg-gradient-to-r from-red-400 via-orange-300 to-lime-500 rounded-sm md:rounded-lg overflow-hidden">
            <div
              className="w-3 h-3 md:w-5 md:h-5 absolute rounded-full border-[3px] border-white top-[6px]"
              style={{
                // 左位置は value * 100 % (例: 0.66 => "66%")
                left: `${parseFloat(vegetationHealth) * 100}%`,
                // backgroundColor: vegetationIndicatorColor,
              }}
            />
          </div>
        </div>

        {/* label3: Distribution */}
        <div id="label3" className="tile label label3 flex gap-2 w-72">
          <div className="flex items-center gap-1 md:gap-4">
            <div className="text-lg md:text-5xl font-medium">{greenSpaceDistribution}%</div>
            <div className=" text-opacity-50 text-xs md:text-xl w-fill leading-none space-mono-regular ">
              Distribution of urban green space
            </div>
          </div>
          <div className="w-28 h-6 md:w-64 md:h-8 mt-3 relative bg-gradient-to-l from-lime-600 via-lime-400 to-stone-300  rounded-sm md:rounded-lg overflow-hidden">
            <div
              className="w-3 h-3 md:w-5 md:h-5 absolute rounded-full border-[3px] border-white top-[6px]"
              style={{
                // 左位置はそのままパーセンテージ文字列 (例: "5%")
                left: `${greenSpaceDistribution}%`,
                top: '6px',
                // backgroundColor: distributionIndicatorColor,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
