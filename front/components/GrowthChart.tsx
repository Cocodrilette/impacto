import React, { PureComponent } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  ComposedChart,
  Label,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const data = [
  {
    name: '1',
    Target: 1000,
    Current: 1000,
  },
  {
    name: '2',
    Target: 3000,
    Current: 1398,
  },
  {
    name: '2',
    Target: 10000,
    Current: 7000,
  },
];
function GrowthChart() {
  return (
    <Card className='history w-fit'>
      <CardHeader>
        <CardTitle>Growth Chart</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='w-full h-full p-4'>
          <AreaChart width={730} height={300} data={data}>
            <defs>
              <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
                <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
              </linearGradient>
              <linearGradient id='colorPv' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#82ca9d' stopOpacity={0.8} />
                <stop offset='95%' stopColor='#82ca9d' stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey='name'>
              <Label value='Milestones' offset={-5} position='insideBottom' />
            </XAxis>
            <YAxis />
            <Tooltip />
            <Area
              type='monotone'
              dataKey='Target'
              stroke='#8884d8'
              fillOpacity={1}
              fill='url(#colorUv)'
            />
            <Area
              type='monotone'
              dataKey='Current'
              stroke='#82ca9d'
              fillOpacity={1}
              fill='url(#colorPv)'
            />
          </AreaChart>
        </div>
      </CardContent>
    </Card>
  );
}

export default GrowthChart;
