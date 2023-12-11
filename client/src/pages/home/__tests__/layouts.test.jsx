import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import UserLayout from '../../../layouts/index';

jest.mock('../../../layouts/header', () => () => <header>Header</header>);
jest.mock('../../../layouts/footer', () => () => <footer>Footer</footer>);

describe('UserLayout', () => {
    it('renders without crashing', () => {
        render(
            <Router>
                <UserLayout />
            </Router>
        );
        expect(screen.getByText('Header')).toBeInTheDocument();
        expect(screen.getByText('Footer')).toBeInTheDocument();
    });

    it('renders children', () => {
        render(
            <Router>
                <UserLayout>
                    <div>Child component</div>
                </UserLayout>
            </Router>
        );
        expect(screen.getByText('Child component')).toBeInTheDocument();
    });
});