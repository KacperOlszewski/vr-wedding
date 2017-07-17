import { VRInstance } from 'react-vr-web';

export function bootstrap(bundle, parent, options) {
    destroyPasswordSection();

    const vr = new VRInstance(bundle, 'WeddingSite', parent,
        {cursorAutoHide: true},
        {...options}
    );

    vr.render = function() {
        // Any custom behavior you want to perform on each frame goes here
    };

    vr.start();
    return vr;
}

function destroyPasswordSection() {
    const passwordSection = document.getElementById("password-section");
    passwordSection.parentNode.removeChild(passwordSection);
    return false;
}