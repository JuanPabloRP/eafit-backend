import { Link } from 'react-router-dom';

const CardItem = ({
	noticia: { id, title, tags, image, description, link },
}) => {
	console.log({ title });

	const tagsString = tags.join(', ');
	return (
		<article className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2 ">
			<img className="rounded-t-lg" src={image} alt={title + ' image'} />
			<div className="p-5">
				<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					{title}
				</h5>

				<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
					{tagsString}
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
