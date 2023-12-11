// import { render, screen, waitFor, fireEvent } from '@testing-library/react';
// import Searchhistory from '../../../common/Searchhistory';
// import { getRecentTripDetailsApi } from '../../../helpers/trip_helper';
// import { BrowserRouter as Router } from 'react-router-dom';

// jest.mock('../../../helpers/trip_helper');

// describe('Searchhistory', () => {
//     beforeEach(() => {
//         getRecentTripDetailsApi.mockResolvedValue({
//             data: [
//                 {
//                     input: JSON.stringify({ source: 'Hyderabad', destination: 'Vizag', start_date: '2022-01-01', end_date: '2022-01-05' }),
//                     output: JSON.stringify({ activities: [] }),
//                     createdAt: new Date().toISOString(),
//                 },
//                 // Add more mock data as needed
//             ],
//         });
//     });

//     it('renders without crashing', async () => {
//         render(<Router><Searchhistory setTripData={() => { }} tripData={{}} /></Router>);
//         await waitFor(() => expect(getRecentTripDetailsApi).toHaveBeenCalledTimes(1));
//     });

//     it('displays recent searches', async () => {
//         render(<Router><Searchhistory setTripData={() => { }} tripData={{}} /></Router>);
//         await waitFor(() => expect(getRecentTripDetailsApi).toHaveBeenCalledTimes(1));
//         expect(screen.getByText('Hyderabad  to  Vizag  from  2022-01-01  to  2022-01-05,')).toBeInTheDocument();
//     });

//     it('calls setTripData when a chip is clicked', async () => {
//         const mockSetTripData = jest.fn();
//         render(<Router><Searchhistory setTripData={mockSetTripData} tripData={{}} /></Router>);
//         await waitFor(() => expect(getRecentTripDetailsApi).toHaveBeenCalledTimes(1));
//         fireEvent.click(screen.getByText('Hyderabad  to  Vizag  from  2022-01-01  to  2022-01-05,'));
//         expect(mockSetTripData).toHaveBeenCalledTimes(1);
//     });

//     // Add more tests as needed
// });


// import { render, screen, waitFor, fireEvent } from '@testing-library/react';
// import Searchhistory from './Searchhistory';
// import { getRecentTripDetailsApi } from '../helpers/trip_helper';
// import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Searchhistory from '../../../common/Searchhistory';
import { getRecentTripDetailsApi } from '../../../helpers/trip_helper';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('../../../helpers/trip_helper');

describe('Searchhistory', () => {
    beforeEach(() => {
        getRecentTripDetailsApi.mockResolvedValue({
            data: [
                {
                    input: JSON.stringify({ source: 'Hyderabad', destination: 'Vizag', start_date: '2022-01-01', end_date: '2022-01-05' }),
                    output: JSON.stringify({ activities: [] }),
                    createdAt: new Date().toISOString(),
                },
                // Add more mock data as needed
            ],
        });
    });

    it('renders without crashing', async () => {
        render(<Router><Searchhistory setTripData={() => { }} setTripTitle={() => { }} tripData={{}} /></Router>);
        await waitFor(() => expect(getRecentTripDetailsApi).toHaveBeenCalledTimes(1));
    });

    it('displays recent searches', async () => {
        render(<Router><Searchhistory setTripData={() => { }} setTripTitle={() => { }} tripData={{}} /></Router>);
        await waitFor(() => expect(getRecentTripDetailsApi).toHaveBeenCalledTimes(1));
        expect(screen.getByText('Hyderabad  to  Vizag  from  2022-01-01  to  2022-01-05,')).toBeInTheDocument();
    });

    it('calls setTripData and setTripTitle when a chip is clicked', async () => {
        const mockSetTripData = jest.fn();
        const mockSetTripTitle = jest.fn();
        render(<Router><Searchhistory setTripData={mockSetTripData} setTripTitle={mockSetTripTitle} tripData={{}} /></Router>);
        await waitFor(() => expect(getRecentTripDetailsApi).toHaveBeenCalledTimes(1));
        fireEvent.click(screen.getByText('Hyderabad  to  Vizag  from  2022-01-01  to  2022-01-05,'));
        expect(mockSetTripData).toHaveBeenCalledTimes(1);
        expect(mockSetTripTitle).toHaveBeenCalledTimes(1);
    });

    // Add more tests as needed
});