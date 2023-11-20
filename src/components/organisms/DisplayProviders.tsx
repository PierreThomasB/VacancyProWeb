import * as React from "react";
export default function DisplayProviders({providers}) {
    return (
        <div>
            {providers.map((provider: any) => provider)}
        </div>
    )
}