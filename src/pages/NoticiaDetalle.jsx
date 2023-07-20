import { Link, useParams } from 'react-router-dom';
import noticias from '../data/noticias.json';
import { HiArrowLeft } from 'react-icons/hi2';

const NoticiaDetalle = () => {
	const { id } = useParams();

	const { data } = noticias;
	const news = data.map(({ noticia }) => noticia);
	const noticia = news.find((noticia) => noticia.id === Number(id));

	const tagsString = noticia.tags.join(', ');

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
		<main className="max-w-4xl m-auto py-6 flex flex-col justify-center items-center">
			<Link to={'/noticias'} className="my-4">
				<HiArrowLeft className="w-9 h-9 md:w-12 md:h-12" />
			</Link>

			<section className="p-3 flex flex-col justify-center items-center">
				<h2 className="text-center text-3xl pb-2 font-bold">{noticia.title}</h2>
				<img
					src={noticia.image}
					alt={noticia.title + ' image'}
					width={500}
					height={500}
				/>
				<p className="text-center p-2 opacity-60">Tags: {tagsString}</p>
				<p>{noticia.description}</p>
			</section>
		</main>
	);
};

export default NoticiaDetalle;
