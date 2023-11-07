import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
// @ts-ignore
import React from "react";


interface SimpleListProps {
    columns: string[]
    items: string[],
}

export const simpleTable  : React.FC<SimpleListProps> = ({ columns , items }) => {

    return (

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                {columns.map(column => {
                                    return <TableCell>{column}</TableCell>
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            {items.map(item => {
                                return ( <TableCell align="right">{item}</TableCell>) ;
                            })}
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>



);




}