import { Task } from '../interfaces/task';

interface TaskListProps {
	tasks: Task[];
}

const TaskList = ({ tasks }: TaskListProps) => {
	return (
		<section>
			<h2>Task List</h2>
			<section>
				<button>All</button>
				<button>Done</button>
				<button>Todo</button>
			</section>
			<ul>
				{tasks.map((task, index) => (
					<li key={index}>
						<p>{task.task}</p>
						<input type="checkbox" />
						<button>Delete Task</button>
						<button>Edit Task</button>
					</li>
				))}
			</ul>
		</section>
	);
};

export default TaskList;
