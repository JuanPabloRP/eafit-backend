import { Link } from 'react-router-dom';

const CardItem = ({
	noticia: { id, title, tags, image, description, link, tipoNoticia },
}) => {
	console.log({ id, title, tags, image, description, link, tipoNoticia });

	return (
		<article className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg shadow-gray-800 dark:bg-gray-800 dark:border-gray-700 m-2 ">
			<figure className="flex justify-center items-center rounded-t-lg">
				<img
					className="w-full h-full rounded-t-lg"
					src={image}
					alt={title + ' image'}
				/>
			</figure>
			<div className="p-5">
				<span>{tipoNoticia ? `Noticia de ${tipoNoticia}` : null}</span>
				<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					{title}
				</h5>

				<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
					{tags}
				</p>
				<footer className="flex justify-between items-center pt-2">
					<Link
						className="bg-sky-600 p-2 rounded-md hover:bg-sky-800"
						to={`/noticias/${id}`}
					>
						Leer más
					</Link>
					<a
						href={link}
						target="_blank"
						rel="noreferrer"
						className="hover:text-neutral-400"
					>
						Ir al sitio web
					</a>
				</footer>
			</div>
		</article>
	);
};

export default CardItem;
