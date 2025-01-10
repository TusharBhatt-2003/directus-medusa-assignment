import { createDirectus, rest } from "@directus/sdk";

const apiUrl = process.env.NEXT_PUBLIC_DIRECTUS_API_URL as string;

const directus = createDirectus(apiUrl).with(rest());

export default directus;
