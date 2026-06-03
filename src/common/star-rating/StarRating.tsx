import {StarRatingProps} from "./StarRating.type.ts";

const StarRating = ({skill}: { skill: StarRatingProps }) => {
    return (
        <div
            className="bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 flex items-center justify-between"
            aria-label={`${skill.name}: ${skill.score} su ${skill.maxScore}`}
        >
            <span className="text-slate-500 text-xs font-semibold shrink-0">
                {skill.name}
            </span>
            <div className="flex items-center gap-2">
                <div className="flex space-x-0.5" role="img" aria-hidden="true">
                    {Array.from({length: skill.maxScore}, (_, i) => (
                        <span
                            key={i}
                            className={`text-sm font-bold ${i < skill.score ? 'text-amber-500' : 'text-slate-200'}`}
                        >
                            &#9733;
                        </span>
                    ))}
                </div>
                <span className="text-xs font-mono font-semibold text-slate-500">
                    {skill.score}/{skill.maxScore}
                </span>
            </div>
        </div>
    );
};

export default StarRating;
