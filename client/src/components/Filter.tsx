import { useState } from "react";
import type { FilterType } from "../types";


export default function Filter({ onFilterChange }: { onFilterChange: (filter: Array<FilterType>) => void }) {
    const [filters, setFilters] = useState<Array<FilterType>>([]);
    
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value, checked } = e.target;

        if (id === "searchFilter") {
            setFilters((prev) => {
                const newFilters = [...prev];
                const index = newFilters.findIndex((f) => f.id === "searchFilter");
                if (index !== -1) {
                    newFilters[index].value = value;
                } else {
                    newFilters.push({ id: "searchFilter", value });
                }
                return newFilters;
            });
        } else if (id === "completedFilter") {
            setFilters((prev) => {
                const newFilters = [...prev];
                const index = newFilters.findIndex((f) => f.id === "completedFilter");
                if (index !== -1) {
                    newFilters[index].value = checked;
                } else {
                    newFilters.push({ id: "completedFilter", value: checked });
                }
                return newFilters;
            });
        }
        

    };

    return (
        <div className="mb-10 flex gap-4 border-b border-gray-200 pb-4">
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    value={typeof filters.find(f => f.id === "searchFilter")?.value === "string" ? filters.find(f => f.id === "searchFilter")?.value as string : ""}
                    onChange={handleFilterChange}
                    id="searchFilter"
                    placeholder="Filtrar por título"
                    className="border border-gray-300 rounded px-4 py-2 min-w-[300px] w-[500px] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>
            <div className="gap-2">
                <label htmlFor="completedFilter" className="text-sm text-gray-700">
                    Mostrar solo completadas
                
                <br />
                <input
                    type="checkbox"
                    className="sr-only peer"
                    onChange={handleFilterChange}
                    checked={typeof filters.find(f => f.id === "completedFilter")?.value === "boolean" ? filters.find(f => f.id === "completedFilter")?.value as boolean : false}
                    id="completedFilter"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                </label>
            </div>
            <div className="ml-auto flex gap-2">
                <button
                    onClick={() => onFilterChange(filters)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow transition"
                >
                    Filtrar
                </button>
                <button
                    onClick={() => {
                        setFilters([]);
                        onFilterChange([]);
                    }}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded shadow transition"
                >
                    Limpiar Filtro
                </button>
            </div>
        </div>
    );
}