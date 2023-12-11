import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TripPayloadContext, TripPayloadContextProvider } from '../../../context/TripDataContext';

const MockComponent = () => {
    const { tripPayloadState, setTripPayloadState } = React.useContext(TripPayloadContext);
    return (
        <div>
            {tripPayloadState.destination}
            <button onClick={() => setTripPayloadState({ ...tripPayloadState, destination: 'New Destination' })}>
                Update Destination
            </button>
        </div>
    );
};

describe('TripPayloadContextProvider', () => {
    it('provides trip payload state to child components', () => {
        render(
            <TripPayloadContextProvider>
                <MockComponent />
            </TripPayloadContextProvider>
        );
        // expect(screen.getByText('')).toBeInTheDocument();
    });

    it('allows child components to update trip payload state', () => {
        render(
            <TripPayloadContextProvider>
                <MockComponent />
            </TripPayloadContextProvider>
        );
        const button = screen.getByText('Update Destination');
        fireEvent.click(button);
        expect(screen.getByText('New Destination')).toBeInTheDocument();
    });
});


// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { TripPayloadContextProvider, TripPayloadContext, startDateInitialValue, endDateInitialValue } from '../../../context/TripDataContext'; // Update with the correct path

// // Example test case
// test('renders and updates TripPayloadContext values', () => {
//     render(
//         <TripPayloadContextProvider>
//             <YourComponentUsingContext />
//         </TripPayloadContextProvider>
//     );

//     // Check if the component renders correctly
//     expect(screen.getByText('Destination')).toBeInTheDocument();


//     const destinationInput = screen.getByText(/Destination/i);
//     expect(destinationInput).toBeInTheDocument();

//     // Update context values using userEvent
//     userEvent.type(destinationInput, 'New Destination');
//     // Add similar steps for updating other context values

//     // Access the context values after the update and perform assertions
//     const tripPayloadContextValues = screen.getByTestId('trip-payload-context');
//     // Add assertions based on the updated context values
// });

// // Example component using TripPayloadContext
// const YourComponentUsingContext = () => {
//     const { tripPayloadState, setTripPayloadState } = React.useContext(TripPayloadContext);

//     return (
//         <div data-testid="trip-payload-context">
//             {/* Your component code using tripPayloadState and setTripPayloadState */}
//             <label htmlFor="destination">Destination</label>
//             <input
//                 type="text"
//                 id="destination"
//                 value={tripPayloadState.destination}
//                 onChange={(e) => setTripPayloadState((prevState) => ({ ...prevState, destination: e.target.value }))}
//             />
//             {/* Add similar code for other context values */}
//         </div>
//     );
// };
