'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import Ripple from '@/components/lib/ripple';
import { Button, ButtonProps } from '@/components/ui/button';

const RippleButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, onClick, variant, ...props }, ref) => {
    return (
      <Ripple>
        {({ onRippleClick }) => (
          <Button
            className={cn('relative', className)}
            ref={ref}
            variant={variant}
            {...props}
          >
            <div
              className={`absolute bottom-0 left-0 right-0 top-0 ripple${
                variant === undefined ? '' : ' ripple-dark'
              } `}
              onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                onRippleClick(e);
                onClick &&
                  onClick(e as any as React.MouseEvent<HTMLButtonElement>);
              }}
            />
            {children}
          </Button>
        )}
      </Ripple>
    );
  }
);
RippleButton.displayName = 'RippleButton';

export { RippleButton };
