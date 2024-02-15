import { clsx, type ClassValue } from "clsx"
import { useState } from "react";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const makeRequest = (url: any): string => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'http://' + url;
    }
    return url;
};

export const getDomainName = (url: string) => {
    try {
        if (url.startsWith('https://')) {
        url = url.replace(/^https?:\/\//, '');
        }
        if (url.startsWith('http://')) {
        url = url.replace(/^https?:\/\//, '');
        }
        if (url.startsWith('www.')) {
        url = url.substring(4);
        }
    } catch (error) {
        console.error('Invalid URL:', error);
        return null;
    }
    return url;
};


export const categoryTypeMapping: any = {
    0: "other",
    1: "gambling",
    2: 'scam',
    3: 'fake'
}