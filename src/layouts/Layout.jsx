import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
	return (
		<div>
			<Navbar />
			<div>
				<ToastContainer
					position="top-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="dark"
					toastClassName="bg-gray-800 border border-gray-700 rounded-md p-2"
				/>
				<Outlet />
			</div>
		</div>
	);
};

export default Layout;
