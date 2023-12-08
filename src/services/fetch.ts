export const gqlFetch = <T>({
  url,
  query,
  variables,
  headers,
}: {
  url: string;
  query: string;
  variables?: T;
  headers?: HeadersInit;
}) =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(headers || {}),
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
