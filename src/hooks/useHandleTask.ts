import { useState } from 'react';
import { Task } from '../interfaces/task';
import { alertConfirm, alertSuccess } from '../helpers/alert';

const useHandleTask = () => {
	const [taskList, setTaskList] = useState<Task[]>([]);

	const addTask = (id: number | null, task: string) => {
		if (id) {
			editTask({ id: id, task: task });
			return true;
		}

		if (existTask(task)) {
			throw new Error('This Task  has already been registered!!');
		}
		setTaskList([
			...taskList,
			{ id: generateId(), task: task, completed: false },
		]);
	};

	const deleteTask = async (id: number) => {
		console.log(`🚀 ------------ id:`, id)
		const isConfirm = await alertConfirm();

		if (isConfirm) {
			const newTaskList = taskList.filter((task) => task.id !== id);
			setTaskList(newTaskList);
			alertSuccess("'Deleted!", 'Your file has been deleted');
		}
	};

	const deleteAllTask = async () => {
		const isConfirm = await alertConfirm();

		if (isConfirm) {
			setTaskList([]);
			alertSuccess("'Deleted!", 'Your file has been deleted');
		}
	};

	const deleteDoneTask = async () => {
		const isConfirm = await alertConfirm();

		if (isConfirm) {
			const newTaskList = taskList.filter((task) => !task.completed);
			setTaskList(newTaskList);
			alertSuccess("'Deleted!", 'Your file has been deleted');
		}
	};

	const editTask = (value: Task) => {
		const newTaskList = taskList.map((task) =>
			task.id === value.id ? { ...task, task: value.task } : task
		);
		setTaskList(newTaskList);
	};

	const completeTask = (id: number) => {
		const newTaskList = taskList.map((task) =>
			task.id === id ? { ...task, completed: !task.completed } : task
		);
		setTaskList(newTaskList);
	};

	const existTask = (task: string) =>
		taskList.some(
			(item) => item.task.toLocaleLowerCase() === task.toLocaleLowerCase()
		);

	const generateId = () => {
		if (taskList.length === 0) return 1;
		return Math.max(...taskList.map((item) => item.id)) + 1; // get last added id  and add 1
	};

	const getList = (): Task[] => taskList.sort((a, b) => b.id - a.id);

	return {
		getList,
		addTask,
		deleteTask,
		deleteAllTask,
		deleteDoneTask,
		completeTask,
	};
};

export default useHandleTask;
