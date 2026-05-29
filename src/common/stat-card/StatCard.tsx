import type {StatCardProps} from './StatCard.type';
import {variantStyles} from "../../utility/stat-card.utils.ts";

export const StatCard = ({label, value, description, icon: Icon, variant = 'primary'}: StatCardProps) => {
    const styles = variantStyles[variant];

    return (
        <article
            className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 group flex flex-col justify-between"
        >
            <div className="flex items-start justify-between">
                <span className="text-slate-400 font-bold text-xs uppercase tracking-wider">
                    {label}
                </span>
                <div
                    className={`p-2 rounded-xl border ${styles.bg} ${styles.text} ${styles.border} transition-transform duration-300 group-hover:rotate-6`}
                    aria-hidden="true"
                >
                    <Icon className="size-4"/>
                </div>
            </div>
            <div className="mt-5">
                <p className="text-3xl font-black text-slate-800 tracking-tight">
                    {value}
                </p>
                <p className="text-slate-400 text-xs mt-1 font-medium">
                    {description}
                </p>
            </div>
        </article>
    );
};
