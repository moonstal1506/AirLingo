function checkId(id) {
    const idRegex = /^[a-z0-9]{4,20}$/;
    return idRegex.test(id);
}

function checkPassword(password) {
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()])[A-Za-z\d@$!%*?&#^()]{8,20}$/;
    return passwordRegex.test(password);
}

function checkConfirmPassword(password, confirmPassword) {
    return password === confirmPassword;
}

function checkNickname(nickname) {
    const nicknameRegex = /^[a-zA-Z0-9]{2,20}$/;
    return nicknameRegex.test(nickname);
}

function checkEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

export { checkId, checkPassword, checkConfirmPassword, checkNickname, checkEmail };
