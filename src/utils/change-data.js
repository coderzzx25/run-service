//修改data中的url
const changeData = (data) => {
    const { url } = data
    const newUrl = `/pages/home/${url}/${url}`
    data.url = newUrl
    return data
}
module.exports = changeData
