import {Card, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
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
    titre : string;
}



export const SimpleTable  : React.FC<TableauProps> = ({ colonnes , lignes , titre }) => {

    return (
        <Card>
            <Typography style={{textAlign:"center"}} variant="h4" gutterBottom>{titre}</Typography>
            <TableContainer  >
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
        </Card>
    );
};


