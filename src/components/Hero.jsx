export default function Hero() {
	return (
		<div className="hidden sm:block bg-[#e0d9cf] my-8 shadow-lg rounded-md px-7 pt-5 pb-8">
			<div className="w-full h-[500px]">
				<img src="./hero-img.jpg" className="w-full h-full object-cover rounded-lg" alt="" />
			</div>
			<h2 className="text-2xl mt-6 mb-3">Discover Your Inner Peace</h2>
			<p>Join us for a series of wellness retreats designed to help you find tranquility and rejuvenation</p>
		</div>
	);
}
