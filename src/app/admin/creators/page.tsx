import { listCreators } from "@/lib/actions/creators";
import CreatorsManager from "@/components/admin/CreatorsManager";

export default async function AdminCreatorsPage() {
  const creators = await listCreators();

  return <CreatorsManager initialCreators={creators} />;
}
