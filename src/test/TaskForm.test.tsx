import { screen, render } from '@testing-library/react';
import TaskForm from '../components/TaskForm';

describe('taskForm', () => {
	test('input and button is rendered', () => {
		render(<TaskForm addTask={() => {}} />);
		screen.getByPlaceholderText(/new task/i);
		screen.getByRole('button', { name: /add new task/i });
	});
});
