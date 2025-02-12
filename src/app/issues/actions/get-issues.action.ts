import { sleep } from "@helpers/sleep";
import { GitHubIssue } from "../types";
import { environment } from "src/environments/environment.development";

const BASE_URL =  environment.baseUrl;
const GITHUB_TOKEN = environment.gitHubToken;

export const getIssues = async (): Promise<GitHubIssue[]> => {
  await sleep(1500);

  try {
    const resp = await fetch(`${BASE_URL}/issues`, {
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
