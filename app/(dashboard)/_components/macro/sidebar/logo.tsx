import Image from "next/image";

/**
 * Logo component
 *
 * Renders the sidebar logo
 *
 * @returns {JSX.Element} Logo component
 */
export const Logo = () => {
    return (
        <Image
            height={130}
            width={130}
            alt="logo"
            src="/next.svg"
        />
    )
}
