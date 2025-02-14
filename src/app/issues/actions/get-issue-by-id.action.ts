import { sleep } from "@helpers/sleep";
import { GitHubIssue } from "../types";
import { environment } from "src/environments/environment.development";

const BASE_URL =  environment.baseUrl;
const GITHUB_TOKEN = environment.gitHubToken;

export const getIssueById = async (issueId: string): Promise<GitHubIssue> => {

  try {
    const resp = await fetch(`${BASE_URL}/issues/${issueId}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    if (!resp.ok) throw "can't load issue";

    const issues: GitHubIssue = await resp.json() as GitHubIssue;

    return issues;
  } catch (error) {
    console.error(error);
    throw `can't load issue ${issueId}`;
  }
}
