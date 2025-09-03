export const formatDate = (
    dateString: string,
    options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
        year: "numeric",
    }
) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", options);
};


export const formatUppercase = (str: string): string => {
    return str
        .split('_')
        .map((word) =>
            word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(' ')
}

export const formatUpperCase = (text: string): string => {
    return text.toUpperCase()
}