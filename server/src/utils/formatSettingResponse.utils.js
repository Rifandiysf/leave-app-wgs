export const formatSettingResponse = (settings) => {
    return {
        id: settings.id,
        imageUrl: settings.imageUrl,
        light_color: {
            baseColor: {
                background: settings.light_background,
                foreground: settings.light_foreground
            },
            cardColor: {
                card: settings.light_card,
                cardForeground: settings.light_cardForeground
            },
            primaryColor: {
                primary: settings.light_primary,
                primaryForeground: settings.light_primaryForeground
            },
            secondaryColor: {
                secondary: settings.light_secondary,
                secondaryForground: settings.light_secondaryForground
            }
        },
        dark_color: {
            baseColor: {
                background: settings.dark_background,
                foreground: settings.dark_foreground
            },
            cardColor: {
                card: settings.dark_card,
                cardForeground: settings.dark_cardForeground
            },
            primaryColor: {
                primary: settings.dark_primary,
                primaryForeground: settings.dark_primaryForeground
            },
            secondaryColor: {
                secondary: settings.dark_secondary,
                secondaryForground: settings.dark_secondaryForground
            }
        }
    }
}
