import {FC, ReactNode, useState} from "react";
import {ApiSimulationContext} from "./ApiSimulationContext";

export const ApiSimulationProvider: FC<{ children: ReactNode }> = ({children}) => {
    const [simulateError, setSimulateError] = useState(false);
    const [simulateLatency, setSimulateLatency] = useState(false);

    return (
        <ApiSimulationContext.Provider value={{simulateError, setSimulateError, simulateLatency, setSimulateLatency}}>
            {children}
        </ApiSimulationContext.Provider>
    );
};
