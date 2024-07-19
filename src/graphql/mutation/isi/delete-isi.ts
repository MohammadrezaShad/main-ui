import {
  type DeleteIsiInput,
  type IsiMutation,
} from "@/graphql/generated/types";
import { gqlFetch } from "@/services/fetch";

export async function deleteIsi(
  input: DeleteIsiInput,
  token: string
): Promise<IsiMutation["deleteIsi"]> {
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `mutation DeleteIsi($input: DeleteIsiInput!) {
        isi {
          deleteIsi(input: $input) {
            success
          }
        }
      }`,
    variables: { input },
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const response = await res.json();
  if (response.errors?.[0]?.message) {
    throw new Error(response.errors?.[0]?.message);
  }
  return response.data.isi.deleteIsi;
}
