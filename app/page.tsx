import { redirect } from "next/navigation";
import { getFirstServer } from "@/actions/getFirstServer";
import { getCurrentUserProfile } from "@/actions/getCurrentUserProfile";

export default async function SetupPage() {
  const profile = await getCurrentUserProfile();

  const server = await getFirstServer(profile.id);

  if (server) {
    redirect(`/servers/${server.id}`);
  }

  return <div className=""></div>;
}
