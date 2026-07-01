import { HomeClient } from "@/components/site/home-client";
import { MOCK_BANDS } from "@/lib/mock-data";

export default function Home() {
  return <HomeClient bands={MOCK_BANDS} />;
}
