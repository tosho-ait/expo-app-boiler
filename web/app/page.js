import LandingPage from "@/components/LandingPage";

export default function Home() {

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'AppBoiler',
        operatingSystem: 'iOS, Android',
        applicationCategory: 'DeveloperApplication',
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <LandingPage />
        </>
    );
}
