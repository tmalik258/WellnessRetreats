import PropTypes from "prop-types";

export default function FilterButton({ placeholder, filterStateFunc, options }) {
	return (
		<>
			<select className="bg-[#efefef] max-sm:border sm:bg-[#1b3252] sm:text-white rounded sm:rounded-md p-2 w-full outline-none" onChange={e => filterStateFunc(e.target.value)}>
				<option value="">{placeholder}</option>
				{options.map((value, index) => <option key={index} value={value.toLowerCase()}>{value}</option>)}
			</select>
		</>
	);
}

FilterButton.propTypes = {
	placeholder: PropTypes.string.isRequired,
	filterStateFunc: PropTypes.func.isRequired,
	options: PropTypes.array.isRequired
};
