export const formatDate = function (dateString: Date | undefined) {
    if (!dateString) {
        return "Invalid date";
    }

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        return "Invalid date";
    }

    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
    });
}