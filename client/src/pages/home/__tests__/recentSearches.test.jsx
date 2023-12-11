import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getRecentTripDetailsApi } from '../../../helpers/trip_helper';
import Index from '../../recentSearches/index';
// import AccordionData from '../../../common/AccordionData';
jest.mock('../../../helpers/trip_helper', () => ({
    getRecentTripDetailsApi: jest.fn(),
}));

jest.mock('../../../common/AccordionData', () => () => <div data-testid="accordion-data" />);

describe('Index', () => {
    beforeEach(() => {
        getRecentTripDetailsApi.mockResolvedValue({
            data: [
                {
                    input: JSON.stringify({}),
                    output: JSON.stringify({ activities: [] }),
                    createdAt: new Date().toISOString(),
                },
            ],
        });
    });

    it('renders without crashing', async () => {
        render(<Index />);
        await waitFor(() => expect(screen.getByTestId('accordion-data')).toBeInTheDocument());
    });

    // it('displays loading state', () => {
    //     render(<Index />);
    //     expect(screen.getByRole('progressbar')).toBeInTheDocument();
    // });

    it('displays error message when no itineraries found', async () => {
        getRecentTripDetailsApi.mockResolvedValueOnce({ data: [] });
        render(<Index />);
        await waitFor(() => expect(screen.getByText('No itineraries found in your account.')).toBeInTheDocument());
    });

    it('displays itineraries when data is available', async () => {
        render(<Index />);
        await waitFor(() => expect(screen.getByTestId('accordion-data')).toBeInTheDocument());
    });
});