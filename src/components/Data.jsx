import { useState } from 'react';
//import { nanoid } from 'nanoid';
import { customAlphabet } from 'nanoid';
import { toast } from 'react-toastify';
import Card from './card/Card';
import Loading from './Loading';
import Error from './Error';

const Data = () => {
	const [data, setData] = useState([]);
	const [mensaje, setMensaje] = useState([]);
	const [isLoading, setIsLoading] = useState();
	const [errorExists, setErrorExists] = useState();

	const imagePorDefecto =
		'https://img.freepik.com/vector-gratis/fondo-garabato-dibujado-mano_23-2149915661.jpg?w=2000';

	const request = async (msje) => {
		setIsLoading(true);
		const url =
			'https://0cf3-2800-e6-4001-fe74-f1fd-d4e6-b84c-97e9.ngrok-free.app/api/get-articles';
		const apiKey =
			'BQ-csVdQijnxsHHsIscNzqUDomcDoiLjyGMLZkzBPTxATHtehVUfLfisAwlRkhjieNBZxcjlGoqTIeWbA';
		const dropdownValue = msje;

		const requestData = new FormData();
		console.log(msje);
		requestData.append('dropdown', dropdownValue);

		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: apiKey,
				},
				body: requestData,
				mode: 'cors',
			});

			if (!response.ok) {
				// If the response status is not 2xx (success), handle the error
				setErrorExists(true);
				throw new Error('Network response was not ok.');
			}

			setErrorExists(false);

			const responseData = await response.json();
			const newData = [];

			for (let index = 0; index < 10; index++) {
				//para que se muestre como string y se pueda guardar asi, ademas de que filtra 10 tags (antes salian muchas)
				const newTags = responseData.keywords[index]
					?.filter((t, i) => i <= 10)
					.join(' - ');

				const obj = {
					title: responseData.title[index],
					images: responseData?.images[index]?.[0] || imagePorDefecto,
					summary: responseData.summary[index],
					keywords: newTags,
					link: responseData.link[index],
					tipoNoticia: msje.toUpperCase(),
				};
				newData.push(obj);
			}

			setData([...newData]);
			setIsLoading(false);
		} catch (error) {
			// Handle the error, e.g., show an error message or set an error state
			console.error('Error fetching data:', error);
			setErrorExists(true);
			setIsLoading(false);
		}
	};

	const handleMensaje = (e) => {
		setMensaje({ ...mensaje, value: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const handleRequest = () => {
		if (mensaje?.value?.length > 0) {
			request(mensaje?.value?.toUpperCase());
			toast.success('La alerta ha sido enviada con exito, por favor espere', {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'dark',
			});
		} else {
			toast.error('Error, ingrese mínimo una palabra para buscar noticias', {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'dark',
			});
		}
	};

	const saveSeñal = (title, description, imagen, tags, link, tipoNoticia) => {
		const url = 'http://localhost:8080/news/join';
		console.log(
			`enviar señal, titulo:${title}, desc:${description},\nimagen: ${imagen}, \n${tags}, \n${link}`
		);

		// Define los caracteres válidos para el ID (por ejemplo, dígitos 0-9)
		const alphabet = '0123456789';

		// Define la longitud del ID que deseas generar
		const idLength = 8;

		// Crea una función de nanoid con el alfabeto y la longitud especificada
		const generateID = customAlphabet(alphabet, idLength);

		// Genera un ID único y conviértelo a un número entero
		const uniqueID = parseInt(generateID(), 10);

		console.log(uniqueID);

		var myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');

		var raw = JSON.stringify({
			id: uniqueID,
			title: title,
			description: description,
			tags: tags,
			link: link,
			image: imagen,
			tipoNoticia: tipoNoticia,
		});

		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow',
		};

		fetch(url, requestOptions)
			.then((response) => response.text())
			.then((result) => console.log(result))
			.catch((error) => console.log('error', error));
	};

	return (
		<main>
			{/* 
			<label htmlFor="">Ingresa la palabra</label>
			<input type="text" onChange={handleMensaje} />
			<input type="submit" value="Enviar" onClick={handleRequest} />
 			*/}

			{/* Está mas abajo en el código */}
			<SearchInput
				handleMensaje={handleMensaje}
				handleRequest={handleRequest}
				isLoading={isLoading}
				handleSubmit={handleSubmit}
			/>

			{isLoading ? (
				<Loading />
			) : (
				<>
					{errorExists ? (
						<Error />
					) : (
						<Succesfully
							data={data}
							saveSeñal={saveSeñal}
							tipoNoticia={mensaje?.value}
						/>
					)}
				</>
			)}
		</main>
	);
};

const SearchInput = ({
	handleMensaje,
	handleRequest,
	isLoading,
	handleSubmit,
}) => {
	return (
		<form
			className="max-w-2xl m-auto mt-4 md:my-8"
			onClick={(e) => e.preventDefault()}
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
				{isLoading ? (
					<>
						<input
							type="text"
							id="default-search"
							className="block w-full p-4 pl-10 text-sm  border  rounded-lg bg-neutral-950 border-gray-600 placeholder-gray-400 textneutral-500   "
							placeholder="Ingrese el texto..."
							onChange={handleMensaje}
							autoComplete="off"
							required
							disabled
						/>

						<input
							className=" absolute right-2.5 bottom-2.5  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 bg-neutral-900 "
							type="submit"
							value="Enviar"
							onClick={handleRequest}
							disabled
						/>
					</>
				) : (
					<>
						<input
							type="text"
							id="default-search"
							className="block w-full p-4 pl-10 text-sm  border  rounded-lg bg-gray-800 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 focus-visible:border-none "
							placeholder="Ingrese el texto..."
							onChange={handleMensaje}
							onSubmit={handleSubmit}
							autoComplete="off"
							required
						/>

						<input
							className="cursor-pointer absolute right-2.5 bottom-2.5  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
							type="submit"
							value="Enviar"
							onClick={handleRequest}
						/>
					</>
				)}
			</div>
		</form>
	);
};

const Succesfully = ({ data, saveSeñal, tipoNoticia }) => {
	return (
		<section className="flex flex-wrap justify-center items-start">
			{data ? (
				data.map((dataE) => {
					return (
						<Card
							key={dataE.uniqueID}
							id={dataE.uniqueID}
							onSubmit={saveSeñal}
							tittle={dataE.title}
							description={dataE.summary}
							imagen={dataE.images}
							tags={dataE.keywords}
							link={dataE.link}
							tipoNoticia={tipoNoticia}
						/>
					);
				})
			) : (
				<p className="text-center p-4">
					Error no se encontraron noticias relacionadas
				</p>
			)}
		</section>
	);
};

export default Data;
