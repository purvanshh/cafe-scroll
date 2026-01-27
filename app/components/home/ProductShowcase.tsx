import { Component as LuminaGallery } from '../ui/lumina-interactive-list';

export const ProductShowcase = () => {
    return (
        <section className="bg-black py-0 relative w-full overflow-hidden">
            {/* 
                Replaced static placeholder with Lumina WebGL Interactive List.
                This provides the "premium slow-motion product video" feel via shaders.
             */}
            <div className="w-full h-[100vh] relative">
                <LuminaGallery />
            </div>
        </section>
    );
};
