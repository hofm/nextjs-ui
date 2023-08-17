import { cn } from '@/lib/utils';
import React, { FC } from 'react';

const ratioMap = {
  '1:1': 'pb-[100%]',
  '4:3': 'pb-[75%]',
  '16:9': 'pb-[56.25%]',
  '21:9': 'pb-[42.85%]',
} as const;

export type Ratio = keyof typeof ratioMap;

type OwnProps = {
  children: React.ReactNode;
  className: string;
  ratio: Ratio;
};

const AspectRatio: FC<OwnProps> = ({ children, className, ratio }) => (
  <div className={cn('relative', className, ratioMap[ratio])}>
    <div className='absolute inset-0'>{children}</div>
  </div>
);

export default AspectRatio;
