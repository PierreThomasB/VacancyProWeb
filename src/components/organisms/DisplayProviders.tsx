import * as React from "react";
export default function DisplayProviders({providers}) {
    return (
        <div className={'flex w-full flex-row justify-center items-center overflow-y-hidden'}>
            {providers.map((provider: any) => provider)}
        </div>
    )
}