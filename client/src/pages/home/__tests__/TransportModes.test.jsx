import { render, screen } from '@testing-library/react';
import TransportModes from '../TransportModes';
const transportData = [
    {
        id: '1',
        item: 'Flight',
        item_icon: 'flight-icon ',
    },
    {
        id: '2',
        item: 'Car',
        item_icon: 'car-icon ',
    },
    {
        id: '3',
        item: 'Bus',
        item_icon: 'bus-icon ',
    },
    {
        id: '4',
        item: 'Train',
        item_icon: 'train-icon ',

    },
];

describe('TransportModes Component', () => {
    test('renders without crashing', () => {
        render(<TransportModes />);
        const radioGroup = screen.getByRole('radiogroup');
        expect(radioGroup).toBeInTheDocument();
    });

    test('renders correct number of Sheet components', () => {
        render(<TransportModes />);
        const sheets = screen.getAllByRole('radio');
        expect(sheets.length).toBe(4);
    });

    // test('each Sheet component has correct Radio and FormLabel', () => {
    //     render(<TransportModes />);
    //     const radios = screen.getAllByRole('radio');
    //     const labels = screen.getAllByRole('formlabel');
    //     radios.forEach((radio, index) => {
    //         expect(radio).toHaveAttribute('id', `${index + 1}`);
    //         expect(labels[index]).toHaveTextContent(transportData[index].item);
    //     });
    // });
});