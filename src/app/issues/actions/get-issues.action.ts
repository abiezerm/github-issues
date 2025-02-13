import { sleep } from "@helpers/sleep";
import { GitHubIssue, State } from "../types";
import { environment } from "src/environments/environment.development";

const BASE_URL =  environment.baseUrl;
const GITHUB_TOKEN = environment.gitHubToken;

export const getIssues = async (state : State = State.All, selectedLabels: string[] = []): Promise<GitHubIssue[]> => {
  await sleep(1500);

  const params = new URLSearchParams();

  params.append('state', state);

  if (selectedLabels.length > 0) {
    params.append('labels', selectedLabels.join(','));
  }

  try {
    const resp = await fetch(`${BASE_URL}/issues?${params}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    if (!resp.ok) throw "can't load issues";

    const issues: GitHubIssue[] = await resp.json() as GitHubIssue[];

    return issues;
  } catch (error) {
    console.error(error);
    throw "can't load issues";
  }
}
