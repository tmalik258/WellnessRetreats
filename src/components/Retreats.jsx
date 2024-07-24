import FilterButton from "../layouts/FilterButton";
import Retreat from "../layouts/Retreat";

export default function Retreats() {
	return (
		<>
			<div className="flex flex-col sm:flex-row max-sm:gap-4 mt-4 justify-between">
				<div className="flex flex-col sm:flex-row max-sm:gap-4 gap-x-5">
					<div>
						<FilterButton />
					</div>
					<div>
						<FilterButton />
					</div>
				</div>
				<div className="basis-1/3">
					<input
						type="text"
						name=""
						id=""
						placeholder="Search retreats by title"
						className="sm:bg-[#1b3252] sm:text-white placeholder:text-current max-sm:border sm:placeholder:text-white outline-none p-3 rounded-md w-full"
					/>
				</div>
			</div>
			<div className="flex">
				<Retreat />
			</div>
		</>
	);
}
