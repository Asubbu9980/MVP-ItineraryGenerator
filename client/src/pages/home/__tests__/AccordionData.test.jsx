import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AccordionData from '../../../common/AccordionData'; // Update with the correct path
import '@testing-library/jest-dom';
import dayjs from 'dayjs';
const mockRecentTripData = {
    input: {
        source: 'City A',
        destination: 'City B',
        start_date: '2023-12-01',
        end_date: '2023-12-03',
    },
    output: {
        places_visited: [
            {
                name: 'Place 1',
                date: '2023-12-01',
                description: 'Description 1',
                activity: ['Activity 1', 'Activity 2'],
            },
            // Add more places as needed
        ],
    },
    createdAt: '2023-12-03T12:34:56Z',
};

it('renders without crashing', () => {
    render(<AccordionData recentTripData={mockRecentTripData} />);
    expect(screen.getByText(`${mockRecentTripData.input.source}  to  ${mockRecentTripData.input.destination}  from  ${mockRecentTripData.input.start_date}  to  ${mockRecentTripData.input.end_date},`)).toBeInTheDocument();
    expect(screen.getByText(dayjs(mockRecentTripData.createdAt).format('DD/MM/YYYY h:mm:ss A'))).toBeInTheDocument();
});

test('renders AccordionData component', () => {
    render(<AccordionData recentTripData={mockRecentTripData} />);

    expect(screen.getByText('City A  to  City B  from  2023-12-01  to  2023-12-03,')).toBeInTheDocument();
    expect(screen.getByText('12/03/2023 12:34:56 PM')).toBeInTheDocument();
    expect(screen.getByText('Place 1')).toBeInTheDocument();
    expect(screen.getByText('Activity 1')).toBeInTheDocument();
});

test('expands and collapses accordion on icon click', () => {
    render(<AccordionData recentTripData={mockRecentTripData} />);

    const expandIcon = screen.getByTestId('expand-more-icon');
    fireEvent.click(expandIcon);

    expect(screen.getByText('Place 1')).toBeInTheDocument();

    fireEvent.click(expandIcon);

    expect(screen.queryByText('Place 1')).not.toBeInTheDocument();
});

// Add more test cases as needed
