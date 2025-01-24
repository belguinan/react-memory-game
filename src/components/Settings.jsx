import { useDispatch, useSelector } from "react-redux";
import { updateSettingsAction } from "@/helpers/actions.js";

export default function Settings({ showTitle = true, showCardsSettings = true, showThemeSettings = true }) {
    const dispatch = useDispatch();
    const settings = useSelector(state => state.settings);

    const handleCardCountChange = (count) => {
        dispatch(updateSettingsAction({ cardCount: parseInt(count) }));
    };
    
    const handleBackgroundChange = (background) => {
        dispatch(updateSettingsAction({ background }));
    };

    const themes = [
        { value: 'default', icon: 'circle-half' },
        { value: 'dark', icon: 'moon-stars-fill' },
        { value: 'light', icon: 'sun-fill' },
        { value: 'nature', icon: 'tree-fill' },
        { value: 'galaxy', icon: 'stars' }
    ];
    
    return (
        <div className="card border-0 rounded-4 shadow-sm">
            <div className="card-body rounded-4 p-4">
                
                {showTitle && 
                <h3 className="card-title mb-4 fw-bold">
                    Game Settings
                </h3>}
                
                {showCardsSettings && <div className="mb-4">
                    <label className="d-block mb-2 fw-semibold">
                        <i className="bi bi-grid-3x3-gap me-2"></i>
                        Number of Cards
                    </label>
                    <div className="d-flex gap-2">
                        {[4, 16, 32].map(count => (
                            <button
                                key={count}
                                className={`btn flex-grow-1 ${
                                    settings.cardCount === count 
                                    ? 'btn-primary fw-semibold shadow-sm' 
                                    : 'btn-outline-primary'
                                }`}
                                onClick={() => handleCardCountChange(count)}
                            >
                                {count}
                                <span className="d-block small opacity-75">cards</span>
                            </button>
                        ))}
                    </div>
                </div>}
                
                {showThemeSettings && <div>
                    <label className="d-block mb-2 fw-semibold">
                        <i className="bi bi-palette me-2"></i>
                        Background Theme
                    </label>
                    <div className="d-flex flex-wrap gap-2">
                        {themes.map(theme => (
                            <button
                                key={theme.value}
                                className={`btn flex-fill ${
                                    settings.background === theme.value 
                                    ? 'btn-primary fw-semibold shadow-sm' 
                                    : 'btn-outline-primary'
                                }`}
                                onClick={() => handleBackgroundChange(theme.value)}
                            >
                                <i className={`bi bi-${theme.icon} me-2`}></i>
                                {theme.value.charAt(0).toUpperCase() + theme.value.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>}
            </div>
        </div>
    );
}