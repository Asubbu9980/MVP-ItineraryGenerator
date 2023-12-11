import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { LoaderProvider, useAppLoaderContext } from '../../../context/LoaderContext';
// import Route from "../../../routes"

const MockComponent = () => {
    const { loading, startLoading } = useAppLoaderContext();
    return (
        <div>
            {loading ? 'Loading...' : 'Not loading'}
            <button onClick={() => startLoading(!loading)}>Toggle loading</button>
        </div>
    );
};

describe('LoaderProvider', () => {
    it('provides loading state to child components', () => {
        render(
            <LoaderProvider>
                {/* <Route /> */}<MockComponent />
            </LoaderProvider>
        );
        expect(screen.getByText('Not loading')).toBeInTheDocument();
    });

    it('allows child components to update loading state', () => {
        render(
            <LoaderProvider>
                {/* <Route /> */}
                <MockComponent />
            </LoaderProvider>
        );
        const button = screen.getByText('Toggle loading');
        fireEvent.click(button);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
});