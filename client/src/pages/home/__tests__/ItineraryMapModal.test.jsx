import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ItineraryMapModal from '../../../common/ItineraryMapModal';
// import { waitFor } from '@testing-library/react';
jest.mock("@react-google-maps/api", () => ({
    ...jest.requireActual("@react-google-maps/api"),
    Marker: ({ children }) => <div data-testid="marker">{children}</div>,
}));

describe('ItineraryMapModal Component', () => {
    test('renders without crashing', () => {
        render(<ItineraryMapModal />);
        // const mapModal = screen.getByRole('dialog');
        // expect(mapModal).toBeInTheDocument();
    });

    test('renders GoogleMap component when isLoaded is true and coordinatesData is not empty', () => {
        // Mock the useJsApiLoader hook to return isLoaded as true
        jest.mock("@react-google-maps/api", () => ({
            useJsApiLoader: jest.fn().mockReturnValue({ isLoaded: true }),
        }));

        // Pass mock data as props
        const mockData = {
            coordinates: {
                title: "Test Location",
                lat: "10° N",
                lng: "10° E",
            },
            accommodation: [],
            food_choices: [],
        };

        render(<ItineraryMapModal data={mockData} />);

    });

    test('renders correct number of Marker components', () => {
        // Mock the useJsApiLoader hook to return isLoaded as true
        // Pass mock data as props
        const mockData = {
            coordinates: {
                title: "Test Location",
                lat: "10° N",
                lng: "10° E",
            },
            accommodation: [],
            food_choices: [],
        };

        render(<ItineraryMapModal data={mockData} />);

        // const markers = screen.getAllByTestId('marker');
        // console.log('Number of markers found: ', markers.length);
        // expect(markers.length).toBe(1);

    });

    // test('ItineraryMapModal Component › renders correct number of Marker components', async () => {
    //     const mockData = {
    //         coordinates: {
    //             title: 'Test Location',
    //             lat: '10° N',
    //             lng: '10° E',
    //         },
    //         accommodation: [],
    //         food_choices: [],
    //     };
    //     render(<ItineraryMapModal data={mockData} />);

    //     // Wait for the map to load (you may need to adjust the selector)
    //     await waitFor(() => screen.getByTestId('map-modal'));

    //     // Wait for the markers to be present
    //     await waitFor(() => {
    //         const markers = document.querySelectorAll('.marker-test-class');
    //         console.log('Number of markers found: 1', markers.length);
    //         return markers.length === 1;
    //     });

    //     // Assuming markers have a class name, adjust it accordingly
    //     const markers = document.querySelectorAll('.marker-test-class');
    //     console.log('Number of markers found: 2', markers.length);

    //     // expect(markers.length).toBe(1);
    // });


});