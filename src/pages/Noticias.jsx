import { useEffect, useState } from 'react';
import CardItem from '../components/CardItem';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { toast } from 'react-toastify';

const Noticias = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);
	const [info, setInfor] = useState([]);
	const [text, setText] = useState('');

	const getInfo = () => {
		const requestOptions = {
			method: 'GET',
			redirect: 'follow',
		};

		fetch('http://localhost:8080/news/findAll', requestOptions)
			.then((response) => response.json())
			.then((result) => {
				setError(false);
				setInfor(result);
			})
			.catch((error) => {
				console.log('error', error);
				setError(true);
			})
			.finally(() => setIsLoading(false));
	};

	useEffect(() => {
		getInfo();
	}, []);

	const deleteNoticia = (id) => {
		const requestOptions = {
			method: 'DELETE',
			redirect: 'follow',
		};

		fetch(`http://localhost:8080/news/delete/${id}`, requestOptions)
			.then((response) => response.text())
			.then((result) => {
				console.log(result);
				toast.success('La noticia se ha eliminado con éxito', {
					position: 'top-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'dark',
				});
			})
			.catch((error) => {
				console.log('error', error);
				toast.error('Error al eliminar la noticia', {
					position: 'top-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'dark',
				});
			})
			.finally(getInfo());
	};

	return (
		<main className="h-full w-full">
			<h2 className="text-3xl mb-4 md:text-5xl font-bold text-center py-4">
				Ver noticias
			</h2>

			<SearchInput isLoading={isLoading} setText={setText} />
			<main>
				{isLoading ? (
					<Loading />
				) : (
					<>
						{error ? (
							<Error />
						) : (
							<Succesfully
								info={info}
								deleteNoticia={deleteNoticia}
								text={text}
							/>
						)}
					</>
				)}
			</main>
		</main>
	);
};

const Succesfully = ({ info, deleteNoticia, text }) => {
	//console.log(info);
	//console.log(text);

	return (
		<section className="flex flex-wrap justify-center items-start">
			{info ? (
				info
					.filter((item) =>
						text?.length > 0
							? item?.title?.toLowerCase()?.includes(text?.toLowerCase()) ||
							  item?.tipoNoticia?.toLowerCase()?.includes(text?.toLowerCase())
							: item
					)
					.map((item) => (
						<CardItem
							key={item.id}
							noticia={item}
							deleteNoticia={deleteNoticia}
						/>
					))
			) : (
				<Error />
			)}
		</section>
	);
};

const SearchInput = ({ setText }) => {
	const handleMensaje = (e) => {
		e.preventDefault();
		setText(e.target.value);
	};

	return (
		<form
			className="max-w-2xl m-auto mt-4 md:my-8 "
			onClick={(e) => e.preventDefault()}
			onSubmit={(e) => e.preventDefault()}
		>
			<label
				htmlFor="default-search"
				className="mb-2 text-sm font-medium  sr-only text-white"
			>
				Buscar
			</label>
			<div className="relative">
				<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
					<svg
						className="w-4 h-4 dark:text-gray-400"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 20 20"
					>
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
						/>
					</svg>
				</div>

				<input
					type="text"
					id="default-search"
					className="block w-full p-4 pl-10 text-sm  border  rounded-lg bg-gray-800 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 focus-visible:border-none "
					placeholder="Busque por el título o el tipo de la noticia..."
					onChange={handleMensaje}
					autoComplete="off"
					required
				/>
			</div>
		</form>
	);
};

export default Noticias;
