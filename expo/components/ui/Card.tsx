import React from 'react';
import { View, ViewProps } from 'react-native';

// Generic elevated surface used to group content into a card.
//
//   variant="elevated" (default) — white surface + soft shadow
//   variant="grouped"             — flush with background, hairline border, no shadow
//   variant="tinted"              — fill-tertiary background, no border (chips, callouts)
//
// All variants use the iOS-2xl (22px) radius for a consistent silhouette.

type Variant = 'elevated' | 'grouped' | 'tinted';
type Padding = 'none' | 'sm' | 'md' | 'lg';

interface Props extends ViewProps {
    variant?: Variant;
    padding?: Padding;
    className?: string;
    children?: React.ReactNode;
}

const VARIANT_CLASS: Record<Variant, string> = {
    elevated: 'bg-background-0 shadow-ios-card',
    grouped: 'bg-background-0 border border-outline-100',
    tinted: 'bg-background-100',
};

const PADDING_CLASS: Record<Padding, string> = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-5',
};

export default function Card({
    variant = 'elevated',
    padding = 'md',
    className = '',
    children,
    ...rest
}: Props) {
    const cls = [
        'rounded-ios-2xl',
        VARIANT_CLASS[variant],
        PADDING_CLASS[padding],
        className,
    ].filter(Boolean).join(' ');

    return <View {...rest} className={cls}>{children}</View>;
}
