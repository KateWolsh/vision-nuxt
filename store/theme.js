export const state = () => ({
    isLightTheme: false,
})

export const mutations = {
    setIsLightTheme(s, payload) {
        s.isLightTheme = payload
        localStorage.setItem('isLightTheme', payload)
    },
}

export const getters = {
    getIsLightTheme: (s) => s.isLightTheme === 'true',
}
