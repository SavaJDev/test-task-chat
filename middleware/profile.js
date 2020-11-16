export default function({store, redirect}) {
    if (!store.state.leftUser[0]) {
        redirect('/')
    }
}