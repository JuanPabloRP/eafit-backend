import CardItem from '../components/CardItem';
import noticias from '../data/noticias.json';

const Noticias = () => {
	const { data } = noticias;

	console.log(data);

	return (
		<main>
			<h2 className="text-3xl mb-4 md:text-5xl font-bold text-center py-4">
				Ver noticias
			</h2>

			<section className="flex flex-wrap justify-center">
				{data.map(({ noticia }) => (
					<CardItem key={noticia.id} noticia={noticia} />
				))}
			</section>
		</main>
	);
};

export default Noticias;
