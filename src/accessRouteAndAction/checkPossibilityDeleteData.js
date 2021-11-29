
export async function checkPossibilityDeleteData(store, item) {
    await store.dispatch('iom/deleteTask',item)
}

export async function checkPossibilityDeleteIom(store, item) {
    await store.dispatch('iom/deleteIom',item)

}




