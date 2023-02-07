export default function getInitialErrorState(errorNames) {
    const errors = {};

    errorNames.forEach(element => {
        errors[element] = {active: false, msg: ''};
    });

    return errors;
};