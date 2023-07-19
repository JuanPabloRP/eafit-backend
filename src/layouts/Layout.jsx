import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';

const Layout = () => {
	return (
		<div>
			<Navbar />
			<div>
				<Outlet />
			</div>
		</div>
	);
};

export default Layout;
