import { Link } from 'react-router-dom';

const NoMatch = () => {
	return (
		<main className="max-w-4xl m-auto text-center flex justify-center items-center h-screen flex-col">
			<h2 className="text-red-700 text-4xl font-semibold pb-4">
				Error, estás intentando ingresar a ruta que no existe
			</h2>
			<Link className="text-2xl text-white hover:text-gray-300" to={'/'}>
				Regresar
			</Link>
		</main>
	);
};

export default NoMatch;
