import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { HiBars3, HiXMark } from 'react-icons/hi2';

const Navbar = () => {
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(!open);

	const navLinks = [
		{
			route: '/',
			title: 'Generar noticia',
		},
		{
			route: '/noticias',
			title: 'Ver noticias',
		},
	];

	return (
		<nav className="sticky top-0 w-full flex flex-wrap justify-between items-center px-4 bg-gray-800 py-4 z-10 text-sky-100 font-semibold">
			<div className="flex justify-between px-4 w-full md:w-1/2">
				<Link to={'/'} className="text-4xl">
					Sura
				</Link>

				<button onClick={handleOpen} className="text-blue text-2xl md:hidden">
					{open === false ? <HiBars3 /> : <HiXMark />}
				</button>
			</div>

			<div className="flex justify-center items-center space-x-2 p-0 w-full md:w-1/2 md:pr-4">
				{open ? (
					<ul className="flex flex-col md:flex-row justify-end items-center md:space-x-2 md:w-full text-sky-800 ">
						{navLinks.map(({ route, title }) => (
							<li key={title} className="py-1">
								<NavLink
									to={route}
									className={({ isActive }) =>
										isActive
											? 'text-sky-600 border-b-sky-600 border-solid border-b-2'
											: ' hover:text-sky-600 text-sky-700'
									}
								>
									{title}
								</NavLink>
							</li>
						))}
					</ul>
				) : (
					<ul className="hidden space-x-0 p-0 md:flex md:space-x-4 md:w-full md:justify-end">
						{navLinks.map(({ route, title }) => (
							<li key={title}>
								<NavLink
									to={route}
									className={({ isActive }) =>
										isActive
											? 'text-sky-600 border-b-sky-600 border-solid border-b-2'
											: ' hover:text-sky-600 text-sky-700'
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
