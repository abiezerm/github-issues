import { sleep } from "@helpers/sleep";
import { GithubLabel } from "../types";
import { environment } from "src/environments/environment.development";

const BASE_URL =  environment.baseUrl;
const GITHUB_TOKEN = environment.gitHubToken;

export const getLabels = async (): Promise<GithubLabel[]> => {
  await sleep(1500);

  try {
    const resp = await fetch(`${BASE_URL}/labels`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    if (!resp.ok) throw "can't load labels";

    const labels: GithubLabel[] = await resp.json() as GithubLabel[];

    return labels;
  } catch (error) {
    console.error(error);
    throw "can't load labels";
  }
}
