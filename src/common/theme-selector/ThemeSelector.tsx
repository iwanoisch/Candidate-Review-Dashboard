import {SunIcon, SwatchIcon} from '@heroicons/react/24/solid';
import {useTheme} from '../../hooks/theme/useTheme';
import {LIGHT_THEMES} from '../../constant/theme.constant';
import type {ThemeType} from './theme.type';
import {useTranslation} from 'react-i18next';
import {Switch} from '@headlessui/react';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {ThemeButton} from './ThemeButton';

export const ThemeSelector = () => {
    const {t} = useTranslation();
    const {currentTheme, setTheme, backgroundMode, setBackgroundMode} = useTheme();
    const userId = useSelector((state: RootState) => state.auth.user?.id);

    const handleThemeChange = (themeId: ThemeType) => {
        setTheme(themeId, userId);
    };

    const handleBackgroundModeChange = (useNeutral: boolean) => {
        setBackgroundMode(useNeutral ? 'neutral' : 'themed', userId);
    };

    return (
        <div className="space-y-8">
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <SunIcon className="w-5 h-5 text-amber-500"/>
                    <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                        {t('settings.light_themes', 'Temi Chiari')}
                    </h4>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {LIGHT_THEMES.map((theme) => (
                        <ThemeButton
                            key={theme.id}
                            theme={theme}
                            isSelected={currentTheme === theme.id}
                            onClick={() => handleThemeChange(theme.id)}
                        />
                    ))}
                </div>

                <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <SwatchIcon className="w-5 h-5 text-slate-500"/>
                                <div>
                                    <p className="text-sm font-medium text-slate-700">
                                        {t('settings.neutral_background', 'Sfondo neutro')}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        {t('settings.neutral_background_desc', 'Usa uno sfondo grigio sobrio invece del colore del tema')}
                                    </p>
                                </div>
                            </div>
                            <Switch
                                checked={backgroundMode === 'neutral'}
                                onChange={handleBackgroundModeChange}
                                className={`
                                    relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                                    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                                    ${backgroundMode === 'neutral' ? 'bg-primary-500' : 'bg-slate-300'}
                                `}
                            >
                                <span className="sr-only">{t('settings.neutral_background', 'Sfondo neutro')}</span>
                                <span
                                    className={`
                                        inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform
                                        ${backgroundMode === 'neutral' ? 'translate-x-6' : 'translate-x-1'}
                                    `}
                                />
                            </Switch>
                        </div>
                    </div>
            </div>

            <p className="text-xs text-slate-500 text-center">
                {t('settings.theme_info', 'Il tema selezionato verrà salvato per il tuo account')}
            </p>
        </div>
    );
};
