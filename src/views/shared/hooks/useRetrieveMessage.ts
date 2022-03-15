export const useRetrieveMessage = (search: string) => {
  const query = new URLSearchParams(search);
  return query.get('title');
};
