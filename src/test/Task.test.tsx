import { render, screen } from '@testing-library/react';
import App from '../App';
describe('Task component', () => {
	beforeEach(() => {
		render(<App />);
	});

	test('check if TaskForm if rendered', () => {
		screen.getByText(/Todo Input/i);
	});

	test('check if taskList is rendered', () => {
		screen.getByText(/Task List/i);
	});
});
