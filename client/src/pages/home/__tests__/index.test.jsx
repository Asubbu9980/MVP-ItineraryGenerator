


// Import necessary libraries and utilities for testing
// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import { Auth0Provider, useAuth0 } from '@auth0/auth0-react'; // Assuming you have an Auth0Provider in your app
// import IndexPage from '../index';
// import { getTripDetailsApi } from '../../../helpers/trip_helper';

// // Mock the LoaderContext
// jest.mock('../../../context/LoaderContext', () => ({
//     __esModule: true,
//     default: {
//         useContext: jest.fn().mockReturnValue({
//             loading: false,
//             startLoading: jest.fn(),
//         }),
//     },
// }));

// // Mock the getTripDetailsApi function
// jest.mock('../../../helpers/trip_helper', () => ({
//     __esModule: true,
//     getTripDetailsApi: jest.fn().mockResolvedValue({
//         data: {
//             trip: {
//                 // Mock trip data here
//             },
//         },
//     }),
// }));

// // Mock Auth0 useAuth0 hook
// jest.mock('@auth0/auth0-react', () => ({
//     useAuth0: jest.fn().mockReturnValue({
//         isAuthenticated: true,
//     }),
//     Auth0Provider: ({ children }) => <>{children}</>, // Add a mock Auth0Provider component
// }));

// describe('IndexPage Component', () => {
//     it('renders IndexPage component', () => {
//         render(
//             <Auth0Provider>
//                 <IndexPage />
//             </Auth0Provider>
//         );
//         // You can add more specific assertions based on your UI
//         expect(screen.getByLabelText('Origin')).toBeInTheDocument();
//         expect(screen.getByLabelText('Destination')).toBeInTheDocument();
//         expect(screen.getByLabelText('Start Date')).toBeInTheDocument();
//         expect(screen.getByLabelText('End Date')).toBeInTheDocument();
//         expect(screen.getByText('Start Planning')).toBeInTheDocument();
//     });

//     it('submits the form and fetches trip data', async () => {
//         render(
//             <Auth0Provider>
//                 <IndexPage />
//             </Auth0Provider>
//         );

//         // Mock user input
//         fireEvent.change(screen.getByLabelText('Origin'), { target: { value: 'Hyderabad' } });
//         fireEvent.change(screen.getByLabelText('Destination'), { target: { value: 'Goa' } });
//         fireEvent.change(screen.getByLabelText('Start Date'), { target: { value: '2023-10-30' } });
//         fireEvent.change(screen.getByLabelText('End Date'), { target: { value: '2023-11-05' } });

//         fireEvent.click(screen.getByText('Start Planning'));

//         // Wait for the asynchronous operation (fetching trip data) to complete
//         await waitFor(() => {
//             expect(getTripDetailsApi).toHaveBeenCalledWith({
//                 source: 'Hyderabad',
//                 destination: 'Goa',
//                 start_date: '30-10-2023',
//                 end_date: '5-11-2023',
//             });
//         });

//         // You can add more specific assertions based on your UI
//         expect(screen.getByText('Itinerary')).toBeInTheDocument();
//     });

//     // Add more test cases as needed
// });
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react'; // Import useAuth0
import IndexPage from '../index';
import { getTripDetailsApi } from '../../../helpers/trip_helper';

// Mock the LoaderContext
jest.mock('../../../context/LoaderContext', () => ({
    __esModule: true,
    default: {
        useContext: jest.fn().mockReturnValue({
            loading: false,
            startLoading: jest.fn(),
        }),
    },
}));

// Mock the getTripDetailsApi function
jest.mock('../../../helpers/trip_helper', () => ({
    __esModule: true,
    getTripDetailsApi: jest.fn().mockResolvedValue({
        data: {
            trip: {
                // Mock trip data here
            },
        },
    }),
}));

// Mock useAuth0
jest.mock('@auth0/auth0-react');

describe('IndexPage Component', () => {
    it('renders IndexPage component', async () => {
        // Mock the useAuth0 hook
        useAuth0.mockReturnValue({
            isAuthenticated: true,
        });

        render(
            <Auth0Provider>
                <IndexPage />
            </Auth0Provider>
        );
        // You can add more specific assertions based on your UI
        // expect(screen.getByLabelText('Source')).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getByLabelText('Origin')).toBeInTheDocument();
        });

        expect(screen.getByLabelText('Destination')).toBeInTheDocument();
        expect(screen.getByLabelText('Start Date')).toBeInTheDocument();
        expect(screen.getByLabelText('End Date')).toBeInTheDocument();
        expect(screen.getByText('Start Planning')).toBeInTheDocument();
    });

    it('submits the form and fetches trip data', async () => {
        // Mock the useAuth0 hook
        useAuth0.mockReturnValue({
            isAuthenticated: true,
        });

        render(
            <Auth0Provider>
                <IndexPage />
            </Auth0Provider>
        );

        // Mock user input
        fireEvent.change(screen.getByLabelText('Origin'), { target: { value: 'Hyderabad' } });
        fireEvent.change(screen.getByLabelText('Destination'), { target: { value: 'Goa' } });
        fireEvent.change(screen.getByLabelText('Start Date'), { target: { value: '2023-10-30' } });
        fireEvent.change(screen.getByLabelText('End Date'), { target: { value: '2023-11-05' } });

        fireEvent.click(screen.getByText('Start Planning'));

        // Wait for the asynchronous operation (fetching trip data) to complete
        await waitFor(() => {
            expect(getTripDetailsApi).toHaveBeenCalledWith({
                source: 'Hyderabad',
                destination: 'Goa',
                start_date: '30-10-2023',
                end_date: '5-11-2023',
            });
        });

        // You can add more specific assertions based on your UI
        expect(screen.getByText('Itinerary')).toBeInTheDocument();
    });

    // Add more test cases as needed
});
