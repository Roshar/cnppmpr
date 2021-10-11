
export async function checkPossibilityDeleteTask(store,item) {
    await store.dispatch('iom/deleteTask',item)
}


