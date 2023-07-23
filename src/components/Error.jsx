const Error = ({ message }) => {
	return (
		<p className="text-red-600 text-center text-xl font-semibold">
			{message
				? message
				: 'Error al obtener los datos, intente más tarde o comuníquese con el adminstrador'}
		</p>
	);
};

export default Error;
