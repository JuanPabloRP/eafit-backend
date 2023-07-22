import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Card = ({
	id,
	tittle,
	description,
	imagen,
	tags,
	link,
	onSubmit,
	tipoNoticia,
}) => {
	const handleSeñal = () => {
		onSubmit(tittle, description, imagen, tags, link, tipoNoticia);
		toast.success('La señal ha sido enviada', {
			position: 'top-right',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'dark',
		});
	};

	//const newTags = () => betterTags(tags);

	return (
		<>
			<article className="max-w-sm  rounded-lg shadow-lg shadow-gray-800 bg-gray-800 border-gray-700 m-2 flex flex-col justify-center items-center p-4 text-center">
				<span>{tipoNoticia.toUpperCase()}</span>
				<h2 className="mb-2 text-2xl font-bold tracking-tight text-white ">
					{tittle}
				</h2>
				<img
					src={imagen}
					width="350"
					height="250"
					className="rounded-md my-4"
				/>
				<p className="text-start pt-4">{description}</p>
				{/* <div className="tags">Tags: {tags}</div> */}
				<footer className="flex justify-between items-center pt-4 w-full">
					<input
						type="submit"
						value="Enviar Señal"
						className="bg-sky-600 p-2 rounded-md hover:bg-sky-800"
						onClick={handleSeñal}
					/>
					<a
						href={link}
						target="_blank"
						rel="noreferrer"
						className="hover:text-neutral-400"
					>
						Ver noticia
					</a>
				</footer>
			</article>
		</>
	);
};

export default Card;
