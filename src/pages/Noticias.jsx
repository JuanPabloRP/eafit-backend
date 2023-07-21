import { useEffect, useState } from 'react';
import CardItem from '../components/CardItem';

const Noticias = () => {
	const [info, setInfor] = useState([])
	useEffect(() => {
		const requestOptions = {
		  method: 'GET',
		  redirect: 'follow'
		};
	
		fetch("http://localhost:8080/news/findAll", requestOptions)
		  .then(response => response.json())
		  .then(result => setInfor(result))   
		  .catch(error => console.log('error', error));
	  }, []);




	return (
		<main>
			<h2 className="text-3xl mb-4 md:text-5xl font-bold text-center py-4">
				Ver noticias
				{console.log(info)}
			</h2>

			<section className="flex flex-wrap justify-center">
				{info ?
					(info.map((item) => (
						<CardItem key={item.id} noticia={item} />)
					)) : console.log("error")}
			</section>
		</main>
	);
};

export default Noticias;
