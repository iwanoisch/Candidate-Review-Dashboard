export interface ApiSimulationContextProps {
    simulateError: boolean;
    setSimulateError: (value: boolean) => void;
    simulateLatency: boolean;
    setSimulateLatency: (value: boolean) => void;
}
