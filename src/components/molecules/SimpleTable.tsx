import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
// @ts-ignore
import React from "react";

interface Colonne {
    id: string;
    label: string;
}

interface Ligne {
    [key: string]: any;
}

interface TableauProps {
    colonnes: Colonne[];
    lignes: Ligne[];
}



export const SimpleTable  : React.FC<TableauProps> = ({ colonnes , lignes }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {colonnes.map((colonne) => (
                            <TableCell key={colonne.id}>{colonne.label}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {lignes.map((ligne, index) => (
                        <TableRow key={index}>
                            {colonnes.map((colonne) => (
                                <TableCell key={colonne.id}>{ligne[colonne.id]}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};


