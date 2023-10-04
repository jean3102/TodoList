import { useEffect, useRef, useState } from 'react';
import TaskList from './TaskList';
import useHandleTask from '../hooks/useHandleTask';
import { Task } from '../interfaces/task';
import '../css/task.css';
import { alertError, alertWarning } from '../helpers/alert';

const TaskComponent = () => {
	const [task, setTask] = useState('hola, livi como estas');
	const [taskId, setTaskId] = useState<null | number>(null);
	const taskRef = useRef<HTMLInputElement | null>(null);
	const {
		getList,
		addTask,
		deleteTask,
		completeTask,
		deleteAllTask,
		deleteDoneTask,
	} = useHandleTask();

	useEffect(() => {
		taskRef.current?.focus();
	}, []);
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!handleChangeValidation()) return;
		setTask(event.target.value);
	};

	// return true if input have more than 35 characters
	const handleChangeValidation = () => {
		if (taskRef.current && task.trim().length === 34) {
			taskRef.current.style.border = '1px solid red';
			resetInputColor()
			alertWarning('You can not type more than 35 characters')
			setTask('');
			return false;
		}

		return true
		
	};
	const restForm = () => {
		setTask('');
		taskRef.current?.focus();
	};

	const handleSubmitValidation = (): boolean => {
		if (taskRef.current && task.trim() === '') {
			taskRef.current.style.border = '1px solid red';
			resetInputColor()
			return false;
		}
		return true;
	};

	const resetInputColor = () => {
		setTimeout(() => {
			if (taskRef.current) taskRef.current.style.border = '1px solid gray';
		}, 1500);
	}

	const handleEdit = (value: Task) => {
		taskRef.current?.focus();
		setTask(value.task);
		setTaskId(value.id);
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		if (!handleSubmitValidation()) return;

		try {
			addTask(taskId, task);
			restForm();
		} catch (error) {
			alertError(error as Error);
		}
	};

	return (
		<main className="container">
			<section className="column">
				<form onSubmit={handleSubmit}>
					<h2>Todo Input</h2>
					<input
						maxLength={35}
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
