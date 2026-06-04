import {useContext} from "react";
import {ApiSimulationContext} from "./ApiSimulationContext";

export const useApiSimulation = () => {
    return useContext(ApiSimulationContext);
};
