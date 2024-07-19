export const formateData = function (dataString: string) {
    const data = new Date(dataString)
    return data.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
    })
}