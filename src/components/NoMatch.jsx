import { Link } from 'react-router-dom';

const NoMatch = () => {
	return (
		<main className="h-full w-full">
			<h2 className="text-red-700 text-3xl font-semibold pb-4">
				Error estas intentando ingresar a ruta que no existe
			</h2>
			<Link className="text-white " to={'/'}>
				Regresar
			</Link>
		</main>
	);
};

export default NoMatch;
