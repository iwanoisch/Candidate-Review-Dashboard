import {CheckIcon} from '@heroicons/react/24/solid';
import {useTranslation} from 'react-i18next';
import type {ThemeOption} from './theme.type';

interface ThemeButtonProps {
    theme: ThemeOption;
    isSelected: boolean;
    onClick: () => void;
}

export const ThemeButton = ({theme, isSelected, onClick}: ThemeButtonProps) => {
    const {t} = useTranslation();

    return (
        <button
            onClick={onClick}
            className={`
                relative flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200
                ${isSelected
                    ? 'border-primary-500 bg-primary-50 shadow-md'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                }
            `}
        >
            <div
                className="w-12 h-12 rounded-full shadow-md mb-3 ring-2 ring-white"
                style={{backgroundColor: theme.color}}
            />
            <span className={`text-sm font-semibold ${isSelected ? 'text-primary-700' : 'text-slate-700'}`}>
                {t(`themes.${theme.id}.name`, theme.name)}
            </span>
            <span className="text-xs text-center mt-1 text-slate-500">
                {t(`themes.${theme.id}.description`, theme.description)}
            </span>
            {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                    <CheckIcon className="w-3 h-3 text-white"/>
                </div>
            )}
        </button>
    );
};
