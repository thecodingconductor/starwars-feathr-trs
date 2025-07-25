import { type JSX } from "react";
import { useEffect, useState } from "react";

interface EntityPageProps<T> {
  fetchEntity: (id: string) => Promise<T>;
  getById: (id: string) => T | undefined;
  extractRelated: (entity: T) => Promise<Record<string, any>>;
  render: (entity: T, related: Record<string, any>) => JSX.Element;
  id: string;
}

// Generic Entity Page (Person, Planet, Starship Pages are all very similar.)

function EntityPage<T>({
  id,
  fetchEntity,
  getById,
  extractRelated,
  render,
}: EntityPageProps<T>) {
  const [entity, setEntity] = useState<T | null>(null);
  const [related, setRelated] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      let item = getById(id);
      if (!item) {
        try {
          item = await fetchEntity(id);
        } catch (err) {
          console.error("Fetch failed", err);
        }
      }
      if (item) {
        setEntity(item);
        const related = await extractRelated(item);
        setRelated(related);
      }
      setLoading(false);
    };

    void load();
  }, [id, extractRelated, fetchEntity, getById]);

  if (loading) return <p>Loading...</p>;
  if (!entity) return <p>Entity not found.</p>;

  return render(entity, related);
}

export default EntityPage;
