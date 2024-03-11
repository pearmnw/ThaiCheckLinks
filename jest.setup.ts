import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

afterEach(() => {
    cleanup();
});

jest.mock('next/router', () => ({
    useRouter: jest.fn().mockImplementation(() => ({
        locale: 'en',
        defaultLocale: 'en',
        locales: ['en', 'th'],
    })),
}));