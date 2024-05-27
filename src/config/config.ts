interface EnvironmentVariables {
    mongoUri: string,
    secretToken: string,
    domainName: string,
}

export const envVariables: EnvironmentVariables = {
    mongoUri: process.env.NEXT_PUBLIC_MONGO_URL!,
    secretToken: process.env.NEXT_PUBLIC_SECRET_TOKEN!,
    domainName: process.env.NEXT_PUBLIC_DOMAIN!
}