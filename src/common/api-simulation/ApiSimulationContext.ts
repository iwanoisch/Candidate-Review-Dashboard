import {createContext} from "react";
import type {ApiSimulationContextProps} from "./ApiSimulation.type";

export const ApiSimulationContext = createContext<ApiSimulationContextProps>({
    simulateError: false,
    setSimulateError: () => {},
    simulateLatency: false,
    setSimulateLatency: () => {},
});
