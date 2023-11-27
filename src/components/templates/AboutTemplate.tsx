import {Box, Card} from "@mui/material";

// @ts-ignore
import React from "react";
import TitleAuth from "../molecules/TitleAuth.tsx";
import Column from "../organisms/Column.tsx";

const LeftImage = require('../../assets/images/sea.jpg');

export default function AboutTemplate() {
    return (
        <Card className={'flex m-[4%] rounded-xl shadow-custom'}>
            <Column content={[
                <img src={LeftImage} alt={'sea'} className={'h-full w-full rounded-l-xl'}/>
            ]}/>
            <Column content={[
                <div className={'flex justify-center items-center flex-col w-full'}>
                    <TitleAuth value={'A PROPOS DE VACANCY PRO'}/>
                    <p className={'text-xl text-justify mx-[20px] my-[10%]'}>
                        Vacancy Pro est une application web et mobile destinée à la gestion de période de vacences.
                        Il est possible, de créer et gérer plusieurs périodes de vacances ainsi que les différents
                        activités et membre prenant part à ces périodes.
                        Il est également prévu de pouvoir communiquer avec les différents membre de la même période
                        via un salon de discussion.
                    </p>
                    <p className={'text-xl text-justify mx-[20px] my-[10%]'}>
                        Students for Students est un projet académique développé par THOMAS Pierre et DE LA MARCK
                        Ludovic. HELMo
                        Sainte-Marie. Tout droit réservé. ©
                    </p>
                </div>
            ]}/>
        </Card>
    )
}