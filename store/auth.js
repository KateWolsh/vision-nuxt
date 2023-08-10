export const state = () => ({
    email: null,
    role: null,
})

export const mutations = {
    setEmail(s, payload) {
        s.email = payload
    },
    setRole(s, payload) {
        s.role = payload
    },
}

export const getters = {
    getEmail: (s) => s.email,
    getRole: (s) => s.role,
}
