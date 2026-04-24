// Serves the Apple App Site Association file for iOS universal links.
// See: https://developer.apple.com/documentation/xcode/supporting-associated-domains
// Values are driven by APPLE_TEAM_ID + IOS_BUNDLE_ID env vars.

export async function GET() {
    const teamId = process.env.APPLE_TEAM_ID;
    const bundleId = process.env.IOS_BUNDLE_ID;

    const apps = teamId && bundleId ? [`${teamId}.${bundleId}`] : [];

    return new Response(JSON.stringify({ webcredentials: { apps } }), {
        headers: { 'Content-Type': 'application/json' },
    });
}
