//

export function checkAuthorized(session) {
    return !!session?.sessionClaims?.eml;
}

export function getUserId(session) {
    return session?.sessionClaims?.eml;
}

