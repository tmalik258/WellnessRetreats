import { useCallback, useEffect, useMemo, useState } from "react";
import FilterButton from "../layouts/FilterButton";
import Retreat from "../layouts/Retreat";

export default function Retreats() {
    const [retreatList, setRetreatList] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [isPrevLoading, setIsPrevLoading] = useState(false);
    const [isNextLoading, setIsNextLoading] = useState(false);
    const [filterByDate, setFilterByDate] = useState("");
    const [filterByType, setFilterByType] = useState("");
	const [title, setTitle] = useState('');

    const prevPage = useCallback(() => {
        setIsPrevLoading(true);
        if (pageNo > 1) setPageNo((prev) => prev - 1);
    }, [pageNo]);

    const nextPage = useCallback(() => {
        setIsNextLoading(true);
        if (retreatList.length > 0) setPageNo((prev) => prev + 1);
    }, [retreatList.length]);

    const onFilterDateChange = useCallback((value) => {
        setPageNo(0);
        setFilterByDate(value);
    }, []);

    const onFilterTypeChange = useCallback((value) => {
        setPageNo(0);
        setFilterByType(value);
    }, []);

	useMemo(() => {
		if (filterByDate === '' && filterByType === '') setPageNo(1);
	}, [filterByDate, filterByType])

    const filterRetreatsByDate = useCallback((list) => {
        const [startYear, endYear] = filterByDate.split('-').map(year => parseInt(year));
        return list.filter((retreat) => {
            const retreatDate = new Date(retreat.date * 1000);
            const year = retreatDate.getFullYear();
            return year === startYear || year === endYear;
        });
    }, [filterByDate]);

    const filterRetreatsByTitle = useCallback((list) => {
        return list.filter((retreat) => {
            return retreat.title.toLowerCase().includes(title);
        })
    }, [title]);

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch(
                `https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats?${(filterByType === '') ? `page=${pageNo}&limit=8`: `filter=${filterByType}`}`
            );
            const data = await response.json();

            if (!(data.length > 0)) {
                setPageNo((prev) => prev - 1);
                return;
            }

            let filteredData = filterByDate !== '' ? filterRetreatsByDate(data) : data;
			if (title !== '') filteredData = filterRetreatsByTitle(data);
            setRetreatList(filteredData);
        } catch (error) {
            console.error("Error fetching retreats: ", error);
        } finally {
            if (isNextLoading) setIsNextLoading(false);
            if (isPrevLoading) setIsPrevLoading(false);
        }
    }, [pageNo, filterByDate, filterByType, filterRetreatsByDate, title, filterRetreatsByTitle, isNextLoading, isPrevLoading]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <>
            <div className="flex flex-col sm:flex-row max-sm:gap-4 mt-4 justify-between">
                <div className="flex flex-col sm:flex-row max-sm:gap-4 gap-x-5">
                    <div>
                        <FilterButton
                            filterStateFunc={onFilterDateChange}
							options={['2023-2024', '2024-2025']}
                            placeholder={"Filter by Date"}
                        />
                    </div>
                    <div>
                        <FilterButton
                            filterStateFunc={onFilterTypeChange}
							options={['Yoga', 'Meditation', 'Detox']}
                            placeholder={"Filter by Type"}
                        />
                    </div>
                </div>
                <div className="basis-1/3">
                    <input
                        type="text"
                        placeholder="Search retreats by title"
                        className="sm:bg-[#1b3252] sm:text-white placeholder:text-current max-sm:border sm:placeholder:text-white outline-none px-3 py-2 rounded-md w-full"
						onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-7 justify-center my-6">
                {retreatList.length > 0 &&
                    Array.isArray(retreatList) &&
                    retreatList.map((value, index) => (
                        <Retreat key={index} detail={value} />
                    ))}
            </div>
            { (pageNo > 0) && (<div className="flex justify-center gap-3 mb-10">
                <button
                    className={`bg-[#1b3252] text-white px-5 py-3 rounded-lg flex items-center ${isPrevLoading && "cursor-not-allowed"}`}
                    onClick={prevPage}
                    disabled={isPrevLoading}
                >
                    {isPrevLoading && (
                        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                    )}
                    Previous
                </button>
                <button
                    className={`bg-[#1b3252] text-white px-5 py-3 rounded-lg flex items-center ${isNextLoading && "cursor-not-allowed"}`}
                    onClick={nextPage}
                    disabled={isNextLoading}
                >
                    {isNextLoading && (
                        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                    )}
                    Next
                </button>
            </div>)}
        </>
    );
}
