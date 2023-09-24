import { Task } from '../interfaces/task';

interface TaskListProps {
	tasks: Task[];
}

const TaskList = ({ tasks }: TaskListProps) => {
	return (
		<section>
			<h2>Task List</h2>
			<ul>
				{tasks.map((task, index) => (
					<li key={index}>
						<p>{task.task}</p>
						<button>Delete Task</button>
					</li>
				))}
			</ul>
		</section>
	);
};

export default TaskList;
