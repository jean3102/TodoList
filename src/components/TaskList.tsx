import { useEffect, useState } from 'react';
import { Task } from '../interfaces/task';
import '../css/taskList.css';
import { FaPen, FaTrashAlt } from 'react-icons/fa/';

interface TaskListProps {
	getList: () => Task[];
	deleteTask: (id: number) => void;
	editTask: (value: Task) => void;
	completeTask: (id: number) => void;
	deleteAllTask: () => void;
	deleteDoneTask: () => void;
}

const TaskList = ({
	getList,
	deleteTask,
	editTask,
	completeTask,
	deleteAllTask,
	deleteDoneTask,
}: TaskListProps) => {
	const [list, setList] = useState<Task[]>([]);

	useEffect(() => {
		setList(getList);
	}, [getList]);

	const completed = () => {
		const newTaskList = getList().filter((task) => task.completed);
		setList(newTaskList);
	};

	const Pending = () => {
		const newTaskList = getList().filter((task) => !task.completed);
		setList(newTaskList);
	};

	return (
		<>
			<section className="list">
				<h2>Todo List</h2>
				<div className="containerButton">
					<button
						onClick={() => {
							setList(getList());
						}}>
						All
					</button>
					<button onClick={completed}>Done</button>
					<button onClick={Pending}>Todo</button>
				</div>
				<ul>
					{list.map((task, key) => (
						<li key={task.id}>
							<div className="leftList">
								{task.completed ? (
									<p>
										<span> {key+=1} - </span>
										<s style={{ color: 'red' }}> {task.task}</s>
									</p>
								) : (
									<p>
										{key+=1} - {task.task}
									</p>
								)}
							</div>
							<div className="rightList">
								<input
									type="checkbox"
									checked={task.completed}
									readOnly
									onClick={() => completeTask(task.id)}
								/>
								<FaPen onClick={() => editTask(task)} />
								<FaTrashAlt onClick={() => deleteTask(task.id)} />
							</div>
						</li>
					))}
				</ul>
				{list.length > 0 ? (
					<div className="footList">
						<button onClick={() => deleteDoneTask()}>Delete done task</button>
						<button onClick={() => deleteAllTask()}>Delete all task</button>
					</div>
				) : (
					''
				)}
			</section>
		</>
	);
};

export default TaskList;
