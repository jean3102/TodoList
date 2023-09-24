import { useState } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import { Task } from '../interfaces/task';



const Task = () => {
	const [taskList, setTaskList] = useState<Task[]>([]);
	const addTask = (value: string) => {
		setTaskList([...taskList, { task: value }]);
	};
	return (
		<>
			<TaskForm addTask={addTask} />
			<TaskList tasks={taskList} />
		</>
	);
};

export default Task;
