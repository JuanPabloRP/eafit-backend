import { useState } from 'react';
//import { nanoid } from 'nanoid';
import { customAlphabet } from 'nanoid';
import { toast } from 'react-toastify';

import Card from './card/Card';
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
			'https://75f5-2800-e6-4001-fe74-2137-7163-dec3-aeec.ngrok-free.app/api/get-articles';
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
					tipoNoticia: mensaje?.value.toUpperCase(),
				};
				newData.push(obj);
			}

			setData([...data, ...newData]);
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

const SearchInput = ({ handleMensaje, handleRequest, isLoading }) => {
	return (
		<form
			className="max-w-2xl m-auto mt-4 md:my-8 "
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

const Error = () => {
	return (
		<p className="text-red-600 text-center text-xl font-semibold">
			Error al obtener los datos, intente más tarde o comuníquese con el
			adminstrador
		</p>
	);
};

const Loading = () => {
	return (
		<section
			role="status"
			className="grid place-items-center h-full w-full mt-4"
		>
			<svg
				aria-hidden="true"
				className="w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
				viewBox="0 0 100 101"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
					fill="currentColor"
				/>
				<path
					d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
					fill="currentFill"
				/>
			</svg>
			<span className="sr-only">Cargando...</span>
		</section>
	);
};

export default Data;
