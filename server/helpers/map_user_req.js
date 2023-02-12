module.exports = function (user, reqData) {
    if (reqData.role)
        user.role = reqData.role
    if (reqData.isActivated)
        user.isActivated = reqData.isActivated
    if (reqData.username)
        user.username = reqData.username
    if (reqData.password)
        user.password = reqData.password
    if (reqData.email)
        user.email = reqData.emqil
    if (reqData.name)
        user.name = reqData.name
    if (reqData.gender)
        user.gender = reqData.gender
    if (!user.address)
        user.address = {}
    if (reqData.temp_address)
        user.address.tempAddress = reqData.temp_address.split(',')
    if (reqData.permanent_address)
        user.body.permanentAddress = reqData.address.permanent_address
    if (reqData.date_of_birth)
        user.body.dob = reqData.date_of_birth
    if (reqData.phoneNumber)
        user.phoneNumber = reqData.phoneNumber
    if (reqData.image)
        user.image = reqData.image

    return user;
}