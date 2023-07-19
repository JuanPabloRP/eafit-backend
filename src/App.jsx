import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Data from './components/Data';
import './App.css';
import Noticias from './pages/Noticias';
import Layout from './layouts/Layout';
import NoMatch from './components/NoMatch';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="" element={<Data />} />
					<Route path="noticias" element={<Noticias />} />
				</Route>

				<Route path="*" element={<NoMatch />} />
			</Routes>
		</Router>
	);
}

export default App;
