export default {
  methods: {
    getReplacedUrl(url) {
      return url.replace('http://195.24.64.67/', process.env.backendUrl)
    },
    getReplacedFileUrl(url) {
      return url.replace('http://195.24.64.67/', process.env.filesUrl)
    },
  },
}
