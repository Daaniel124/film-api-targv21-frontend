export default(dateString) => {
    try {
        const date = new Date(dateString)
        return new Intl.DateTimeFormat("default", { dateStyle: "long" }).format(date)
    } catch {
        return ""
    }
}