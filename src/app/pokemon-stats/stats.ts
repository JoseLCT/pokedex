interface TypeWeaknesses {
    [key: string]: number;
}

const typeWeaknesses: Record<string, TypeWeaknesses> = {
    "normal": {
        "fighting": 2,
        "ghost": 0,
    },
    "fire": {
        "fire": 0.5,
        "water": 2,
        "grass": 0.5,
        "ice": 0.5,
        "ground": 2,
        "bug": 0.5,
        "rock": 2,
        "steel": 0.5,
        "fairy": 0.5,
    },
    "water": {
        "fire": 0.5,
        "water": 0.5,
        "grass": 2,
        "electric": 2,
        "ice": 0.5,
        "steel": 0.5,
    },
    "grass": {
        "fire": 2,
        "water": 0.5,
        "grass": 0.5,
        "electric": 0.5,
        "ice": 2,
        "poison": 2,
        "ground": 0.5,
        "flying": 2,
        "bug": 2,
    },
    "electric": {
        "electric": 0.5,
        "ground": 2,
        "flying": 0.5,
        "steel": 0.5,
    },
    "ice": {
        "fire": 2,
        "ice": 0.5,
        "fighting": 2,
        "rock": 2,
        "steel": 2,
    },
    "fighting": {
        "flying": 2,
        "psychic": 2,
        "bug": 0.5,
        "rock": 0.5,
        "dark": 0.5,
        "fairy": 2,
    },
    "poison": {
        "grass": 0.5,
        "fighting": 0.5,
        "poison": 0.5,
        "ground": 2,
        "psychic": 2,
        "bug": 0.5,
        "fairy": 0.5,
    },
    "ground": {
        "water": 2,
        "grass": 2,
        "electric": 0,
        "ice": 2,
        "poison": 0.5,
        "rock": 0.5,
    },
    "flying": {
        "grass": 0.5,
        "electric": 2,
        "ice": 2,
        "fighting": 0.5,
        "ground": 0,
        "bug": 0.5,
        "rock": 2,
    },
    "psychic": {
        "fighting": 0.5,
        "psychic": 0.5,
        "bug": 2,
        "ghost": 2,
        "dark": 2,
    },
    "bug": {
        "fire": 2,
        "grass": 0.5,
        "fighting": 0.5,
        "ground": 0.5,
        "flying": 2,
        "rock": 2,
    },
    "rock": {
        "normal": 0.5,
        "fire": 0.5,
        "water": 2,
        "grass": 2,
        "fighting": 2,
        "poison": 0.5,
        "ground": 2,
        "flying": 0.5,
        "steel": 2,
    },
    "ghost": {
        "normal": 0,
        "fighting": 0,
        "poison": 0.5,
        "bug": 0.5,
        "ghost": 2,
        "dark": 2,
    },
    "dragon": {
        "fire": 0.5,
        "water": 0.5,
        "grass": 0.5,
        "electric": 0.5,
        "ice": 2,
        "dragon": 2,
        "fairy": 2,
    },
    "dark": {
        "fighting": 2,
        "psychic": 0,
        "bug": 2,
        "ghost": 0.5,
        "dark": 0.5,
        "fairy": 2,
    },
    "steel": {
        "normal": 0.5,
        "fire": 2,
        "grass": 0.5,
        "ice": 0.5,
        "fighting": 2,
        "poison": 0,
        "ground": 2,
        "flying": 0.5,
        "psychic": 0.5,
        "bug": 0.5,
        "rock": 0.5,
        "dragon": 0.5,
        "steel": 0.5,
        "fairy": 0.5,
    },
    "fairy": {
        "fighting": 0.5,
        "poison": 2,
        "bug": 0.5,
        "dragon": 0,
        "dark": 0.5,
        "steel": 2,
    }
};

export function calculateDefensesAgainstAllTypes(pokemonTypes: any[]): Record<string, number> {
    const defenses: Record<string, number> = {
        "normal": 1,
        "fire": 1,
        "water": 1,
        "electric": 1,
        "grass": 1,
        "ice": 1,
        "fighting": 1,
        "poison": 1,
        "ground": 1,
        "flying": 1,
        "psychic": 1,
        "bug": 1,
        "rock": 1,
        "ghost": 1,
        "dragon": 1,
        "dark": 1,
        "steel": 1,
        "fairy": 1
    };

    pokemonTypes.forEach(item => {
        const typeName = item.detalleTipo.name;
        const weaknessesPerType = typeWeaknesses[typeName];

        if (weaknessesPerType) {
            for (const type in weaknessesPerType) {
                if (defenses[type] === undefined) {
                    defenses[type] = weaknessesPerType[type];
                } else {
                    defenses[type] *= weaknessesPerType[type];
                }
            }
        }
    });

    return defenses;
}
