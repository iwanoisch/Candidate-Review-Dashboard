import {useTranslation} from "react-i18next";
import {useAuth} from "../../features/auth/useAuth.ts";
import {useAlert} from "../../common/alert/useAlert.ts";
import {ThemeSelector} from "../../common/theme-selector/ThemeSelector.tsx";
import LanguageSelector from "../../common/language-selector/LanguageSelector.tsx";
import {Tab, TabGroup, TabList, TabPanel, TabPanels} from "@headlessui/react";
import {useState, useEffect, useMemo} from "react";
import {UserCircleIcon, SwatchIcon} from "@heroicons/react/24/outline";
import type {User} from "../../features/auth/auth.type.ts";

export const Settings = () => {
    const {t} = useTranslation();
    const {user, updateUser, isLoading} = useAuth();
    const {showAlert} = useAlert();
    const [isUpdateLoading, setIsUpdateLoading] = useState(false);
    const [profile, setProfile] = useState<Partial<User>>({});
    const [profileSnapshot, setProfileSnapshot] = useState("");

    const updateProfile = (field: keyof User, value: string) => {
        setProfile(prev => ({...prev, [field]: value}));
    }

    const currentProfileValues = useMemo(() => JSON.stringify(profile), [profile]);
    const isProfileDirty = currentProfileValues !== profileSnapshot;

    useEffect(() => {
        if (!user) return;
        const profileData: Partial<User> = {
            first_name: user.first_name || "",
            last_name: user.last_name || "",
            email: user.email || "",
            name: user.name || "",
            short_name: user.short_name || "",
        };
        setProfile(profileData);
        setProfileSnapshot(JSON.stringify(profileData));
    }, [user]);

    const handleSaveProfile = async () => {
        setIsUpdateLoading(true);
        const result = await updateUser({
            first_name: profile.first_name,
            last_name: profile.last_name,
            email: profile.email,
            name: profile.name,
            short_name: profile.short_name,
        });
        if (result) {
            setProfileSnapshot(currentProfileValues);
            showAlert({type: "success", message: t("settings.save_profile_success"), duration: 3000});
        } else {
            showAlert({type: "error", message: t("settings.save_profile_error"), duration: 4000});
        }
        setIsUpdateLoading(false);
    };

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
                    {t("settings.title")}
                </h1>
                <p className="mt-1 text-sm text-text-muted">
                    {t("settings.subtitle")}
                </p>
            </div>

            <TabGroup>
                <TabList className="flex gap-1 border-b border-border-default">
                    <Tab className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors
                        border-b-2 -mb-px outline-none cursor-pointer
                        data-[selected]:border-primary-500 data-[selected]:text-primary-600
                        data-[hover]:text-text-secondary
                        border-transparent text-text-muted"
                    >
                        <UserCircleIcon className="w-4 h-4"/>
                        {t("settings.tab_account")}
                    </Tab>
                    <Tab className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors
                        border-b-2 -mb-px outline-none cursor-pointer
                        data-[selected]:border-primary-500 data-[selected]:text-primary-600
                        data-[hover]:text-text-secondary
                        border-transparent text-text-muted"
                    >
                        <SwatchIcon className="w-4 h-4"/>
                        {t("settings.tab_theme")}
                    </Tab>
                </TabList>

                <TabPanels className="mt-6">
                    {/* TAB ACCOUNT */}
                    <TabPanel>
                        <div className="flex flex-col gap-8">
                            <form onSubmit={e => {
                                e.preventDefault();
                                handleSaveProfile();
                            }}>
                                <div className="flex flex-col gap-6">
                                    <div className="card">
                                        <h3 className="text-lg font-semibold text-text-primary mb-4">
                                            {t("settings.personal_data")}
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-text-secondary mb-1">
                                                    {t("settings.first_name")}
                                                </label>
                                                <input
                                                    type="text"
                                                    value={profile.first_name || ''}
                                                    onChange={e => updateProfile('first_name', e.target.value)}
                                                    className="input"
                                                    placeholder={t("settings.placeholder_first_name")}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-text-secondary mb-1">
                                                    {t("settings.last_name")}
                                                </label>
                                                <input
                                                    type="text"
                                                    value={profile.last_name || ''}
                                                    onChange={e => updateProfile('last_name', e.target.value)}
                                                    className="input"
                                                    placeholder={t("settings.placeholder_last_name")}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-text-secondary mb-1">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    value={profile.email || ''}
                                                    onChange={e => updateProfile('email', e.target.value)}
                                                    className="input"
                                                    placeholder={t("settings.placeholder_email")}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-text-secondary mb-1">
                                                    {t("settings.display_name")}
                                                </label>
                                                <input
                                                    type="text"
                                                    value={profile.name || ''}
                                                    onChange={e => updateProfile('name', e.target.value)}
                                                    className="input"
                                                    placeholder={t("settings.placeholder_display_name")}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-text-secondary mb-1">
                                                    {t("settings.short_name")}
                                                </label>
                                                <input
                                                    type="text"
                                                    value={profile.short_name || ''}
                                                    onChange={e => updateProfile('short_name', e.target.value)}
                                                    className="input"
                                                    placeholder={t("settings.placeholder_short_name")}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-text-secondary mb-1">
                                                    {t("settings.role")}
                                                </label>
                                                <input
                                                    type="text"
                                                    value={user?.role === 'admin' ? 'Admin' : 'Viewer'}
                                                    className="input bg-surface-hover cursor-not-allowed"
                                                    readOnly
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-text-secondary mb-1">
                                                    {t("settings.created_at")}
                                                </label>
                                                <input
                                                    type="text"
                                                    value={user?.created_at ? new Date(user.created_at).toLocaleDateString() : '-'}
                                                    className="input bg-surface-hover cursor-not-allowed"
                                                    readOnly
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-text-secondary mb-1">
                                                    {t("settings.updated_at")}
                                                </label>
                                                <input
                                                    type="text"
                                                    value={user?.updated_at ? new Date(user.updated_at).toLocaleDateString() : '-'}
                                                    className="input bg-surface-hover cursor-not-allowed"
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            disabled={!isProfileDirty || isUpdateLoading || isLoading}
                                            className="btn btn-primary"
                                        >
                                            {t("settings.save_profile")}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </TabPanel>

                    {/* TAB TEMA */}
                    <TabPanel>
                        <div className="flex flex-col gap-6">
                            <div className="card">
                                <h3 className="text-lg font-semibold text-text-primary mb-1">
                                    {t("settings.theme_section")}
                                </h3>
                                <p className="text-sm text-text-muted mb-4">
                                    {t("settings.theme_description")}
                                </p>
                                <ThemeSelector/>
                            </div>

                            <div className="card">
                                <h3 className="text-lg font-semibold text-text-primary mb-1">
                                    {t("settings.language_section")}
                                </h3>
                                <p className="text-sm text-text-muted mb-4">
                                    {t("settings.language_description")}
                                </p>
                                <div className="max-w-xs">
                                    <LanguageSelector type="language-settings"/>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </div>
    );
};

export default Settings;
