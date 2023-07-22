import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
//import noticias from '../data/noticias.json';
import { HiArrowLeft } from 'react-icons/hi2';

const NoticiaDetalle = () => {
	const { id } = useParams();

	const [info, setInfor] = useState([]);
	useEffect(() => {
		const requestOptions = {
			method: 'GET',
			redirect: 'follow',
		};

		fetch('http://localhost:8080/news/findAll', requestOptions)
			.then((response) => response.json())
			.then((result) => setInfor(() => result))
			.catch((error) => console.log('error', error));
	}, []);

	console.log(info);
	const news = info.map((noticia) => noticia);
	const noticia = news.find((noticia) => noticia?.id === Number(id));

	//const tagsString = noticia?.tags.join(', ');

	if (!noticia) {
		return (
			<div className="flex flex-col justify-center items-center text-3xl max-w-4xl m-auto p-4">
				<Link to={'/noticias'} className="justify-self-start pr-2 ">
					<HiArrowLeft />
				</Link>
				<p>Noticia no encontrada.</p>
			</div>
		);
	}

	return (
		<main className="max-w-4xl m-auto py-6 flex flex-col justify-center items-center border-4  border-gray-800 bg-gray-800 rounded-md my-1 md:my-3 md:px-4">
			<Link to={'/noticias'} className="my-2  md:self-start">
				<HiArrowLeft className="w-9 h-9 md:w-10 md:h-10" />
			</Link>

			<section className="p-3 flex flex-col justify-center items-center">
				<h2 className="text-center text-3xl pb-3 font-bold">{noticia.title}</h2>
				<img
					src={noticia.image}
					alt={noticia.title + ' image'}
					width={500}
					height={500}
					className="rounded-md"
				/>
				<p className="text-center px-2 py-4 opacity-60">Tags: {noticia.tags}</p>
				<span className="text-center text-xl py-2 font-semibold">Resumen noticia</span>
				<p className="md:px-6 text-lg">{noticia.description}</p>
				<a
					href={noticia.link}
					target="_blank"
					rel="noreferrer"
					className=" mt-5 px-4 py-3 rounded-md bg-neutral-900 hover:bg-neutral-950 focus:ring-2 focus:ring-blue-600 shadow-md shadow-black -translate-y-1 hover:shadow-none hover:translate-y-0"
				>
					Ir al sitio web
				</a>
			</section>
		</main>
	);
};

export default NoticiaDetalle;
