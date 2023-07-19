import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(!open);

	const navLinks = [
		{
			route: '/',
			title: 'Generar alerta/noticia',
		},
		{
			route: '/noticias',
			title: 'Ver noticias/alertas',
		},
	];

	return (
		<nav className="sticky top-0 w-full flex flex-wrap justify-between items-center px-4 py-4 bg-zinc-900 text-white">
			<div className="flex justify-between px-4 w-full md:w-1/2">
				<h2 className="text-3xl">Sura</h2>

				<button onClick={handleOpen} className="text-blue text-2xl md:hidden">
					{open === false ? <p>abrir</p> : <p>cerrar</p>}
				</button>
			</div>

			<div className="flex justify-center items-center space-x-2 py-4 w-full md:w-1/2">
				{open ? (
					<ul className="flex flex-col md:flex-row justify-around items-center md:space-x-2">
						{navLinks.map(({ route, title }) => (
							<li key={title} className="py-1">
								<NavLink
									to={route}
									className={({ isActive }) =>
										isActive
											? 'text-indigo-400 border-b-indigo-500 border-solid border-b-2'
											: ' hover:text-indigo-500 '
									}
								>
									{title}
								</NavLink>
							</li>
						))}
					</ul>
				) : (
					<ul className="hidden md:flex justify-around space-x-4">
						{navLinks.map(({ route, title }) => (
							<li key={title}>
								<NavLink
									to={route}
									className={({ isActive }) =>
										isActive
											? 'text-indigo-400 border-b-indigo-500 border-solid border-b-2'
											: ' hover:text-indigo-500 '
									}
								>
									{title}
								</NavLink>
							</li>
						))}
					</ul>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
