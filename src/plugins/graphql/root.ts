const vehiculesInstances: Vehicule[] = [
    {
        name: 'fiat',
    },
]

const troppersInstances: Tropper[] = [
    {
        name: 'toto',
        vehicules: [vehiculesInstances[0]],
    },
]

interface Tropper {
    name: string
    vehicules?: Vehicule[]
}

interface Vehicule {
    name: string
}

interface ArgsFn<T> {
    (args: { [key: string]: string | number }): T | Promise<T>
}

const vehicule: ArgsFn<Vehicule> = ({ id }) => {
    return vehiculesInstances[Number(id)]
}

const tropper: ArgsFn<Tropper> = ({ id }) => {
    return troppersInstances[Number(id)]
}

const troppers: ArgsFn<Tropper[]> = () => {
    console.log(troppersInstances)
    return troppersInstances
}

const vehicules: ArgsFn<Tropper[]> = () => {
    return vehiculesInstances
}

export const root = {
    vehicule,
    tropper,
    vehicules,
    troppers,
}
