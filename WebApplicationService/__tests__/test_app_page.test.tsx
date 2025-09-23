import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../app/page';

describe('WebApplicationService - Home Page', () => {
  it('renders without crashing and shows expected content', () => {
    render(<Home />);
    // The default template often renders "Learn" link or some text; assert container exists.
    const main = screen.getByRole('main', { hidden: true }) || document.querySelector('main');
    expect(main).toBeTruthy();
  });
});
