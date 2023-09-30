import { useState } from 'react';
import { Task } from '../interfaces/task';

const useHandleTask = () => {
	console.log(`🚀 ------------ useHandleTask:`)

	const [taskList, setTaskList] = useState<Task[]>([]);

	const addTask = (task: string) => {
		if (existTask(task)) return alert('exist');
		setTaskList([
			...taskList,
			{ id: generateId(), task: task, completed: false },
		]);
	};

	const deleteTask = (id: number) => {
		const newTaskList = taskList.filter((task) => task.id !== id);
		setTaskList(newTaskList);
	};

	const deleteAllTask = () => {
		setTaskList([]);
	};

	const deleteDoneTask = () => {
		const newTaskList = taskList.filter((task) => !task.completed);
		setTaskList(newTaskList);
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
		editTask,
		completeTask,
	};
};

export default useHandleTask;
