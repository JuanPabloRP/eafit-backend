import { Link } from 'react-router-dom';
import { HiTrash } from 'react-icons/hi2';
import { useState } from 'react';

const CardItem = ({
	noticia: { id, title, tags, image, description, link, tipoNoticia },
	deleteNoticia,
}) => {
	/* console.log({
		id,
		title,
		tags,
		image,
		description,
		link,
		tipoNoticia,
		deleteNoticia,
	}); */

	const [open, setOpen] = useState(false);

	const handleModal = () => {
		setOpen(!open);
	};

	return (
		<article className="relative max-w-sm  border border-gray-200 rounded-lg shadow-lg shadow-gray-800 dark:bg-gray-800 dark:border-gray-700 m-2 hover:border-gray-600 hover:shadow-gray-600">
			<button
				data-modal-target="defaultModal"
				data-modal-toggle="defaultModal"
				className="absolute w-full flex justify-end pt-2 pr-2"
				onClick={handleModal}
			>
				<HiTrash className="absolute bg-gray-200  m-1 p-1 text-red-600 w-8 h-8 hover:text-white hover:bg-red-600 rounded-full" />
			</button>

			<Modal
				open={open}
				setOpen={setOpen}
				title={title}
				id={id}
				deleteNoticia={deleteNoticia}
			/>

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

const Modal = ({ open, setOpen, title, id, deleteNoticia }) => {
	const handleClose = () => setOpen(false);

	const handleDelete = () => {
		deleteNoticia(id);
		handleClose();
	};

	return (
		<article
			className={`${
				open ? 'flex' : 'hidden'
			} shadow-lg shadow-gray-800 bg-gray-800 border border-gray-600 rounded-md fixed top-0 left-0 right-0 max-w-md  mx-auto m-4  z-50   p-4 overflow-x-hidden flex-col mt-12`}
		>
			<header className="py-2">
				<h2 className="text-red-600 font-semibold text-2xl">
					Eliminar permanentemente
				</h2>
			</header>
			<main>
				<p>¿Estás seguro que deseas eliminar: {title}?</p>
			</main>
			<footer className="flex justify-between items-center py-2">
				<button
					type="button"
					onClick={handleDelete}
					className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
				>
					Eliminar
				</button>
				<button
					type="button"
					onClick={handleClose}
					className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
				>
					Cerrar
				</button>
			</footer>
		</article>
	);
};
