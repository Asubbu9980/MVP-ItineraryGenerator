import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useAuth0 } from '@auth0/auth0-react';
import { MemoryRouter } from 'react-router-dom';
import HeaderComponent from '../../../layouts/header';

jest.mock('@auth0/auth0-react');

describe('HeaderComponent', () => {
    beforeEach(() => {
        useAuth0.mockReturnValue({
            isLoading: false,
            user: { nickname: 'test' },
            isAuthenticated: true,
            logout: jest.fn(),
            loginWithPopup: jest.fn(),
            getAccessTokenSilently: jest.fn().mockResolvedValue('token'),
            getIdTokenClaims: jest.fn().mockResolvedValue('idToken'),
        });
    });

    it('renders without crashing', () => {
        render(<HeaderComponent />, { wrapper: MemoryRouter });
        expect(screen.getByAltText('logo')).toBeInTheDocument();
    });

    it('displays user nickname when authenticated', () => {
        render(<HeaderComponent />, { wrapper: MemoryRouter });
        expect(screen.getByText('test')).toBeInTheDocument();
    });

    it('opens menu on avatar click', () => {
        render(<HeaderComponent />, { wrapper: MemoryRouter });
        fireEvent.click(screen.getByAltText('John Doe'));
        expect(screen.getByText('Profile')).toBeInTheDocument();
    });

    it('calls logout function on logout button click', () => {
        const { logout } = useAuth0();
        render(<HeaderComponent />, { wrapper: MemoryRouter });
        fireEvent.click(screen.getByAltText('John Doe'));
        fireEvent.click(screen.getByText('Logout'));
        expect(logout).toHaveBeenCalled();
    });
});