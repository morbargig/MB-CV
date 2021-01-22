// check if the app run on local host
let route = `https://localhost:${process.env.VUE_APP_SERVER_PORT || process.env.PORT}/`
if (process.env.NODE_ENV === "production") {
    route = '/'
}
export default route