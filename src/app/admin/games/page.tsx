import { listGames } from "@/lib/actions/games";
import { listCreators } from "@/lib/actions/creators";
import GamesManager from "@/components/admin/GamesManager";

export default async function AdminGamesPage() {
  const [games, creators] = await Promise.all([listGames(), listCreators()]);

  return <GamesManager initialGames={games} creators={creators} />;
}
