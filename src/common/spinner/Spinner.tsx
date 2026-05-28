import {SpinnerProps, SPINNER_SIZES} from "./spinner.type.ts";

export const Spinner = ({size = 'md', centered = false}: SpinnerProps) => {
    const spinner = (
        <div
            className={`inline-block ${SPINNER_SIZES[size]} animate-spin rounded-full border-4 border-solid border-current border-r-transparent`}
            role="status"
        >
            <span className="sr-only">Loading...</span>
        </div>
    );

    if (centered) {
        return (
            <div className="flex h-screen items-center justify-center">
                {spinner}
            </div>
        );
    }

    return spinner;
};
