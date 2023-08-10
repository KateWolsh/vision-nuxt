export default function ({app, store, redirect, route}) {
    const token = app.$cookies.get('token')

    if (!token) {
        return redirect('/auth/login')
    }
}