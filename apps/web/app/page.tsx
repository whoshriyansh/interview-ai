import { ModeToggle } from "@/components/shared/ModeToggle";
import { UserSchema } from "@repo/schemas";

export default function Home() {
  const parsed = UserSchema.parse({
    id: "1",
    name: "Shriyansh",
    email: "shriyansh@gmail.com",
  });
  return (
    <div>
      {parsed.name}
      <ModeToggle />
    </div>
  );
}
