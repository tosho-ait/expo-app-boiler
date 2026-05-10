import React from 'react';
import { Text, TextProps } from 'react-native';

// iOS 17 type scale. Use these in place of ad-hoc text-{size} + font-{weight}
// combinations so the whole app keeps a coherent typography rhythm.
//
//   <AppText variant="largeTitle" />   34/41   bold
//   <AppText variant="title1" />        28/34   bold
//   <AppText variant="title2" />        22/28   bold
//   <AppText variant="title3" />        20/25   semibold
//   <AppText variant="headline" />      17/22   semibold       (emphasized body)
//   <AppText variant="body" />          17/22   regular        (default)
//   <AppText variant="callout" />       16/21   regular
//   <AppText variant="subhead" />       15/20   regular
//   <AppText variant="footnote" />      13/18   regular
//   <AppText variant="caption" />       12/16   medium
//
// Color tone — `default | secondary | tertiary | inverse | accent | success | error`.

type Variant =
    | 'largeTitle'
    | 'title1'
    | 'title2'
    | 'title3'
    | 'headline'
    | 'body'
    | 'callout'
    | 'subhead'
    | 'footnote'
    | 'caption'
    | 'caption2';

type Tone =
    | 'default'
    | 'secondary'
    | 'tertiary'
    | 'inverse'
    | 'accent'
    | 'brand'
    | 'success'
    | 'warning'
    | 'error';

interface Props extends TextProps {
    variant?: Variant;
    tone?: Tone;
    weight?: 'regular' | 'medium' | 'semibold' | 'bold' | 'black';
    align?: 'left' | 'center' | 'right';
    className?: string;
    children?: React.ReactNode;
}

const VARIANT_CLASS: Record<Variant, string> = {
    largeTitle: 'text-large-title font-bold',
    title1: 'text-title-1 font-bold',
    title2: 'text-title-2 font-bold',
    title3: 'text-title-3 font-semibold',
    headline: 'text-headline font-semibold',
    body: 'text-body font-normal',
    callout: 'text-callout font-normal',
    subhead: 'text-subhead font-normal',
    footnote: 'text-footnote font-normal',
    caption: 'text-caption font-medium',
    caption2: 'text-caption-2 font-medium',
};

const TONE_CLASS: Record<Tone, string> = {
    default: 'text-typography-900',
    secondary: 'text-typography-500',
    tertiary: 'text-typography-400',
    inverse: 'text-typography-0',
    accent: 'text-tertiary-500',
    brand: 'text-primary-800',
    success: 'text-success-600',
    warning: 'text-warning-600',
    error: 'text-error-500',
};

const WEIGHT_CLASS: Record<NonNullable<Props['weight']>, string> = {
    regular: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    black: 'font-black',
};

const ALIGN_CLASS: Record<NonNullable<Props['align']>, string> = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
};

export default function AppText({
    variant = 'body',
    tone = 'default',
    weight,
    align,
    className = '',
    children,
    ...rest
}: Props) {
    const cls = [
        VARIANT_CLASS[variant],
        TONE_CLASS[tone],
        weight ? WEIGHT_CLASS[weight] : '',
        align ? ALIGN_CLASS[align] : '',
        className,
    ].filter(Boolean).join(' ');

    return <Text {...rest} className={cls}>{children}</Text>;
}
