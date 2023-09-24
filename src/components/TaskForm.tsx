import { useRef } from 'react';

type TaskFormProp = {
	addTask: (task: string) => void;
};

const TaskForm = ({ addTask }: TaskFormProp) => {
	const taskRef = useRef<HTMLInputElement | null>(null);

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		if (!taskRef) alert('type task');

		let task = taskRef.current?.value;
		if (!task) return;
		addTask(task);
	};

	return (
		<section>
			<h2>Todo Input</h2>
			<form onSubmit={handleSubmit}>
				<input
					ref={taskRef}
					type="text"
					placeholder="New Task"
				/>
				<button>Add New Task</button>
			</form>
		</section>
	);
};

export default TaskForm;
