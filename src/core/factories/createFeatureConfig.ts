export function createFeatureConfig(config: { name: string; collectionName?: string; routePath?: string }) {
  const name = config.name.toLowerCase();
  const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);
  const namePlural = name + 's';
  const namePluralCapitalized = nameCapitalized + 's';

  return {
    name,
    nameCapitalized,
    namePlural,
    namePluralCapitalized,
    collectionName: config.collectionName || namePlural,
    routePath: config.routePath || `/${namePlural}`,
    title: `Gestión de ${namePluralCapitalized}`,
    createTitle: `Nuevo ${name}`,
    editTitle: `Editar ${name}`,
    deleteMessage: (itemName: string) => `¿Deseas eliminar el ${name} ${itemName}?`,
  } as const;
}
