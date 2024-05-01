import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable, getFilteredRowModel } from "@tanstack/react-table";
import { UseFetch } from "../funciones/UseFetch";
import classNames from "classnames";
import { useState } from "react";
import { rankItem } from "@tanstack/match-sorter-utils";

const fuzzyFilter = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value)

    addMeta({itemRank})

    return itemRank.passed
}

function Fetch2(){
    const { data, loading, error } = UseFetch(
        "https://pokeapi.co/api/v2/pokemon"
    );
    const [globalFilter, setGlobalFilter] = useState("");
    console.log(globalFilter);

    const columns = [
        {
            accessorKey: 'name',
            header: () => <span>Nombre</span>,
            cell: info => <span className="font-bold">{info.getValue()}</span>
        },
        {
            accessorKey: 'url'
        }
    ]

    const table = useReactTable({
        data,
        columns,
        state:{
            globalFilter
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: fuzzyFilter
    })

    return (
        <div className="container px-6 py-4">
            <div className="translate-middle-y" style={{textAlign: 'right'}}>
                <input type="text"
                onChange={e => setGlobalFilter(e.target.value)} 
                className="border border-gray-300 rounded outline-indigo-700"
                placeholder="Buscar..."/>
            </div>
            <table className="table table-hover">
                <thead className="thead-light">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id} className="border border-2">
                            {headerGroup.headers.map(header => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )
                                    }
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-4 flex items-center justify-between">
                    <div className="flex gap-2" >
                        {<div className="text-gray-600 font-semibold" style={{textAlign: 'center'}}>
                            Mostrando de {Number(table.getRowModel().rows[0]?.id) + 1}&nbsp;
                            a {Number(table.getRowModel().rows[table.getRowModel().rows.length - 1]?.id) + 1}&nbsp;
                            del total de {data.length} registros
                        </div> }
                        <button className="text-gray-600 bg-gray-200 py-0.5 px-1 rounded border border-gray-300"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}>
                            {'<<'}
                        </button>
                        <button 
                            className="text-gray-600 bg-gray-200 py-0.5 px-1 rounded border border-gray-300"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}>
                            {'<'}
                        </button>
                        {table.getPageOptions().map((value, key) => (
                            <button key={key} className={classNames({
                                "py-0.5 px-2 font-bold rounded" : true,
                                "bg-info": value === table.getState().pagination.pageIndex
                            })}
                            
                            onClick={() => table.setPageIndex(value)}>
                                {value + 1}
                            </button>
                        ))}
                        <button 
                            className="text-gray-600 bg-gray-200 py-0.5 px-1 rounded border border-gray-300"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}>
                            {'>'}
                        </button>
                        <button 
                            className="text-gray-600 bg-gray-200 py-0.5 px-1 rounded border border-gray-300"
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}>
                            {'>>'}
                        </button>
                    </div>
                    <div style={{textAlign: 'right'}}>
                            <select 
                            defaultValue={'10'}
                            className="border border-gray-300 rounded outline-indigo-700"
                            onChange={e =>  {
                                table.setPageSize(Number(e.target.value))
                            }}>
                                <option value="6">6 pág.</option>
                                <option value="10">10 pág.</option>
                                <option value="15">15 pág.</option>
                                <option value="20">20 pág.</option>
                            </select>
                     </div>
            </div>
        </div>
    )

    // return (
    //     <div>
    //         <h1>Pokemones</h1>
    //         <div>
    //             <ul>
    //                 {error && <li>Error: {error}</li>}
    //                 {loading && <li>Loading...</li>}
    //                 {data?.map((pokemon, key) => {
    //                     return (
    //                         <div key={key}>
    //                             <li key={pokemon.name}>{pokemon.name}</li>
    //                         </div>
    //                     );    
    //                 }
    //                 )}
    //             </ul>
    //         </div>
    //     </div>
    // )
}

export default Fetch2;