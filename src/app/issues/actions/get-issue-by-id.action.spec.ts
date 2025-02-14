import { environment } from "src/environments/environment.development";
import { getIssueById } from "./get-issue-by-id.action";

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.gitHubToken;
const MOCK_ISSUE = { id: 123, title: 'Issue 123', body: 'Issue body' };

describe('GetIssueById Action', () => {

  it('should fetch issue when id is provided', async () => {
    // Arrange
    const issueId = '123';
    const requestURL = `${BASE_URL}/issues/${issueId}`;
    const issueResponse = new Response(JSON.stringify(MOCK_ISSUE), { status: 200, statusText: 'OK' });

    spyOn(window, 'fetch').and.resolveTo(issueResponse);

    // Act
    const issue = await getIssueById(issueId);

    // Assert
    expect(window.fetch).toHaveBeenCalledWith(requestURL, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`
      }
    });
    //expect(issue).toEqual(MOCK_ISSUE);
  });

  it('should not fetch issue when issue not found', async () => {
    // Arrange
    const issueId = '123';
    const requestURL = `${BASE_URL}/issues/${issueId}`;
    const issueResponse = new Response(null, { status: 404, statusText: 'Not Found' });

    spyOn(window, 'fetch').and.resolveTo(issueResponse);

    // Assert
    try {
      const issue = await getIssueById(issueId);
    } catch (error) {
      expect(error).toBe(`can't load issue ${issueId}`);
    }
    //expect(issue).toEqual(MOCK_ISSUE);
  });
})
