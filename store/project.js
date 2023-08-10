export const state = () => ({
    projects: [],
})

export const mutations = {
    setProjects(s, payload) {
        s.projects = payload.sort((x, y) => {
            return x.title.toLowerCase() === 'платформа netvision' ? -1 : y.title.toLowerCase() === 'платформа netvision' ? 1 : 0
        });
    },
}

export const getters = {
    getProjects: (s) => s.projects,
}
