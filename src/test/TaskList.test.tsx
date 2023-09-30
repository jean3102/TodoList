import { render, screen } from '@testing-library/react';
import TaskList from '../components/TaskList';

describe('TaskList Component', () => {
	test('check if list if rendered', () => {
		render(
			<TaskList
				getList={() => []}
				editTask={() => {}}
				deleteTask={() => {}}
				completeTask={() => {}}
				deleteAllTask={() => {}}
				deleteDoneTask={() => {}}
			/>
		);
		const listItems = screen.queryAllByRole('list');
		expect(listItems).toHaveLength(1);
	});
});
