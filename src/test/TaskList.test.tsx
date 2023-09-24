import { render, screen } from '@testing-library/react';
import TaskList from '../components/TaskList';

describe('TaskList Component', () => {
	test('check if list if rendered', () => {
		render(<TaskList tasks={[]} />);
		const listItems = screen.queryAllByRole('list');
		expect(listItems).toHaveLength(1);
	});
});
