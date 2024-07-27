import PropTypes from "prop-types";

export default function Retreat({ detail }) {
	const formatDateRange = (timestamp, duration) => {
		const initialDate = new Date(timestamp * 1000); // Convert seconds to milliseconds

		const monthsList = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];
		const month = monthsList[initialDate.getMonth()];
		const startDate = initialDate.getDate();
		const endDate = startDate + duration - 1;
		const year = initialDate.getFullYear();

		return `${month} ${startDate}-${endDate}, ${year}`;
	};
	return (
		<div className="bg-[#e0d9cf] p-6 rounded-xl flex flex-col gap-4">
			<div>
				<img
					src="./hero-img.jpg"
					className="w-full h-full object-cover rounded-2xl"
					alt=""
				/>
			</div>
			<div className="flex flex-col gap-2 text-sm">
				<h2 className="text-xl font-semibold">{detail.title}</h2>
				<p>{detail.description}</p>
				<div>Date: {formatDateRange(detail.date, detail.duration)}</div>
				<div>Location: {detail.location}</div>
				<div>Price: ${detail.price}</div>
			</div>
		</div>
	);
}

Retreat.propTypes = {
	detail: PropTypes.object.isRequired,
};
