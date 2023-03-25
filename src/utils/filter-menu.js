function filterMenu(menu) {
    const filterMenu = []
    menu.forEach((item) => {
        if (item.type === 1) {
            const obj = {
                id: item.id,
                name: item.name,
                url: item.url,
                type: item.type,
                icon: item.icon,
                sort: item.sort,
                children: [],
            }
            menu.forEach((item2) => {
                if (item2.type === 2 && item2.url.indexOf(item.url) !== -1) {
                    obj.children.push(item2)
                }
            })
            filterMenu.push(obj)
        }
    })
    return filterMenu
}
module.exports = filterMenu
