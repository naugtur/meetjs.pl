import Link from 'next/link';
import { City } from '@/content/cities';

type MapProps = {
    cities: City[];
};

export const PolandMap = ({ cities }: MapProps) => (
    <div className="flex flex-col gap-2">
        <div className="relative h-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 244" className="h-full w-full">
                <polygon
                    points="70.067,190.289 70.067,198.219 63.458,204.828 51.563,190.289 51.563,181.698 22.156,168.481 12.494,128.164 13.526,97.904 3.783,87.567 2,46.886 48.259,29.704 65.771,12.192 103.77,2.165 111.039,21.774 132.186,31.026 145.403,23.096 222.061,24.418 235.938,33.009 248.825,97.771 235.071,103.595 227.678,115.944 241.225,122.222 239.904,153.943 258,180.096 216.774,223.992 215.452,241.835 200.253,238.531 189.019,229.279 144.081,241.835 133.508,225.314 121.613,227.957 110.378,212.097"
                    fill="#bcd35d"
                    stroke="#2b1932"
                    strokeWidth="2"
                />
                {cities.map((city, index) => (
                    <g key={index}>
                        <Link href={city.href}>
                            <circle
                                cx={city.pointPosition.x}
                                cy={city.pointPosition.y}
                                r="3"
                                fill={
                                    city.status === 'active' ? '#219eab' :
                                        city.status === 'coming-soon' ? '#EAB308' :
                                            city.status === 'new' ? '#219eab' :
                                                '#9CA3AF'
                                }
                                className="cursor-pointer hover:opacity-80"
                            />
                            <text
                                x={city.textPosition.x}
                                y={city.textPosition.y}
                                fontSize="10"
                                fill={
                                    city.status === 'active' ? '#2b1932' :
                                        city.status === 'coming-soon' ? '#2b1932' :
                                            city.status === 'new' ? '#2b1932' :
                                                '#6B7280'
                                }
                                className="cursor-pointer"
                            >
                                {city.name}
                            </text>
                        </Link>
                    </g>
                ))}
            </svg>
        </div>

        <div className="flex justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#219eab]" />
                <span>Active</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#EAB308]" />
                <span>Coming soon</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#9CA3AF]" />
                <Link href="/organization" className="hover:text-purple">
                    Inactive (join as organizer)
                </Link>
            </div>
        </div>
    </div>
);