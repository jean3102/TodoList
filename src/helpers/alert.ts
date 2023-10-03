import Swal from 'sweetalert2';

const alertWarning = (errorMSJ: Error) => {
	Swal.fire('Alert!', errorMSJ.message, 'warning');
};

const alertSuccess = (title: string, msj: string) => {
	Swal.fire(title, msj, 'success');
};

const alertConfirm = async (): Promise<boolean> => {
	const alert = await Swal.fire({
		title: 'Are you sure?',
		text: "You won't be able to revert this!",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes, delete it!',
	});

	return alert.isConfirmed;
};

export { alertWarning, alertSuccess, alertConfirm };
