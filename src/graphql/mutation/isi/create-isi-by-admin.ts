import {
  type CreateIsiByAdminInput,
  type IsiMutation,
} from "@/graphql/generated/types";
import { gqlFetch } from "@/services/fetch";

export async function createIsiByAdmin(
  input: CreateIsiByAdminInput,
  token: string
): Promise<IsiMutation["createIsiByAdmin"]> {
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `mutation CreateIsiByAdmin($input: CreateIsiByAdminInput!) {
        isi {
          createIsiByAdmin(input: $input) {
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
  return response.data.isi.createIsiByAdmin;
}
