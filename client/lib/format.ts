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

export const shortenFileName = (name: string, maxLength = 30) => {
    if (name.length <= maxLength) return name;
    const ext = name.split('.').pop();
    const base = name.slice(0, maxLength - ext!.length - 5);
    return `${base}...${ext}`;
};