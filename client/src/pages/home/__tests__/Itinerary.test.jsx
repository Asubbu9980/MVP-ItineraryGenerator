
// import React from 'react';
// import { render, screen } from '@testing-library/react';
// // import userEvent from '@testing-library/user-event';
// import '@testing-library/jest-dom';
// import Itinerary from '../../../common/Itinerary';

// // Mock the ItineraryMapModal component
// jest.mock('../../../common/ItineraryMapModal', () => {
//     return jest.fn(() => null);
// });

// describe('Itinerary Component', () => {
//     const mockTripData = {
//         places_visited: [
//             {
//                 name: 'Day 1 - Test Place',
//                 date: '2022-01-01',
//                 description: 'Test Description',
//                 activity: ['Test Activity 1', 'Test Activity 2'],
//                 popular_places: ['Test Place 1', 'Test Place 2'],
//                 accommodation: [
//                     {
//                         name: 'Test Accommodation',
//                         address: 'Test Address',
//                         price_per_night: '100'
//                     }
//                 ],
//                 food_choices: [
//                     {
//                         name: 'Test Food',
//                         address: 'Test Food Address',
//                         price: '10'
//                     }
//                 ],
//                 transportation: {
//                     flight: {
//                         price: '200'
//                     },
//                     train: {
//                         price: '100'
//                     },
//                     bus: {
//                         price: '50'
//                     }
//                 }
//             }
//         ]
//     };

//     // it('renders itinerary details', () => {
//     //     render(<Itinerary tripData={mockTripData} />);

//     //     expect(screen.getByText('Your Plan Details')).toBeInTheDocument();
//     //     expect(screen.getByText('Day 1')).toBeInTheDocument();
//     //     // Add more assertions for other elements
//     // });

//     it('renders without crashing', () => {
//         render(<Itinerary tripData={mockTripData} />);
//     });

//     it('displays the correct trip details', () => {
//         render(<Itinerary tripData={mockTripData} />);
//         expect(screen.getByText('Your Plan Details')).toBeInTheDocument();
//         expect(screen.getByText('Day 1 - Test Place')).toBeInTheDocument();
//         expect(screen.getByText('Test Description')).toBeInTheDocument();
//         expect(screen.getByText('Test Activity 1')).toBeInTheDocument();
//         expect(screen.getByText('Test Activity 2')).toBeInTheDocument();
//         expect(screen.getByText('Test Place 1')).toBeInTheDocument();
//         expect(screen.getByText('Test Place 2')).toBeInTheDocument();
//         expect(screen.getByText('Test Accommodation')).toBeInTheDocument();
//         expect(screen.getByText('Test Address')).toBeInTheDocument();
//         expect(screen.getByText('100')).toBeInTheDocument();
//         expect(screen.getByText('Test Food')).toBeInTheDocument();
//         expect(screen.getByText('Test Food Address')).toBeInTheDocument();
//         expect(screen.getByText('10')).toBeInTheDocument();
//         expect(screen.getByText('Flight: 200')).toBeInTheDocument();
//         expect(screen.getByText('Train: 100')).toBeInTheDocument();
//         expect(screen.getByText('Bus: 50')).toBeInTheDocument();
//     });

//     it('renders recommended stay chip when recommended stay is present', () => {
//         const tripDataWithRecommendedStay = {
//             ...mockTripData,
//             places_visited: [
//                 {
//                     recommended_stay: 'Best Hotel',
//                     // Other mock data...
//                 },
//             ],
//         };
//         render(<Itinerary tripData={tripDataWithRecommendedStay} />);
//         expect(screen.getByText('Recommended Stay: Best Hotel')).toBeInTheDocument();
//     });

//     it('does not render recommended stay chip when recommended stay is not present', () => {
//         render(<Itinerary tripData={mockTripData} />);
//         expect(screen.queryByText('Recommended Stay:')).toBeNull();
//     });

//     it('renders activity chips when activities are present', () => {
//         const tripDataWithActivities = {
//             ...mockTripData,
//             places_visited: [
//                 {
//                     activity: ['Hiking', 'Sightseeing'],
//                     // Other mock data...
//                 },
//             ],
//         };
//         render(<Itinerary tripData={tripDataWithActivities} />);
//         expect(screen.getByText('Activities')).toBeInTheDocument();
//         expect(screen.getByText('Hiking')).toBeInTheDocument();
//         expect(screen.getByText('Sightseeing')).toBeInTheDocument();
//     });


//     it('opens ItineraryMapModal with correct data', () => {
//         render(<Itinerary tripData={mockTripData} />);

//         // Ensure that ItineraryMapModal is called with the correct data
//         expect(require('../../../common/ItineraryMapModal')).toHaveBeenCalledWith({
//             data: mockTripData.places_visited[0], // Assuming you are passing the first place_visited data
//         }, {});
//     });

// });

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// import Itinerary from './Itinerary'; // Update with the correct path
import '@testing-library/jest-dom';

import Itinerary from '../../../common/Itinerary';

// Mock the ItineraryMapModal component
jest.mock('../../../common/ItineraryMapModal', () => {
    return jest.fn(() => null);
});

const mockTripData = {
    places_visited: [
        {
            name: 'Place 1',
            date: '2023-12-01',
            description: 'Description 1',
            activity: ['Activity 1', 'Activity 2'],
            popular_places: [{ name: 'Popular Place 1', fee: 10 }],
            accommodation: [{ name: 'Hotel 1', address: 'Address 1', price_per_night: 50 }],
            food_choices: [{ name: 'Food 1', address: 'Food Address 1', price: 20 }],
            transportation: { flight: { from: 'City A', to: 'City B', price: 100 } },
        },
        // Add more places as needed
    ],
};

test('renders Itinerary component', () => {
    render(<Itinerary tripData={mockTripData} />);

    expect(screen.getByText('Your Plan Details')).toBeInTheDocument();
    expect(screen.getByText('Place 1')).toBeInTheDocument();
    expect(screen.getByText('Day 1 - Place 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Recommended Stay:')).toBeInTheDocument();
});

test('opens and closes modal on button click', () => {
    render(<Itinerary tripData={mockTripData} />);

    const viewMapButton = screen.getByText('View Map');
    fireEvent.click(viewMapButton);

    expect(screen.getByText('Map Modal Content')).toBeInTheDocument(); // Update with your modal content check

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    expect(screen.queryByText('Map Modal Content')).not.toBeInTheDocument();
});

test('selects a recommended stay on chip click', () => {
    render(<Itinerary tripData={mockTripData} />);

    const recommendedStayChip = screen.getByText('Recommended Stay: 2 nights');
    fireEvent.click(recommendedStayChip);

    // Add assertions for the expected behavior when a recommended stay is selected
    expect(screen.getByText('Selected Recommended Stay: 2 nights')).toBeInTheDocument();
});

// Add more test cases as needed
