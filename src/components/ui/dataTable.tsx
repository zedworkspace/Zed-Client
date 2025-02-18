'use client'
import { ColumnDef, useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table';

type DataTableProps <TData, TValue> = {
    columns :ColumnDef<TData, TValue>[];
    data: TData[]
}

export default function DataTable <TData,TValue>({columns,data}:DataTableProps<TData,TValue>) {
    const table = useReactTable({data,columns,getCoreRowModel:getCoreRowModel()})
  return (
    <div>
        <Table>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup,ind)=>(
                    <TableRow key={ind}>
                        {headerGroup.headers.map((header,ind)=>(
                            <TableHead key={ind}>
                                {flexRender(header.column.columnDef.header ,header.getContext()) }
                            </TableHead>
                        ))}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows.map((row,ind)=>(
                    <TableRow key={ind}>
                        {row.getAllCells().map((cell,ind)=>(
                            <TableCell key={ind} className='text-white'>
                               {flexRender(cell.column.columnDef.cell ,cell.getContext()) }
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
  )
}
