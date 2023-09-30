import { useEffect, useRef, useState } from 'react';
import TaskList from './TaskList';
import useHandleTask from '../hooks/useHandleTask';
import { Task } from '../interfaces/task';
import '../css/task.css';

const TaskComponent = () => {
	const [task, setTask] = useState('');
	const [taskId, setTaskId] = useState<null | number>(null);
	const taskRef = useRef<HTMLInputElement | null>(null);
	const {
		getList,
		addTask,
		deleteTask,
		editTask,
		completeTask,
		deleteAllTask,
		deleteDoneTask,
	} = useHandleTask();

	useEffect(() => {
		taskRef.current?.focus();
	}, []);
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (taskRef.current && task === '') {
			taskRef.current.style.border = '1px solid gray';
		}
		setTask(event.target.value);
	};

	const restForm = () => {
		setTask('');
		taskRef.current?.focus();
	};

	const handleValidation = (): boolean => {
		if (taskRef.current && task.trim() === '') {
			taskRef.current.style.border = '1px solid red';
			return false;
		}

		return true;
	};

	const handleEdit = (value: Task) => {
		taskRef.current?.focus();
		setTask(value.task);
		setTaskId(value.id);
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		if (!handleValidation()) return;

		if (taskId) {
			editTask({ id: taskId, task: task });
		} else {
			addTask(task);
		}
		restForm();
	};

	return (
		<main className="container">
			<section className="column">
				<form onSubmit={handleSubmit}>
					<h2>Todo Input</h2>
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
			<section className="column">
				<TaskList
					getList={getList}
					deleteTask={deleteTask}
					editTask={handleEdit}
					completeTask={completeTask}
					deleteAllTask={deleteAllTask}
					deleteDoneTask={deleteDoneTask}
				/>
			</section>
		</main>
	);
};

export default TaskComponent;
