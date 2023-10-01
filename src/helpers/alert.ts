import Swal from 'sweetalert2';

const handleAlert = (errorMSJ: Error) => {
	Swal.fire('Alert!', errorMSJ.message, 'warning');
};

export { handleAlert };
