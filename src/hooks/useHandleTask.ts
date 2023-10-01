import { useState } from 'react';
import { Task } from '../interfaces/task';
import Swal from 'sweetalert2';

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
		return true;
	};

	const deleteTask = (id: number) => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!',
		}).then((result) => {
			if (result.isConfirmed) {
				const newTaskList = taskList.filter((task) => task.id !== id);
				setTaskList(newTaskList);
				Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
			}
		});
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
		completeTask,
	};
};

export default useHandleTask;
