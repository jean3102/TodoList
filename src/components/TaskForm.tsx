import { useRef, useState } from 'react';

type TaskFormProp = {
	addTask: (task: string) => void;
};

const TaskForm = ({ addTask }: TaskFormProp) => {
	const [task, setTask] = useState('');
	const taskRef = useRef<HTMLInputElement | null>(null);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (taskRef.current && task === '')
			taskRef.current.style.border = '1px solid gray';
		setTask(event.target.value);
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		if (handleValidation()) if (task) addTask(task);
		restForm();
	};

	const restForm = () => {
		setTask('');
		taskRef.current?.focus();
	};

	const handleValidation = (): boolean => {
		if (taskRef.current && task === '') {
			taskRef.current.style.border = '1px solid red';
			return false;
		}

		return true;
	};
	return (
		<section>
			<h2>Todo Input</h2>
			<form onSubmit={handleSubmit}>
				<input
					value={task}
					ref={taskRef}
					onChange={handleChange}
					type="text"
					placeholder="New Task"
				/>
				<button>Add New Task</button>
			</form>
		</section>
	);
};

export default TaskForm;
