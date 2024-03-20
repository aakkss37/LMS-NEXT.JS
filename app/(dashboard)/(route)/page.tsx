import { Button } from "@/components/micro/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
	return (
		<main className="">
			<UserButton />
		</main>
	);
}
